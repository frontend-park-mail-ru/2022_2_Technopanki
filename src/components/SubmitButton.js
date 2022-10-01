import { Component } from '../lib/core/VDOM/component.js';
import { createText } from '../lib/core/VDOM/VDOMElement.js';

export default class SubmitButton extends Component {
    render() {
        return createText(
            'button',
            {
                key: this.props.key,
                className: this.props.className,
                type: 'submit',
            },
            this.props.value,
        );
    }
}
