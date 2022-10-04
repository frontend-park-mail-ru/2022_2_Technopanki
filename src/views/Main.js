import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import Link from '../lib/router/Link.js';
import LinkComponent from '../lib/router/LinkComponent.js';

export default class Main extends Component {
    state = {
        counter: 1,
    };

    render() {
        return createElement(
            'div',
            null,
            createText('h3', null, this.state.counter),
            createElement(
                'button',
                {
                    onclick: () =>
                        this.setState(state => {
                            state.counter = state.counter + 1;
                            return state;
                        }),
                },
                createText('p', null, 'Increment'),
            ),
            createComponent(Link, {
                to: '/signup',
                value: createText('p', null, 'Go to signup'),
            }),
            createComponent(Link, {
                to: '/',
                value: createElement(
                    'div',
                    null,
                    createText('h1', null, 'test'),
                ),
            }),
        );
    }
}
