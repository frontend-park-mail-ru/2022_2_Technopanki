import { Component } from './Component';
import { COMPONENT_NODE_SYMBOL } from '../../shared/index';
import { rerenderNode } from '../../reacts-dom/index';
import { VNodeType } from '../../shared/common';
import { ReactsNode } from './index';

export function rerenderComponent(component: Component<any, any>) {
    if (component.rootDomRef && component.prevRenderVNodeRef) {
        const VDomElement = component.render();
        if (VDomElement.$$typeof === COMPONENT_NODE_SYMBOL) {
            VDomElement._instance = component;
        }
        rerenderNode(
            component.rootDomRef,
            // @ts-ignore if we call rerender => we have some prevRenderVNodeRef with DOM element
            component.prevRenderVNodeRef,
            VDomElement,
        );
        (<VNodeType>component.prevRenderVNodeRef) = VDomElement;
    } else {
        throw new Error(
            `rootDomRef or prevRenderVNodeRef is empty. component: ${component}`,
        );
    }
}
