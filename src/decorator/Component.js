import { Decorator } from 'decorative';
import React from 'react';

/**
 * @Component()
 * Transforms the decorated class into a React.Component.
 */
export default class ComponentDecorator extends Decorator {

    newInstance() {
        return new ComponentDecorator();
    }

    onDecorate(componentClass) {

        // backup class members
        var __proto = {};
        var memberNames = Object.getOwnPropertyNames(componentClass.prototype);

        for (var i=0; i<memberNames.length; i++) {
            if (memberNames[i] == 'constructor') continue;
            __proto[memberNames[i]] = componentClass.prototype[memberNames[i]];
        }

        // replace prototype by React.Component -> it's a native React.Component now
        componentClass.prototype = new React.Component();

        // reply backed-up members
        for (var i=0; i<memberNames.length; i++) {
            if (memberNames[i] == 'constructor') continue;
            componentClass.prototype[memberNames[i]] = __proto[memberNames[i]];
        }

        var _componentWillMount = componentClass.prototype.componentWillMount;

        componentClass.prototype.componentWillMount = function() {

            // wait for DOM changes and re-visit @DOMBind properties
            dec.EventBus.on('DOMChange', () => {

                for (var propertyName in this) {

                    if (this[propertyName] && this[propertyName].DOMBind) {

                        // runtime, instance level @DOMBind revisiting
                        this[propertyName] = this[propertyName].DOMBind();
                    }
                }
            });

            if (_componentWillMount) {
                return _componentWillMount.apply(this, arguments);
            }
        };

        return componentClass;
    }


}