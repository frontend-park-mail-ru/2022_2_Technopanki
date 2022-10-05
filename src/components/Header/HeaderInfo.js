import { Component } from '../../framework/core/VDOM/component.js';
import { LOGOUT_URL, SERVER_URL } from '../../services/network/URLs.js';
import {
    createComponent,
    createElement,
} from '../../framework/core/VDOM/VDOMElement.js';
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
            method: 'GET',
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
