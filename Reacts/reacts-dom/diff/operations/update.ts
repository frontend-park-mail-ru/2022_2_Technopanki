import {
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsFunctionalComponentNode,
    ReactsPrimitiveNode,
} from '../../../shared/types/node';
import { isPrimitive } from '../../utils/isPrimitive';
import { Operation, UpdateOperation } from '../types';
import { removeProps, setNewProps } from '../../props/props';
import {
    COMPONENT_SYMBOL,
    DOM_SYMBOL,
} from '../../../shared/constants/symbols';
import { applyChildrenDiff } from '../applyChildrenDiff';
import { isArray } from '../../utils/isArray';
import { applyDiff } from '../applyDiff';
import { doc } from 'prettier';

/**
 * Updates DOM node attributes
 * @param operation
 */
export const updateElementAttributes = (operation: UpdateOperation) => {
    removeProps(operation.node as ReactsDOMNode, operation.attrUpdater.remove);
    setNewProps(operation.node as ReactsDOMNode, operation.attrUpdater.set);
};

/**
 * Updates primitive node
 * @param element
 * @param node
 */
const updatePrimitiveNode = (
    element: HTMLElement,
    node: ReactsPrimitiveNode,
) => {
    if (typeof node === 'string') {
        element.replaceWith(document.createTextNode(node));
    } else if (typeof node === 'number') {
        element.replaceWith(document.createTextNode(node.toString()));
    } else {
        element.replaceWith(document.createTextNode(''));
    }
};

/**
 * Updates DOM node
 * @param operation
 */
const updateDOMNode = (
    operation: UpdateOperation & { node: ReactsDOMNode },
) => {
    updateElementAttributes(operation);
    isArray(operation.childrenUpdater)
        ? applyChildrenDiff(
              operation.node.ref as HTMLElement,
              operation.childrenUpdater as Operation[],
          )
        : applyChildrenDiff(
              operation.node.ref as HTMLElement,
              [operation.childrenUpdater] as Operation[],
          );
};

/**
 * Updates component node
 * @param operation
 */
const updateComponentNode = (
    operation: UpdateOperation & { node: ReactsComponentNode },
) => {
    operation.node.instance?.componentDidUpdate();
    if (
        operation.node.props.children &&
        isArray(operation.node.props.children)
    ) {
        applyChildrenDiff(
            operation.node.ref as HTMLElement,
            operation.childrenUpdater as Operation[],
        );
    } else if (operation.node.props.children) {
        applyDiff(
            operation.node.ref as HTMLElement,
            operation.childrenUpdater as Operation,
        );
    }
};

/**
 * Update switcher
 * @param element
 * @param operation
 */
export const updateNode = (
    element: HTMLElement,
    operation: UpdateOperation,
) => {
    if (isPrimitive(operation.node)) {
        updatePrimitiveNode(element, operation.node as ReactsPrimitiveNode);
        return;
    }

    switch (
        (<ReactsComponentNode | ReactsFunctionalComponentNode | ReactsDOMNode>(
            operation.node
        )).$$typeof
    ) {
        case DOM_SYMBOL:
            updateDOMNode(
                operation as UpdateOperation & { node: ReactsDOMNode },
            );
            return;
        case COMPONENT_SYMBOL:
            updateComponentNode(
                operation as UpdateOperation & { node: ReactsComponentNode },
            );
            (<ReactsComponentNode>(
                operation.node
            )).instance?.componentDidUpdate();
            return;
    }
};
