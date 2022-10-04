import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
} from '../lib/core/VDOM/VDOMElement.js';
import { Menu } from '../components/Menu.js';
import Description from '../components/Description.js';
import SignUpForm from '../components/SignUp/SignUpForm.js';

export default class SignUp extends Component {
    render() {
        return createElement(
            'div',
            { key: 'wrapper', className: 'signup auth' },
            createComponent(Menu, { key: 'form_menu', form: SignUpForm }),
            createComponent(Description, {
                key: 'description',
            }),
        );
    }
}
