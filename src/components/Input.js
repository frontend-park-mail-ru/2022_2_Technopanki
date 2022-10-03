import { Component } from '../lib/core/VDOM/component.js';
import { createElement, createText } from '../lib/core/VDOM/VDOMElement.js';

export default class Input extends Component {
    render() {
        return createElement(
            'div',
            { className: 'form__input' },
            createText('label', { key: 'label' }, this.props.label),
            createElement('input', {
                type: this.props.inputType,
                ...this.props,
            }),
            createText(
                'p',
                {
                    className: `form__input-error form__input-error-${this.props.name}`,
                },
                '',
            ),
        );
    }
}
