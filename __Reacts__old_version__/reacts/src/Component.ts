import { ComponentClass, ReactsNode } from './index';
import { rerenderComponent } from './renderComponent';
import { PropsType, VNodeType } from '../../shared/common';
import { COMPONENT_NODE_SYMBOL } from '../../shared';
import { rerenderNode } from '../../reacts-dom';

export abstract class Component<P extends PropsType = {}, S = {}> {
    readonly props: Readonly<P>;
    state: Readonly<S> | {} = {};

    rootDomRef?: HTMLElement;
    prevRenderVNodeRef?: VNodeType;

    constructor(props: Readonly<P> | P) {
        this.props = props;
    }

    setState<K extends keyof S>(
        update: (prevState: S, props?: Readonly<P>) => Pick<S, K> | S,
        callback?: () => void,
    ) {
        // @ts-ignore
        this.state = update(this.state);

        if (callback) {
            callback();
        }

        this.forceUpdate();
    }

    // Mounting
    componentDidMount(): void {}

    // Updating
    shouldComponentUpdate(nextProps: P | Readonly<P>, nextState?: S): void {}
    componentDidUpdate(): void {}
    forceUpdate(): void {
        this.rerender();
    }

    private rerender(): void {
        const VDomElement = this.render();
        if (!this.rootDomRef) {
            throw new Error('this.rootDomRef is empty');
        }
        rerenderNode(
            this.rootDomRef,
            // @ts-ignore if we call rerender => we have some prevRenderVNodeRef with DOM element
            this.prevRenderVNodeRef,
            VDomElement,
        );
        this.prevRenderVNodeRef = VDomElement;
        this.componentDidUpdate();
    }

    // Unmounting
    componentWillUnmount(): void {}
    unmount(): void {}

    abstract render(): ReactsNode<P>;
}
