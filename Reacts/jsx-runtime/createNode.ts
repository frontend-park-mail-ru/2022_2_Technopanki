import { ComponentConstructor } from '../shared/types/component';
import {
    KeyType,
    PropsWithChildren,
    ReactsComponentNode,
    ReactsDOMNode,
    ReactsNode,
} from '../shared/types/node';
import { COMPONENT_SYMBOL, DOM_SYMBOL } from '../shared/constants/symbols';
import { getUniqueKey } from '../shared/constants/getUniqueKey';

const createDOMNode = (
    type: string,
    props: PropsWithChildren,
    maybeKey: KeyType,
): ReactsDOMNode => ({
    $$typeof: DOM_SYMBOL,
    type: type,
    props: props,
    key: maybeKey ?? getUniqueKey(),
    ref: null,
    eventMap: (() => new Map<string, Function>())(),
});

const renderComponent = (
    node: ReactsComponentNode,
    props: PropsWithChildren,
) => {
    const instance = new (<ComponentConstructor>node.type)(props);
    const instanceRender = instance.render();

    node.props.children = instanceRender;
    node.instance = instance;
    node.instance.currentNode = instanceRender;
};

const createComponent = (
    type: ComponentConstructor,
    props: PropsWithChildren,
    maybeKey: KeyType,
): ReactsComponentNode => {
    const node: ReactsComponentNode = {
        $$typeof: COMPONENT_SYMBOL,
        type: type,
        props: props,
        key: maybeKey ?? getUniqueKey(),
        ref: null,
        instance: null,
    };
    renderComponent(node, props);
    return node;
};

/**
 * The function is required to enable dynamic generation of JSX elements. Example:
 * {this.state.data.map((item, index) => (
 *  <p key={item.id}>{item.name}</p>
 * ))}
 * @param type
 * @param props
 * @param maybeKey
 */
// const resolveArraysInChildren = (children: ReactsNode[]): ReactsNode[] => {
//     const newChildren: ReactsNode[] = [];
//     children.forEach(elem => {
//         if (Array.isArray(elem)) {
//             elem.forEach(item => {
//                 newChildren.push(item);
//             });
//         } else {
//             newChildren.push(elem);
//         }
//     });
//
//     return newChildren;
// };

/**
 *
 * @param type
 * @param props
 * @param maybeKey
 */
export const createNode = (
    type: string | ComponentConstructor,
    props: PropsWithChildren,
    maybeKey: KeyType,
): ReactsNode => {
    switch (typeof type) {
        case 'string':
            return createDOMNode(type, props, maybeKey);
        case 'function':
            return createComponent(type, props, maybeKey);
        default:
            // @ts-ignore
            if (__DEV__) {
                throw new Error(`undefined type: ${type}`);
            }
    }
};
