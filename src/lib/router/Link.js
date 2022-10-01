import { Router } from './Router.js';
import { Component } from '../core/VDOM/component.js';
import { createText } from '../core/VDOM/VDOMElement.js';

export default class Link extends Component {
    onClick = e => {
        e.preventDefault();
        window.history.pushState(null, null, this.props.to);
        Router(this.props.to);
    };

    render() {
        return createText(
            'a',
            {
                key: 'link',
                onclick: this.onClick,
                href: this.props.to,
            },
            this.props.value,
        );
    }
}
