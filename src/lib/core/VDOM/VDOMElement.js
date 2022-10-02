export const createElement = (tagName, props, ...children) => {
    return {
        type: 'element',
        tagName: tagName,
        props: props,
        children: children,
        key:
            props == null || typeof props.key === 'undefined'
                ? Math.floor(Math.random() * Date.now()).toString()
                : props.key,
    };
};

export const createText = (tagName, props, value) => {
    return {
        type: 'text',
        tagName: tagName,
        props:
            props == null
                ? { key: Math.floor(Math.random() * Date.now()).toString() }
                : props,
        value: value,
        key:
            props == null
                ? 1
                : typeof props.key === 'undefined'
                ? Math.floor(Math.random() * Date.now()).toString()
                : props.key,
    };
};

export const createComponent = (componentType, props, ...children) => {
    return {
        type: 'component',
        instance: new componentType(),
        component: componentType,
        props: props,
        children: children,
        key:
            props == null || typeof props.key === 'undefined'
                ? Math.floor(Math.random() * Date.now()).toString()
                : props.key,
    };
};
