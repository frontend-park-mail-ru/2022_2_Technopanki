import { ComponentConstructor, ComponentType } from './component';

export type KeyType = Symbol | string | number | null | undefined;

export type JSXVnodeType = {
    $$typeof: Symbol;
    type: string;
    [key: string]: any;
};
export type JSXElementType = string | ComponentConstructor | JSXVnodeType;

export type ChildrenType = ReactsNode | ReactsNode[];

export type PropType =
    | string[]
    | number[]
    | string
    | {}[]
    | {}
    | EventListenerOrEventListenerObject
    | string[]
    | number[]
    | {}[]
    | {}
    | ReactsNode
    | Function;
export type PropsType = { [key: string]: PropType };
export type PropsWithChildren = { children: ChildrenType } & PropsType;

//
// Vnode types
// --------------------------------------

export type ReactsNode =
    | ReactsComponentNode
    | ReactsEmptyNode
    | ReactsTextNode
    | ReactsDOMNode
    | ReactsFunctionalComponentNode;

export type ReactsNotPrimitiveNode = Exclude<
    ReactsNode,
    ReactsTextNode | ReactsEmptyNode
>;
export type ReactsPrimitiveNode = ReactsEmptyNode | ReactsTextNode;

export type ReactsEmptyNode = undefined | null | boolean;
export type ReactsTextNode = string | number;

export type ReactsComponentNode = {
    $$typeof: Symbol;
    type: ComponentConstructor;
    props: PropsWithChildren;
    key: KeyType;
    ref: HTMLElement | null;
    instance: ComponentType | null;
};

export type ReactsFunctionalComponentNode = {
    $$typeof: Symbol;
    type: ComponentConstructor;
    props: PropsWithChildren;
    key: KeyType;
    ref?: HTMLElement | null;
};

export type ReactsDOMNode = {
    $$typeof: Symbol;
    type: string;
    props: PropsWithChildren;
    key: KeyType;
    ref?: HTMLElement | null;
    // TODO: maybe add Function[]
    eventMap: Map<string, Function>;
};
