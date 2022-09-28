import Component from '../lib/core/Component.js';
import { signUpTemplate } from '../templates/signUpTemplate.js';

const createSignUpFromHBS = () => {
    const template = Handlebars.compile(signUpTemplate);
    return template(undefined, undefined);
};

export default class Signup extends Component {
    constructor(parent) {
        super(parent);

        this.state = document.createElement('div');
        this.state.classList.add('signup');
        this.state.innerHTML = createSignUpFromHBS();
    }
}
