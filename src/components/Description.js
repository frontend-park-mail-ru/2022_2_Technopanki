import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';

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
                createText('img', {
                    key: 'img',
                    alt: 'Jobflow',
                    src: 'img/Logo.svg',
                    height: '16',
                }),
            ),
            createElement(
                'div',
                {
                    className: 'description__img-wrapper',
                    key: 'description__img-wrapper',
                },
                createText('img', {
                    key: 'img',
                    className: 'description__img',
                    alt: 'Illustration',
                    src: 'img/Illustration.svg',
                }),
            ),
        );
    }
}
