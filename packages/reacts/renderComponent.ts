import { Component } from './Component';
import { rerenderElement } from '../reacts-dom/render/index';

export function rerenderComponent(component: Component<any, any>) {
    console.log(component);
    if (component.domRef) {
        const VDomElement = component.render();
        VDomElement._instance = component;
        rerenderElement(component.domRef, VDomElement);
    } else {
        throw new Error(
            `domRef = ${component.domRef}; component: ${component}`,
        );
    }
}
