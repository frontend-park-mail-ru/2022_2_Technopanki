import { ComponentChildren, Key, PropsType, VNode } from '../core/index';

type jsxDOMContainer = HTMLElement | DocumentFragment | null;
type jsxDOMElement = HTMLElement | DocumentFragment | Text;

declare type IJSX = (
    type: string,
    props: {} & { children: ComponentChildren },
    key?: Key,
) => VNode<any>;
