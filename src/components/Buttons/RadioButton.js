import { Component } from '../../framework/core/VDOM/component.js';
import {
    createElement,
    createText,
} from '../../framework/core/VDOM/VDOMElement.js';

export default class RadioButton extends Component {
    render() {
        return createElement(
            'div',
            { className: 'input-radio' },
            createElement('input', {
                type: this.props.type,
                name: this.props.name,
                id: this.props.id,
                checked: this.props.checked,
                value: this.props.value,
            }),
            createText('label', { htmlFor: this.props.id }, this.props.label),
        );
    }
}
