import { renderElement } from './VDOM/render.js';
import { createComponent } from './VDOM/VDOMElement.js';

/**
 * Render component inside root a component
 * @param root - DOM element
 * @param component - component that will be rendered inside root
 */
export const renderDOM = (root, component) => {
    root.innerHTML = '';
    root.appendChild(
        renderElement(createComponent(component, { ...component.props })),
    );
};
