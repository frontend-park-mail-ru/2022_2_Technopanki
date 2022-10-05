import { Component } from '../../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../../framework/core/VDOM/VDOMElement.js';
import SubmitButton from '../Buttons/SubmitButton.js';
import Link from '../../framework/router/Link.js';
import HeaderUnauthorized from './HeaderUnauthorized.js';
import HeaderAuthorized from './HeaderAuthorized.js';
import { LOGOUT_URL, SERVER_URL } from '../../services/network/URLs.js';
import HeaderInfo from './HeaderInfo.js';
import HeaderLink from './HeaderLink.js';

export default class Header extends Component {
    render() {
        return createElement(
            'header',
            {
                key: 'header',
            },
            createComponent(Link, {
                    key: 'logo',
                    to: '/',
                    value: createElement('img', {
                        alt: 'logo svg',
                        src: 'img/logo.svg',
                        height: 32
                    })
                },
            ),
            createComponent(HeaderLink),
            createComponent(HeaderInfo),
        );
    }
}
