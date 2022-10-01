import { renderElement } from './VDOM/render.js';
import { createComponent } from './VDOM/VDOMElement.js';
import { Router } from '../router/Router.js';

export const renderDOM = (root, component) => {
    root.innerHTML = '';

    root.appendChild(
        renderElement(
            createComponent(component, { key: 'root', ...component.props }),
        ),
    );
};
