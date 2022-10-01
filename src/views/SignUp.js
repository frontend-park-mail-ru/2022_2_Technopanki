import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import { Menu } from '../components/SignUp/Menu.js';
import Description from '../components/Description.js';

export default class SignUp extends Component {
    render() {
        return createElement(
            'div',
            { key: 'signup', className: 'signup' },
            createComponent(Menu, { key: 'signup' }),
            createComponent(Description, { key: 'description' }),
        );
    }
}
