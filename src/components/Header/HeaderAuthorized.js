import {
    createComponent,
    createElement,
    createText,
} from '../../framework/core/VDOM/VDOMElement.js';
import { Component } from '../../framework/core/VDOM/component.js';
import Button from '../Buttons/Button.js';
import { userModel } from '../../services/model/userModel.js';

export default class HeaderAuthorized extends Component {
    render() {
        return createElement(
            'div',
            { className: 'header__buttons' },
            createText('p', null, `${userModel.name} ${userModel.surname}`),
            createComponent(Button, {
                className: 'btn',
                value: createText('p', null, 'Выйти'),
                onclick: this.props.onclick,
            }),
        );
    }
}
