import { PropType } from './common';
import { setAttributes } from './render/renderNode';

export const createDomElement = (
    tagName: string,
    attributes: { [key: string]: PropType },
): HTMLElement => {
    const element = document.createElement(tagName);
    setAttributes(element, attributes);
    return element;
};
