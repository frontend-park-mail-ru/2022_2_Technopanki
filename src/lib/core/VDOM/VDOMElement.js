const createKey = () => {
    return Math.floor(Math.random() * Date.now()).toString();
};

export const createElement = (tagName, props, ...children) => {
    const obj = {
        type: 'element',
        tagName: tagName,
        props: props,
        children: children,
    };

    if (!obj.props) {
        obj.props = {
            key: createKey(),
        };
    }

    if (!obj.props.key) {
        obj.props.key = createKey();
    }

    return obj;
};

export const createText = (tagName, props, value) => {
    const obj = {
        type: 'text',
        tagName: tagName,
        props: props,
        value: value,
    };

    if (!obj.props) {
        obj.props = {
            key: createKey(),
        };
    }

    if (!obj.props.key) {
        obj.props.key = createKey();
    }

    return obj;
};

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
            key: createKey(),
        };
    }

    if (!obj.props.key) {
        obj.props.key = createKey();
    }

    return obj;
};
