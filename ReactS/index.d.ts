import { ComponentChildren, PropsType } from './core/index';

declare global {
    // https://www.typescriptlang.org/docs/handbook/jsx.html
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any; // specify the property name to use
        }

        interface ElementClass {
            render: any;
        }

        interface ElementAttributesProperty {
            props: PropsType<any>;
        }

        interface ElementChildrenAttribute {
            children: ComponentChildren; // specify children name to use
        }
    }
}
