import { Component } from './Component';
import { COMPONENT_ELEMENT_SYMBOL } from '../../shared/index';
import { rerenderNode } from '../../reacts-dom/index';

export function rerenderComponent(component: Component<any, any>) {
    if (component.rootDomRef && component.prevRenderVNodeRef) {
        const VDomElement = component.render();
        if (
            VDomElement.$$typeof.description ===
            COMPONENT_ELEMENT_SYMBOL.description
        ) {
            VDomElement._instance = component;
        }
        rerenderNode(
            component.rootDomRef,
            // @ts-ignore if we call rerender => we have some prevRenderVNodeRef with DOM element
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
