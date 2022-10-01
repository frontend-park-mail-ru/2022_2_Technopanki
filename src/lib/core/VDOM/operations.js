const removeUntilKey = (operations, elements, key) => {
    while (elements[0] && elements[0][0] !== key) {
        operations.push(remove());
        elements.shift();
    }
};

const insertUntilKey = (operations, elements, key) => {
    while (elements[0] && elements[0][0] !== key) {
        operations.push(insert(elements.shift()[1]));
    }
};

// TODO: refactor
// creates operations for children
const childrenDiff = (oldChildren, newChildren) => {
    const remainingOldChildren = oldChildren.map(children => [
        children.key,
        children,
    ]);
    const remainingNewChildren = newChildren.map(children => [
        children.key,
        children,
    ]);

    // const remainingOldChildrenKeys = remainingOldChildren.map(k => k[0])
    const remainingNewChildrenKeys = remainingNewChildren.map(k => k[0]);

    const operations = [];

    // find first element that got updated
    let nextUpdateKey = remainingOldChildren.find(
        k => remainingNewChildrenKeys.indexOf(k[0]) === -1,
    );
    while (nextUpdateKey) {
        removeUntilKey(operations, remainingOldChildren, nextUpdateKey);
        insertUntilKey(operations, remainingNewChildrenKeys, nextUpdateKey);

        operations.push(createDiff(remainingOldChildren.shift()));

        nextUpdateKey = remainingOldChildren.find(
            k => remainingNewChildrenKeys.indexOf(k[0]) === -1,
        );
    }

    removeUntilKey(operations, remainingOldChildren, nextUpdateKey);
    insertUntilKey(operations, remainingNewChildrenKeys, nextUpdateKey);

    return operations;
};

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

    if (oldNode.type === 'component' && newNode.type === 'component') {
        if (JSON.stringify(oldNode.props) === JSON.stringify(newNode.props))
            return skip();
        // TODO: if (isEqual(oldNode.props, newNode.props)) return skip();
        return newNode.instance.setProps(newNode.props);
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
            attr => Object.keys(newNode.keys).indexOf(attr) === -1,
        ),
        set: Object.keys(newNode.props)
            .filter(attr => oldNode.props[attr] !== newNode.props[attr])
            .reduce((updated, attr) => ({ ...updated, attr })),
    };

    const childrenUpdater = childrenDiff(oldNode.children, newNode.children);

    return update(attrUpdater, childrenUpdater);
};

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
