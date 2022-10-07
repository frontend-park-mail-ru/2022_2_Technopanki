import { Component } from '../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../framework/core/VDOM/VDOMElement.js';
import LinkButton from './Buttons/LinkButton.js';
import { userModel } from '../services/model/userModel.js';

export default class Intro extends Component {
    componentWillMount = () => {
        if (userModel.isAuthorized) {
            document.querySelector('.main__intro-buttons').style.display =
                'none';
        }
    };

    render() {
        return createElement(
            'div',
            {
                key: 'intro',
                className: 'main',
            },
            createElement(
                'div',
                {
                    key: 'main left',
                    className: 'main__intro',
                },
                createText(
                    'h2',
                    {
                        className: 'main__intro-big',
                    },
                    'Начни строить\n' + 'свою карьеру\n' + 'прямо сейчас!',
                ),
                createText(
                    'p',
                    {
                        className: 'main__intro-small',
                    },
                    'На нашем сайте вы всегда можете узнать последние новости рынка труда, ' +
                        'а также изучить свежий обзор зарплат, с помощью которого легко' +
                        'оценить, на какие должности стоит нацелиться.',
                ),
                createElement(
                    'div',
                    { className: 'main__intro-buttons' },
                    createComponent(LinkButton, {
                        to: '/signup',
                        buttonClassName: 'btn btn-active',
                        value: createText('p', null, 'Зарегистрироваться'),
                    }),
                    createComponent(LinkButton, {
                        to: '/signup',
                        buttonClassName: 'btn',
                        value: createText('p', null, 'Войти'),
                    }),
                ),
            ),
            createElement('img', {
                key: 'banner',
                alt: 'banner',
                src: 'img/banner.svg',
            }),
        );
    }
}
