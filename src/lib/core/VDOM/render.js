/**
 * Creates a DOM element from an element of VDOM
 * @param root - VDOM element
 * @returns {*} - DOM element
 */
export const renderElement = root => {
    if (root.type === 'component') {
        if (!root.instance) {
            root.instance = new root.component();
        }

        const elem = renderElement(root.instance.initProps(root.props));
        root.instance.notifyMounted(elem);
        return elem;
    }

    const elem = document.createElement(root.tagName);
    if (root.props) {
        Object.keys(root.props).forEach(
            attr => (elem[attr] = root.props[attr]),
        );
    }

    if (root.type === 'text') {
        elem.innerText = root.value;
        return elem;
    } else if (root.children) {
        root.children.forEach(child => elem.appendChild(renderElement(child)));
    }

    return elem;
};

/**
 * Applies result of diff algorithm to DOM element
 * @param elem - DOM element
 * @param diff - Changes to be applied
 * @returns {*}
 */
export const applyDiff = (elem, diff) => {
    if (diff.type === 'skip') {
        return elem;
    }

    if (diff.type === 'replace') {
        const newElem = renderElement(diff.newNode);
        elem.replaceWith(newElem);
        return newElem;
    }

    const attributesWillBeDeleted = Object.keys(diff.attrUpdater.remove) || [
        null,
    ];
    attributesWillBeDeleted.forEach(attr => elem.removeAttribute(attr));

    const attributesWillBeAdded = Object.values(diff.attrUpdater.set) || [null];
    attributesWillBeAdded.forEach(([attr, value]) => (elem[attr] = value));

    applyChildrenDiff(elem, diff.childrenUpdater);

    return elem;
};

export const applyChildrenDiff = (elem, operations) => {
    /**
     * It is necessary that during the "remove" operation
     * to preserve the order of children compared to operations array
     * @type {number}
     */
    let offset = 0;
    for (let i = 0; i < operations.length; ++i) {
        const childUpdater = operations[i];

        if (childUpdater.type === 'skip') continue;

        if (childUpdater.type === 'replace') {
            const newElem = renderElement(childUpdater.newNode);
            elem.childNodes[i + offset].replaceWith(newElem);
            continue;
        }

        if (childUpdater.type === 'insert') {
            elem.appendChild(renderElement(childUpdater.node));
            continue;
        }

        const childElem = elem.childNodes[i + offset];

        if (childUpdater.type === 'remove') {
            childElem.remove();
            offset -= 1;
            continue;
        }

        // type: update
        applyDiff(childElem, childUpdater);
    }
};
