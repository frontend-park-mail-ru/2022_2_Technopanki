import { Component } from '../../framework/core/VDOM/component.js';
import { VACANCIES_URL, SERVER_URL } from '../../services/network/URLs.js';
import {
    createComponent,
    createElement,
} from '../../framework/core/VDOM/VDOMElement.js';
import HeaderVacancies from './HeaderVacancies.js';
import HeaderMain from './HeaderMain.js';

export default class HeaderLink extends Component {
    render() {
        if (location.pathname === '/vacancies') {
            return createElement(
                'div',
                null,
                createComponent(HeaderVacancies)
            );
        } else if (location.pathname === '/') {
            return createElement(
                'div',
                null,
                createComponent(HeaderMain)
            );
        }
    }
}