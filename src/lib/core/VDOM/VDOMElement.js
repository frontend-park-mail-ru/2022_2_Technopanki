/**
 * Creates VDOM node that represent DOM element (like div, ul, a...)
 * @param {string} tagName
 * @param {Object} props
 * @param {?Object[]} children
 * @returns {{children: *[], type: string, tagName, props}}
 */
export const createElement = (tagName, props, ...children) => {
    const obj = {
        type: 'element',
        tagName: tagName,
        props: props,
        children: children,
    };

    if (!obj.props) {
        obj.props = {
            key: Symbol('key'),
        };
    }

    if (!obj.props.key) {
        obj.props.key = Symbol('key');
    }

    return obj;
};

/**
 * Creates VDOM node that represent DOM text element (h1..h6, p...)
 * @param tagName
 * @param props
 * @param value
 * @returns {{type: string, tagName, value: (string|*), props}}
 */
export const createText = (tagName, props, value) => {
    const obj = {
        type: 'text',
        tagName: tagName,
        props: props,
        value: !value ? '' : value,
    };

    if (!obj.props) {
        obj.props = {
            key: Symbol('key'),
        };
    }

    if (!obj.props.key) {
        obj.props.key = Symbol('key');
    }

    return obj;
};

/**
 * Creates VDOM node that represent component
 * @param {Component} componentType
 * @param {Object} props
 * @param children
 * @returns {{component, instance, children: *[], type: string, props}}
 */
export const createComponent = (componentType, props, ...children) => {
    const obj = {
        type: 'component',
        instance: new componentType(),
        component: componentType,
        props: props,
        children: children,
    };

    if (!obj.props) {
        obj.props = {
            key: Symbol('key'),
        };
    }

    if (!obj.props.key) {
        obj.props.key = Symbol('key');
    }

    return obj;
};
