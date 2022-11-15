import {
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsFunctionalComponentNode,
    ReactsNode,
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

// TODO: оставить один аргумент - operation
export const updateElementAttributes = (
    operation: UpdateOperation,
    node: ReactsDOMNode,
) => {
    removeProps(node, operation.attrUpdater.remove);
    setNewProps(node, operation.attrUpdater.set);
};

const updateDOMNode = (
    operation: UpdateOperation & { node: ReactsDOMNode },
) => {
    updateElementAttributes(operation, operation.node);
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

const updateComponentNode = (
    operation: UpdateOperation & { node: ReactsComponentNode },
) => {
    if (operation.node.instance?.shouldUpdate({ ...operation.node.props })) {
        // @ts-ignore
        operation.node.instance.props = operation.node.props;
        operation.node.instance?.forceUpdate();
        return;
    }

    if (
        operation.node.props.children &&
        isArray(operation.node.props.children)
    ) {
        applyChildrenDiff(
            operation.node.ref as HTMLElement,
            operation.childrenUpdater as Operation[],
        );
    } else if (operation.node.props.children) {
        applyChildrenDiff(
            operation.node.ref as HTMLElement,
            operation.childrenUpdater as Operation[],
        );
    }
};

export const updateNode = (
    element: HTMLElement,
    operation: UpdateOperation,
) => {
    console.log('update');
    if (isPrimitive(operation.node)) {
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
            return;
    }
};
