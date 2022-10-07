import { Component } from '../framework/core/VDOM/component.js';
import {
    createComponent,
    createElement,
} from '../framework/core/VDOM/VDOMElement.js';
import Header from '../components/Header/Header.js';
import Intro from '../components/Intro.js';

/**
 * Component for showing main page
 *
 * @component 
 */
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
