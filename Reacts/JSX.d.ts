import { ComponentType } from './shared/types/component';
import { ChildrenType, PropsType, ReactsNode } from './shared/types/node';

declare global {
    namespace JSX {
        interface IntrinsicElements {
            [elemName: string]: any;
        }

        interface ElementClass {
            render: Function;
        }

        interface ElementAttributesProperty {
            props: PropsType;
        }

        interface ElementChildrenAttribute {
            children: ChildrenType; // specify children name to use
        }
    }
}
