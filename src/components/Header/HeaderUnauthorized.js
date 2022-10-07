import { Component } from '../../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../../framework/core/VDOM/VDOMElement.js';
import Link from '../../framework/router/Link.js';
import SubmitButton from '../Buttons/SubmitButton.js';
import LinkButton from '../Buttons/LinkButton.js';

/**
 * Component for showing a header to unauthorized user
 *
 * @component
 */
export default class HeaderUnauthorized extends Component {
    render() {
        return createElement(
            'div',
            {
                className: 'header__buttons',
            },
            createComponent(LinkButton, {
                key: 'sign in link',
                to: '/signin',
                buttonClassName: 'btn',
                value: createText('p', { key: 'logout link' }, 'Вход'),
            }),
            createComponent(LinkButton, {
                key: 'sign up button',
                to: '/signup',
                buttonClassName: 'btn btn-primary',
                value: createText('p', null, 'Создать аккаунт'),
            }),
        );
    }
}
