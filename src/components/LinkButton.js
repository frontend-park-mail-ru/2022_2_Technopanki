import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import Link from '../lib/router/Link.js';
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
