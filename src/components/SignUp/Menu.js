import { Component } from '../../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../../lib/core/VDOM/VDOMElement.js';
import SignUpForm from './SignUpForm.js';
import Toggle from './Toggle.js';

export class Menu extends Component {
    render() {
        return createElement(
            'div',
            { key: 'menu', className: 'menu' },
            createElement(
                'div',
                { key: 'menu__wrapper', className: 'menu__wrapper' },
                createComponent(Toggle, { key: 'toggleElem' }),
                createComponent(SignUpForm, { key: 'fform' }, null),
            ),
        );
    }
}
