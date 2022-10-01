import { Component } from '../../lib/core/VDOM/component.js';
import { createElement, createText } from '../../lib/core/VDOM/VDOMElement.js';

// TODO: добавить иконку
export default class ToggleElement extends Component {
    render() {
        return createElement(
            'div',
            {
                key: this.props.key,
                className: `${
                    this.props.isActive ? 'toggle__active' : ''
                } toggle__element`,
                id: this.props.id,
                onclick: this.props.onclick,
            },
            createElement(
                'div',
                {
                    key: this.props.key,
                    className: 'toggle__element-content',
                },
                createText(
                    'h5',
                    { key: this.props.key },
                    this.props.headerLine,
                ),
                createText('p', { key: this.props.key }, this.props.textLine),
            ),
        );
    }
}
