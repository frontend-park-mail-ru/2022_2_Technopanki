import { ComponentClass, ReactsNode } from './index';
import { rerenderComponent } from './renderComponent';
import { PropsType, VNodeType } from '../../shared/common';

export abstract class Component<P extends PropsType = {}, S = {}> {
    readonly props: Readonly<P>;
    abstract state: Readonly<S>;

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

        rerenderComponent(this);
    }

    // Mounting
    componentDidMount(): void {}

    // Updating
    shouldComponentUpdate(nextProps: P | Readonly<P>, nextState?: S): void {}
    componentDidUpdate(): void {}

    // Unmounting
    componentWillUnmount(): void {}
    unmount(): void {}

    abstract render(): ReactsNode<P>;
}
