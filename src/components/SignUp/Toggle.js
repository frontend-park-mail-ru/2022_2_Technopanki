import { Component } from '../../lib/core/VDOM/component.js';
import {
    createComponent,
    createElement,
} from '../../lib/core/VDOM/VDOMElement.js';
import ToggleElement from './ToggleElement.js';

export default class Toggle extends Component {
    removeActive = element => {
        element.classList.remove('toggle__active');
        const icon = element.querySelector('.toggle__element-icon');
        // icon.classList.remove('toggle__element-icon_active');
        // icon.classList.add('toggle__element-icon_disabled');
    };

    addActive = element => {
        element.classList.add('toggle__active');
        const icon = element.querySelector('.toggle__element-icon');
        // icon.classList.add('toggle__element-icon_active');
        // icon.classList.remove('toggle__element-icon_disabled');
    };

    switchToggles = () => {
        const applicant = document.querySelector('#applicant_toggle');
        const employer = document.querySelector('#employer_toggle');

        const switchToApplicant = () => {
            this.removeActive(employer);
            this.addActive(applicant);
        };

        const switchToEmployer = () => {
            this.removeActive(applicant);
            this.addActive(employer);
        };

        applicant.addEventListener('click', switchToApplicant);
        employer.addEventListener('click', switchToEmployer);
    };

    render() {
        return createElement(
            'div',
            {
                key: 'toggle',
                className: 'toggle',
            },
            createComponent(ToggleElement, {
                key: 'element1',
                isActive: true,
                id: 'applicant_toggle',
                headerLine: 'Я соискатель',
                textLine: 'Зарегистрироваться как соискатель',
                onclick: this.switchToggles,
            }),
            createComponent(ToggleElement, {
                key: 'element2',
                isActive: false,
                id: 'employer_toggle',
                headerLine: 'Я работодатель',
                textLine: 'Зарегистрироваться как работодатель',
                onclick: this.switchToggles,
            }),
        );
    }
}
