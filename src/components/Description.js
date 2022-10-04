import { Component } from '../lib/core/VDOM/component.js';
import { createElement, createText } from '../lib/core/VDOM/VDOMElement.js';

export default class Description extends Component {
    render() {
        return createElement(
            'div',
            {
                key: 'description',
                className: 'description',
            },
            createElement(
                'div',
                {
                    className: 'description__container',
                    key: 'description__container',
                },
                createElement('img', {
                    key: 'img',
                    alt: 'Jobflow',
                    src: 'img/Logo.svg',
                    height: '16',
                }),
                createText(
                    'h3',
                    { className: 'description__header' },
                    'Создай свою команду\nНайди свою миссию',
                ),
                createText(
                    'p',
                    { className: 'description__text' },
                    'Мы создаем передовые технологии на всех доступных платформах для того, чтобы работодатели могли быстро найти подходящего сотрудника, а соискатели — хорошую работу. ',
                ),
            ),
            createElement(
                'div',
                {
                    className: 'description__img-wrapper',
                    key: 'description__img-wrapper',
                },
                createElement('img', {
                    key: 'img',
                    className: 'description__img',
                    alt: 'Illustration',
                    src: 'img/Illustration.svg',
                }),
            ),
        );
    }
}
