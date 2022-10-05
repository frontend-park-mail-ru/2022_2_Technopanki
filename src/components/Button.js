import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';

export default class Button extends Component {
    render() {
        return createElement(
            'button',
            {
                className: this.props.className,
                onclick: this.props.onclick,
            },
            this.props.value,
        );
    }
}
