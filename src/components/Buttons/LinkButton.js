import { Component } from '../../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../../framework/core/VDOM/VDOMElement.js';
import Link from '../../framework/router/Link.js';
import Button from './Button.js';

export default class LinkButton extends Component {
    render() {
        return createComponent(Link, {
            to: this.props.to,
            value: createComponent(Button, {
                value: this.props.value,
                className: this.props.buttonClassName,
                onclick: this.props.onclick,
            }),
        });
    }
}
