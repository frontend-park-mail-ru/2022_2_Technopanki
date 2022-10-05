import { Component } from '../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
} from '../framework/core/VDOM/VDOMElement.js';
import SignInForm from '../components/SingIn/SignInForm.js';
import { Menu } from '../components/Menu.js';
import Description from '../components/Description.js';

export default class SignIn extends Component {
    render() {
        return createElement(
            'div',
            { key: 'wrapper', className: 'signup auth' },
            createComponent(Menu, { key: 'form_menu', form: SignInForm }),
            createComponent(Description, { key: 'description' }),
        );
    }
}
