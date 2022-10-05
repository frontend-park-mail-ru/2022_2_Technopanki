const removeUntilKey = (operations, elements, key) => {
    while (elements[0] && elements[0][0] !== key) {
        operations.push(remove());
        elements.shift();
    }
};

/**
 * Add element to operations until we met key in elements
 * @param {[]} operations
 * @param elements
 * @param {string} key
 */
const insertUntilKey = (operations, elements, key) => {
    while (elements[0] && elements[0][0] !== key) {
        operations.push(insert(elements.shift()[1]));
    }
};

/**
 * Creates diff operations for child elements of a node
 * @param oldChildren - children of old VDOM node
 * @param newChildren - children of new VDOM node
 * @returns {*[]} - array of operations to be executed sequentially for each child of this node
 */
const childrenDiff = (oldChildren, newChildren) => {
    const remainingOldChildren = oldChildren.map(children => [
        children.props.key,
        children,
    ]);
    const remainingNewChildren = newChildren.map(children => [
        children.props.key,
        children,
    ]);

    // const remainingOldChildrenKeys = remainingOldChildren.map(k => k[0])
    const remainingNewChildrenKeys = remainingNewChildren.map(k => k[0]);

    const operations = [];

    // find first element that got updated
    let nextUpdateKey = remainingOldChildren.find(
        k => remainingNewChildrenKeys.indexOf(k[0]) !== -1,
    ) || [null];

    while (nextUpdateKey && nextUpdateKey[0] != null) {
        removeUntilKey(operations, remainingOldChildren, nextUpdateKey[0]);
        insertUntilKey(operations, remainingNewChildren, nextUpdateKey[0]);

        operations.push(
            createDiff(
                remainingOldChildren.shift()[1],
                remainingNewChildren.shift()[1],
            ),
        );

        nextUpdateKey = remainingOldChildren.find(
            k => remainingNewChildrenKeys.indexOf(k[0]) !== -1,
        ) || [null];
    }

    removeUntilKey(operations, remainingOldChildren, nextUpdateKey[0]);
    insertUntilKey(operations, remainingNewChildren, nextUpdateKey[0]);

    return operations;
};

/**
 * Compares 2 nodes of VDOM and returns
 * the operation to be performed in the real one on this node in DOM.
 * @param oldNode - old version of VDOM node
 * @param newNode - new version of VDOM node
 * @returns {{childrenUpdater, type: string, attrUpdater}|{type: string}|{newNode, type: string}} - operation to be performed on this element
 */
export const createDiff = (oldNode, newNode) => {
    if (
        oldNode.type === 'text' &&
        newNode.type === 'text' &&
        newNode.value === oldNode.value
    ) {
        return skip();
    }

    if (oldNode.type === 'text' || newNode.type === 'text') {
        return replace(newNode);
    }

    if (
        oldNode.type === 'component' &&
        newNode.type === 'component' &&
        oldNode.component === newNode.component
    ) {
        if (JSON.stringify(oldNode.props) === JSON.stringify(newNode.props))
            return skip();
        return update(
            {
                remove: Object.keys(oldNode.props).filter(
                    attr => Object.keys(newNode.props).indexOf(attr) === -1,
                ),
                set: (() => {
                    const attributes = Object.keys(newNode.props).filter(
                        attr => oldNode.props[attr] !== newNode.props[attr],
                    );
                    if (!attributes || attributes.length === 0) {
                        return attributes;
                    }

                    return attributes.reduce((updated, attr) => ({
                        ...updated,
                        attr,
                    }));
                })(),
            },
            childrenDiff(oldNode.children, newNode.children),
        );
    }

    if (newNode.type === 'component') {
        newNode.instance = new newNode.component();
        return replace(newNode.instance.initProps(newNode.props));
    }

    if (oldNode.tagName !== newNode.tagName) {
        return replace(newNode);
    }

    const attrUpdater = {
        remove: Object.keys(oldNode.props).filter(
            attr => Object.keys(newNode.props).indexOf(attr) === -1,
        ),
        set: (() => {
            const attributes = Object.keys(newNode.props).filter(
                attr => oldNode.props[attr] !== newNode.props[attr],
            );
            if (!attributes || attributes.length === 0) {
                return attributes;
            }

            return attributes.reduce((updated, attr) => ({
                ...updated,
                attr,
            }));
        })(),
    };

    const childrenUpdater = childrenDiff(oldNode.children, newNode.children);

    return update(attrUpdater, childrenUpdater);
};

/**
 * VDOM node update operation
 * @param attrUpdater
 * @param childrenUpdater
 * @returns {{childrenUpdater, type: string, attrUpdater}}
 */
const update = (attrUpdater, childrenUpdater) => ({
    type: 'update',
    attrUpdater: attrUpdater,
    childrenUpdater: childrenUpdater,
});

const replace = newNode => ({
    type: 'replace',
    newNode: newNode,
});

const skip = () => ({
    type: 'skip',
});

const insert = node => ({
    type: 'insert',
    node: node,
});

const remove = () => ({
    type: 'remove',
});
