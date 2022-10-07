import { Component } from '../../framework/core/VDOM/component.js';
import { createElement } from '../../framework/core/VDOM/VDOMElement.js';

/**
 * Component implementing button
 *
 * @component
 */
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
