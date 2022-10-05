import { Component } from '../core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../core/VDOM/VDOMElement.js';
import { Router } from './Router.js';

/**
 * This is a wrapper over <a> that allows you to
 * conveniently insert links to other pages.
 */
export default class Link extends Component {
    onClick = e => {
        e.preventDefault();
        Router.render(this.props.to);
    };

    render() {
        return createElement(
            'a',
            {
                className: !this.props.className
                    ? 'link'
                    : 'link ' + this.props.className,
                onclick: this.onClick,
                href: this.props.to,
            },
            this.props.value,
        );
    }
}
