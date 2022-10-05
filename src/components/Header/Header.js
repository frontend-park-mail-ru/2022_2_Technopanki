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
    state = {
        isUserAuthorized: false,
        name: '',
        surname: '',
    };

    logout = () => {
        this.setState(state => {
            state.isUserAuthorized = false;
            return state;
        });

        fetch(SERVER_URL + LOGOUT_URL, {
            method: 'POST',
            credentials: 'include',
        });

        localStorage.clear();
    };

    // componentWillMount = () => {
    //     if (localStorage.getItem('name') && localStorage.getItem('surname')) {
    //         this.setState(state => {
    //             state.isUserAuthorized = true;
    //             state.name = localStorage.getItem('name');
    //             state.surname = localStorage.getItem('surname');
    //             return state;
    //         });
    //     }
    // };

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
                        src: 'img/logo.svg'
                    })
                },
            ),
            createComponent(HeaderLink),
            createComponent(HeaderInfo),
        );
    }
}
