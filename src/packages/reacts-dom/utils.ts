import { PropType } from '../shared/common';
import { setAttributes } from './render/renderNode';

export const createDomElement = (
    tagName: string,
    attributes: { [key: string]: PropType },
): HTMLElement => {
    const element = document.createElement(tagName);
    if (typeof attributes.children === 'string') {
        element.innerText = attributes.children;
    }
    setAttributes(element, attributes);
    return element;
};
