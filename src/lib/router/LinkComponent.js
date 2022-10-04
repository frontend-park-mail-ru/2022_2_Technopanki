import { Component } from '../core/VDOM/component.js';
import { createElement } from '../core/VDOM/VDOMElement.js';
import { Router } from './Router.js';

export default class LinkComponent extends Component {
    onClick = e => {
        e.preventDefault();
        Router.render(this.props.to);
    };

    render() {
        return createElement(
            this.props.element,
            {
                className: this.props.className,
                onclick: this.onClick,
                href: this.props.to,
            },
            this.props.children,
        );
    }
}
