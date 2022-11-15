import {
    PropsWithChildren,
    PropType,
    ReactsDOMNode,
    ReactsNode,
} from '../../shared/types/node';
import { attributes, events } from './constants';
// TODO: rename to attributes

export const setAttribute = (
    node: ReactsDOMNode,
    attr: string,
    value: string,
) => {
    // @ts-ignore
    if (true) {
        if (!attributes[attr]) {
            throw new Error(`unsupported type of attribute: ${attr}`);
        }

        if (!node.ref) {
            throw new Error('node.ref is null');
        }
    }

    (<HTMLElement>node.ref).setAttribute(attributes[attr], value);
};

export const removeEventListener = (node: ReactsDOMNode, eventName: string) => {
    console.log(eventName);
    if (node.eventMap.get(eventName)) {
        (<Function>node.eventMap.get(eventName))();
    }

    node.eventMap.delete(eventName);
};

export const setEventListener = (
    node: ReactsDOMNode,
    eventName: string,
    listener: EventListenerOrEventListenerObject,
) => {
    // @ts-ignore
    // if (__DEV__) {
    //     if (!events[eventName]) {
    //         throw new Error(`unsupported type of event: ${eventName}`);
    //     }
    //
    //     if (!node.ref) {
    //         throw new Error('node.ref is null');
    //     }
    // }

    removeEventListener(node, eventName);
    (<HTMLElement>node.ref).addEventListener(events[eventName], listener);

    // Save callback for this event listener
    node.eventMap.set(eventName, () =>
        (<HTMLElement>node.ref).removeEventListener(
            events[eventName],
            listener,
        ),
    );
};

export const removeProps = (
    node: ReactsDOMNode,
    removedProps: [string, PropType][],
) => {
    removedProps.forEach(([propName, _]) => {
        // @ts-ignore
        if (propName === 'children') {
            throw new Error('children in removeProps');
        }

        if (propName.startsWith('on')) {
            removeEventListener(node, propName);
        } else {
            node.ref?.removeAttribute(propName);
        }
    });
};

export const removeAllProps = (node: ReactsDOMNode) => {
    node.eventMap.forEach(value => value());
    node.eventMap.clear();
    node.props = { children: node.props.children } as PropsWithChildren;
};

export const setNewProps = (
    node: ReactsDOMNode,
    setProps: [string, PropType][],
) => {
    setProps.forEach(([propName, value]) => {
        // @ts-ignore
        if (propName === 'children') {
            throw new Error('children in setNewProps');
        }

        if (propName.startsWith('on')) {
            setEventListener(
                node,
                propName,
                value as EventListenerOrEventListenerObject,
            );
        } else {
            setAttribute(node, propName, value as string);
        }
    });
};

export const setProps = (node: ReactsDOMNode) => {
    Object.entries(node.props).forEach(([name, value]) => {
        if (!value) {
            return;
        }

        if (name !== 'children') {
            if (name.startsWith('on')) {
                setEventListener(
                    node,
                    name,
                    value as EventListenerOrEventListenerObject,
                );
            } else {
                setAttribute(node, name, value as string);
            }
        }
    });
};
