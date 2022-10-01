import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
} from '../lib/core/VDOM/VDOMElement.js';
import Link from '../lib/router/Link.js';
import { Menu } from '../components/SignUp/Menu.js';

export default class Main extends Component {
    render() {
        return createElement(
            'div',
            { key: 'main', className: 'main' },
            createComponent(Menu, { key: 'hi' }),
            createComponent(Link, {
                key: '1',
                to: '/signup',
                value: 'Go to signup',
            }),
        );
    }
}
