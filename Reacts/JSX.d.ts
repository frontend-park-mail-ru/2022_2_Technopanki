import { ComponentType, PropsType } from './shared/common';

declare global {
    // https://www.typescriptlang.org/docs/handbook/jsx.html
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any; // specify the property name to use
        }

        interface ElementClass {
            render: Function;
        }

        interface ElementAttributesProperty {
            props: PropsType;
        }

        interface ElementChildrenAttribute {
            children: ComponentType; // specify children name to use
        }
    }
}
