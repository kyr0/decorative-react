import { Decorator } from 'decorative';

/**
 * @Template(JSX:Function)
 * Allows to inject external JSX function closures into a target Component.
 */
export default class TemplateDecorator extends Decorator {

    JSX = null;

    newInstance() {
        return new TemplateDecorator();
    }

    applyConfig(args) {
        this.JSX = args[0];
    }

    onDecorate(componentClass) {

        var JSX = this.JSX;

        // apply JSX onto class prototype
        componentClass.prototype.JSX = JSX;

        // inject render method (override)

        componentClass.prototype.render = function() {

            var classes;

            if (this.props.sheet) {
                classes = this.props.sheet.classes;
            }

            return function() {

                // auto-bind @EventHandler methods
                for (var methodName in this) {
                    if (this[methodName] && this[methodName].isEventHandler) {
                        this[methodName] = this[methodName].bind(this);
                    }
                }

                // call JSX
                return JSX.bind(this).apply(this, arguments);

            }.bind(this)(
                this.state || {},
                classes || {},
                this.i18n || {}
            );
        };

        var _componentDidMount = componentClass.prototype.componentDidMount;
        componentClass.prototype.componentDidMount = function() {

            // fire DOM change for the @DOMBind decorators to revisit
            dec.EventBus.emit('DOMChange');

            if (_componentDidMount) {
                return _componentDidMount.apply(this, arguments);
            }
        };
        return componentClass;
    }


}