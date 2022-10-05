import { Component } from '../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
} from '../lib/core/VDOM/VDOMElement.js';
import Header from '../components/Header.js';
import Intro from '../components/Intro.js';

export default class Main extends Component {
    render() {
        return createElement(
            'div',
            { key: 'main page' },
            createComponent(Header, { key: 'header' }),
            createComponent(Intro, { key: 'main page' }),
        );
    }
}
