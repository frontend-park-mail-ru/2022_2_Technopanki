export const createElement = (tagName, props, ...children) => {
    return {
        type: 'element',
        tagName: tagName,
        props: props,
        children: children,
        key: props.key,
    };
};

export const createText = (tagName, props, value) => {
    return {
        type: 'text',
        tagName: tagName,
        props: props,
        value: value,
        key: props.key,
    };
};

export const createComponent = (componentType, props, ...children) => {
    return {
        type: 'component',
        instance: new componentType(),
        component: componentType,
        props: props,
        children: children,
        key: props.key,
    };
};
