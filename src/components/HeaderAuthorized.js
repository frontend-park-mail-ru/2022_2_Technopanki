import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import { Component } from '../lib/core/VDOM/component.js';
import Button from './Button.js';

export default class HeaderAuthorized extends Component {
    render() {
        return createElement(
            'div',
            { className: 'header__buttons' },
            createText(
                'p',
                null,
                `${localStorage.getItem('name')} ${localStorage.getItem(
                    'surname',
                )}`,
            ),
            createComponent(Button, {
                className: 'btn',
                value: createText('p', null, 'Logout'),
                onclick: this.props.onclick,
            }),
        );
    }
}
