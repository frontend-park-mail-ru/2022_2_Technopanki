import { ReactsNode } from '../../../shared/types/node';
import { isPrimitiveNodes } from '../../utils/isPrimitive';

const removePrimitiveNode = () => {};

const removeDOMNode = () => {};

const removeComponentNode = () => {};

const insertPrimitiveNode = () => {};

const insertDOMNode = () => {};

const insertComponentNode = () => {};

export const replaceNode = (
    element: HTMLElement,
    oldNode: ReactsNode,
    newNode: ReactsNode,
) => {
    console.log('replace');
    if (isPrimitiveNodes(oldNode, newNode)) {
        if (typeof newNode === 'string') {
            element.replaceWith(document.createTextNode(newNode));
        } else if (typeof newNode === 'number') {
            element.replaceWith(document.createTextNode(newNode.toString()));
        } else {
            element.replaceWith(document.createTextNode(''));
        }
    }
};
