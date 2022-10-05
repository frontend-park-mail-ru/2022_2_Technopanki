import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import Link from '../lib/router/Link.js';
import SubmitButton from './SubmitButton.js';
import LinkButton from './LinkButton.js';

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
                buttonClassName: 'btn header__links-grey',
                value: createText('p', { key: 'logout link' }, 'Вход'),
            }),
            createComponent(LinkButton, {
                key: 'sign up button',
                to: '/signup',
                buttonClassName: 'btn header__buttons-blue',
                value: createText('p', null, 'Создать аккаунт'),
            }),
        );
    }
}
