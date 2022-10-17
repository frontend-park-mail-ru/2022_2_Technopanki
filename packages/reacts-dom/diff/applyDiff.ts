import { AttributeUpdater, Operation } from './index';
import {
    INSERT_OPERATION,
    REMOVE_OPERATION,
    REPLACE_OPERATION,
    SKIP_OPERATION,
    UPDATE_OPERATION,
} from './operations';
import { setAttributes } from '../render/renderNode';
import { VNodeType } from '../common';
import { createDomElement } from '../utils';

const replaceElement = (
    element: HTMLElement,
    node: VNodeType & { type: string },
) => {
    const newElement = document.createElement(node.type);
    setAttributes(newElement, node.props);
    element.replaceWith(newElement);
};

const updateElementAttributes = (
    element: HTMLElement,
    operation: Operation & {
        type: string;
        attrUpdater: AttributeUpdater;
        childrenUpdater: Operation[];
    },
) => {
    // TODO
    operation.attrUpdater.set.forEach(
        // @ts-ignore
        ([attr, value]) => (element[attr] = value),
    );
    operation.attrUpdater.update.forEach(
        // @ts-ignore
        ([attr, value]) => (element[attr] = value),
    );
    operation.attrUpdater.remove.forEach(attr => element.removeAttribute(attr));
};

export const applyDiff = (element: HTMLElement, operation: Operation) => {
    console.log(operation);
    if (operation.type === SKIP_OPERATION) {
        return;
    }

    if (operation.type === REPLACE_OPERATION) {
        // @ts-ignore trust me, check replace operation in operations.ts
        replaceElement(element, operation.node);
        return;
    }

    if (operation.type === UPDATE_OPERATION) {
        // @ts-ignore trust me, check replace operation in operations.ts
        updateElementAttributes(element, operation);

        if (operation.childrenUpdater && operation.oldNode) {
            // @ts-ignore TODO
            applyChildrenDiff(element, operation.childrenUpdater);
        }
    }

    return element;
};

export const applyChildrenDiff = (
    element: HTMLElement,
    diffOperations: Operation[],
) => {
    let offset = 0;
    for (let i = 0; i < diffOperations.length; ++i) {
        if (diffOperations[i].type === SKIP_OPERATION) {
            continue;
        }
        const childUpdater = diffOperations[i];
        const childElem = element.childNodes[i + offset];

        if (childUpdater.type === INSERT_OPERATION) {
            childElem.appendChild(
                createDomElement(
                    // @ts-ignore trust me, check insert operation in operations.ts
                    childUpdater.node.type,
                    // @ts-ignore trust me, check insert operation in operations.ts
                    childUpdater.node.props,
                ),
            );
            continue;
        }

        if (childUpdater.type === REMOVE_OPERATION) {
            childElem.remove();
            offset -= 1;
            continue;
        }

        // @ts-ignore TODO
        applyDiff(childElem, childUpdater);
    }
};
