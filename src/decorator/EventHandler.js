import { Decorator } from 'decorative';

/**
 * @EventHandler()
 *
 * Wraps an event handler method to call it with arguments:
 * 1. event target
 * 2. event
 *
 * It also annotates the function so that it gets auto-binded
 * to the "this" scope of the component.
 *
 * A neat example:
 *
 *     @EventHandler()
 *     onSendClick(eventTarget:HTMLElement, event:SyntheticEvent) {
 *
 *     }
 */
export default class EventHandlerDecorator extends Decorator {

    newInstance() {
        return new EventHandlerDecorator();
    }

    onDecorate(targetClass, methodName, descriptor) {

        var targetMethod = descriptor.value;

        descriptor.value = function(event) {
            return targetMethod.call(this, event.target, event);
        };

        // annotate for the template's logic to auto-bind
        descriptor.value.isEventHandler = true;

        return descriptor;
    }
}