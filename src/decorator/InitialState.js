import { Decorator } from 'decorative';

/**
 * @InitialState(state:Object)
 * Injects an initial state object into the decorated component class.
 */
export default class InitialStateDecorator extends Decorator {

    newInstance() {
        return new InitialStateDecorator();
    }

    onDecorate(componentClass) {
        componentClass.prototype.state = this.config;
        return componentClass;
    }
}