import { Component } from '../core/VDOM/component.js';
import { createText } from '../core/VDOM/VDOMElement.js';
import { Router } from './Router.js';

export default class Link extends Component {
    onClick = e => {
        e.preventDefault();
        Router.render(this.props.to);
    };

    render() {
        return createText(
            'a',
            {
                className: this.props.className,
                onclick: this.onClick,
                href: this.props.to,
            },
            this.props.value,
        );
    }
}
