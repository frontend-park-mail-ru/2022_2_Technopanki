import { Component } from '../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
} from '../framework/core/VDOM/VDOMElement.js';
import { Menu } from '../components/Menu.js';
import Description from '../components/Description.js';
import SignUpForm from '../components/SignUp/SignUpForm.js';

/**
 * Component for showing sign up page
 *
 * @component
 */
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
