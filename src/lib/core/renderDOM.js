import { renderElement } from './VDOM/render.js';
import { createComponent } from './VDOM/VDOMElement.js';

export const renderDOM = (root, component) => {
    root.innerHTML = '';

    root.appendChild(
        renderElement(createComponent(component, { ...component.props })),
    );
};
