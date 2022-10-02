import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
    createText,
} from '../lib/core/VDOM/VDOMElement.js';
import Link from '../lib/router/Link.js';

export default class Main extends Component {
    state = {
        counter: 1,
    };

    render() {
        return createElement(
            'div',
            null,
            createText('h3', { key: 'hi' }, this.state.counter),
            createElement(
                'button',
                {
                    key: 'hello',
                    onclick: () =>
                        this.setState(state => {
                            state.counter = state.counter + 1;
                            return state;
                        }),
                },
                createText('p', { key: 'another hi' }, 'Increment'),
            ),
            createComponent(Link, { to: '/signup', value: 'Go to signup' }),
        );
    }
}
