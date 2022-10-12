/**
 * VDOM type interface
 */
export interface VNode<P = {}> {
    type: string;
    props: PropsType<P>;
    key: Key;
    ref: null; // TODO
    _owner: null; // TODO
}

export type PropsType<P> = P & { children: ComponentChildren };

export type Key = Symbol | string | number | undefined | null;

// TODO: переработать детей элемента (оставить только VNode<any>, string, int и null)
export type ComponentChild =
    | VNode<any>
    | object
    | string
    | number
    | bigint
    | boolean
    | null
    | undefined;

export type ComponentChildren = Array<ComponentChild> | ComponentChild;

export abstract class Component<P, S> {
    constructor(props?: P);

    state: Readonly<S>;
    props: P;
}
