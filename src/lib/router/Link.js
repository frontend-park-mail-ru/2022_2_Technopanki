// import { Router } from './Router.js';
import { Component } from '../core/VDOM/component.js';
import { createText } from '../core/VDOM/VDOMElement.js';
import { Router } from './Router.js';

export default class Link extends Component {
    onClick = e => {
        e.preventDefault();
        Router.routeTo(this.props.to);
    };

    render() {
        return createText(
            'a',
            {
                onclick: this.onClick,
                href: this.props.to,
            },
            this.props.value,
        );
    }
}
