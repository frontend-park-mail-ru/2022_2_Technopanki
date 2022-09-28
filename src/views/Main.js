import Component from '../lib/core/Component.js';
import { Link } from '../lib/router/Link.js';

export default class Main extends Component {
    constructor(parent) {
        super(parent);

        this.state = document.createElement('div');
        const linkToSignup = Link('/signup', 'Go to signup');

        this.items = { content: linkToSignup };
    }
}
