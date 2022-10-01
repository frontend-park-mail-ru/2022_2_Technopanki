import { Component } from '../lib/core/VDOM/component.js';
import { createElement, createText } from '../lib/core/VDOM/VDOMElement.js';

export default class Input extends Component {
    render() {
        return createElement(
            'div',
            { className: 'form__input', key: 'form__input' },
            createText('label', { key: 'label' }, this.props.label),
            createElement('input', {
                name: this.props.name,
                type: this.props.inputType,
                placeholder: this.props.placeholder,
                required: this.props.required,
                key: 'input',
            }),
        );
    }
}
