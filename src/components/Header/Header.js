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
            createElement(
                'div',
                {
                    key: 'main_links',
                    className: 'header__links',
                },
                createComponent(Link, {
                    key: 'vacancies page',
                    to: '/vacancies',
                    className: 'header__links-default',
                    value: createText(
                        'p',
                        { key: 'vacancies page link' },
                        'Все вакансии',
                    ),
                }),
                createComponent(Link, {
                    key: 'create resume',
                    to: '/',
                    className: 'header__links-default',
                    value: createText(
                        'p',
                        { key: 'create resume link' },
                        'Создать резюме',
                    ),
                }),
            ),
            createComponent(HeaderInfo),
        );
    }
}
