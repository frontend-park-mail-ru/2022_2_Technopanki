import { Component } from '../lib/core/VDOM/component.js';
import { LOGOUT_URL, SERVER_URL } from '../services/network/serverURLs.js';
import {
    createComponent,
    createElement,
} from '../lib/core/VDOM/VDOMElement.js';
import HeaderAuthorized from './HeaderAuthorized.js';
import HeaderUnauthorized from './HeaderUnauthorized.js';

export default class HeaderInfo extends Component {
    state = {
        name: localStorage.getItem('name'),
        surname: localStorage.getItem('surname'),
    };

    logout = () => {
        this.setState(state => {
            state.name = null;
            state.surname = null;
            return state;
        });

        fetch(SERVER_URL + LOGOUT_URL, {
            method: 'POST',
            credentials: 'include',
        });

        localStorage.clear();
    };

    render() {
        if (this.state.name && this.state.surname) {
            return createElement(
                'div',
                null,
                createComponent(HeaderAuthorized, { onclick: this.logout }),
            );
        } else {
            return createElement(
                'div',
                null,
                createComponent(HeaderUnauthorized),
            );
        }
    }
}
