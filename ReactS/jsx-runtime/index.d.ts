import { ComponentChildren, Key, PropsType, VNode } from '../core/index';

type jsxDOMContainer = HTMLElement | DocumentFragment | null;
type jsxDOMElement = HTMLElement | DocumentFragment | Text;

declare type IJSX = (
    type: string,
    props: {} & { children: ComponentChildren },
    key?: Key,
) => VNode<any>;

declare global {
    // https://www.typescriptlang.org/docs/handbook/jsx.html
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any; // specify the property name to use
        }

        interface ElementAttributesProperty {
            props: PropsType<any>;
        }

        interface ElementChildrenAttribute {
            children: ComponentChildren; // specify children name to use
        }
    }
}
