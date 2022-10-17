import { Component } from './Component';
import { rerenderNode } from '../reacts-dom/render/rerenderNode';
import { COMPONENT_ELEMENT_SYMBOL, DOM_ELEMENT_SYMBOL } from '../shared/index';

export function rerenderComponent(component: Component<any, any>) {
    if (component.rootDomRef && component.prevRenderVNodeRef) {
        const VDomElement = component.render();
        console.log(VDomElement);
        if (
            VDomElement.$$typeof.description ===
            COMPONENT_ELEMENT_SYMBOL.description
        ) {
            VDomElement._instance = component;
        }
        console.log(
            component.rootDomRef,
            component.prevRenderVNodeRef,
            VDomElement,
        );
        rerenderNode(
            component.rootDomRef,
            component.prevRenderVNodeRef,
            VDomElement,
        );
        component.prevRenderVNodeRef = VDomElement;
    } else {
        throw new Error(
            `rootDomRef or prevRenderVNodeRef is empty. component: ${component}`,
        );
    }
}
