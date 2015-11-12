import ReactDOM from 'react-dom';

// TODO: Resize handler etc. pp.

export default class Viewport {

    static add(JSX, DOMNode) {
        return ReactDOM.render(JSX, DOMNode);
    }
}