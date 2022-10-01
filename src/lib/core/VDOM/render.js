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
    Object.keys(root.props).forEach(attr => (elem[attr] = root.props[attr]));

    if (root.type === 'text') {
        elem.innerText = root.value;
        return elem;
    } else if (root.children) {
        root.children.forEach(child => elem.appendChild(renderElement(child)));
    }

    return elem;
};

export const applyDiff = (elem, diff) => {
    if (diff.type === 'skip') {
        return elem;
    }

    if (diff.type === 'replace') {
        const newElem = renderElement(diff.newNode);
        elem.replaceWith(newElem);
        return newElem;
    }

    // TODO: rework to forEach
    for (const attr in diff.attrUpdater.remove) {
        elem.removeAttribute(attr);
    }

    for (const attr in diff.attrUpdater.set) {
        elem[attr] = diff.attrUpdater.set[attr];
    }

    applyChildrenDiff(elem, diff.childrenUpdater);

    return elem;
};

export const applyChildrenDiff = (elem, operations) => {
    let offset = 0;
    for (let i = 0; i < operations.length; ++i) {
        const childUpdater = operations[i];

        if (childUpdater.type === 'skip') continue;

        if (childUpdater.type === 'replace') {
            const newElem = childUpdater.newNode;
            elem.replaceWith(newElem);
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