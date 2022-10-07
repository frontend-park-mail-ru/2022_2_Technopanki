import { Component } from '../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
} from '../framework/core/VDOM/VDOMElement.js';

/**
 * Component for showing form
 *
 * @component
 */
export class Menu extends Component {
    render() {
        return createElement(
            'div',
            { key: 'menu', className: 'menu' },
            createElement(
                'div',
                { key: 'menu__wrapper', className: 'menu__wrapper' },
                createComponent(this.props.form),
            ),
        );
    }
}
