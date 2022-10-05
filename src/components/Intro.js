import { Component } from '../lib/core/VDOM/component.js';
import { createElement, createText } from '../lib/core/VDOM/VDOMElement.js';

export default class Intro extends Component {
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
                    'На нашем сайте вы всегда можете узнать последние новости рынка труда,\n' +
                        'а также изучить свежий обзор зарплат, с помощью которого легко\n' +
                        'оценить, на какие должности стоит нацелиться.',
                ),
            ),
            createText(
                'img',
                {
                    key: 'banner',
                    alt: 'banner',
                    src: 'img/banner.svg',
                },
                'some text',
            ),
        );
    }
}
