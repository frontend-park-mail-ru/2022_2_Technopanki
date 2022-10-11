import { Component } from '../../framework/core/VDOM/component.js';
import { LOGOUT_URL, SERVER_URL } from '../../services/network/URLs.js';
import {
    createComponent,
    createElement,
} from '../../framework/core/VDOM/VDOMElement.js';
import HeaderAuthorized from './HeaderAuthorized.js';
import HeaderUnauthorized from './HeaderUnauthorized.js';
import { userModel } from '../../services/model/userModel.js';
import { NetworkHander } from '../../services/network/NetworkHandler.js';

export default class HeaderInfo extends Component {
    state = {
        isAuthorized: userModel.isAuthorized,
        name: userModel.name,
        surname: userModel.surname,
    };

    logout = () => {
        userModel.isAuthorized = false;

        this.setState(state => {
            state.isAuthorized = false;
            return state;
        });

        NetworkHander.POST(LOGOUT_URL);
    };

    render() {
        if (userModel.isAuthorized) {
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
