import { Component } from '../lib/core/VDOM/component.js';
import { createElement, createText } from '../lib/core/VDOM/VDOMElement.js';

export default class SubmitButton extends Component {
    render() {
        return createElement(
            'button',
            {
                key: this.props.key,
                className: !this.props.className
                    ? 'btn btn-primary'
                    : 'btn btn-primary ' + this.props.className,
                type: 'submit',
            },
            createText('p', null, this.props.value),
        );
    }
}
