import { PropsType, ReactsNode } from '../../shared/types/node';
import { ComponentType } from '../../shared/types/component';
import { rerenderNode } from '../../reacts-dom/render/rerenderNode';

export abstract class ReactsComponent<P extends PropsType = {}, S = {}>
    implements ComponentType
{
    readonly props: Readonly<P>;
    state: Readonly<S> | Readonly<{}> = {};

    ref: HTMLElement | null = null;
    currentNode: ReactsNode | null = null;

    constructor(props: P) {
        this.props = { ...props };
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

    // Updating
    shouldUpdate(nextProps: P | Readonly<P> /*nextState?: S*/): boolean {
        return this.props !== nextProps;
    }

    forceUpdate(): void {
        const newNode = this.render();
        rerenderNode(
            this.ref ?? this.currentNode.ref,
            this.currentNode,
            newNode,
        );

        this.currentNode = newNode;
        this.componentDidUpdate();
    }

    // Hooks
    componentDidMount(): void {}
    componentDidUpdate(): void {}
    componentWillUnmount(): void {}

    unmount(): void {
        this.ref = null;
        this.currentNode = null;
    }

    abstract render(): ReactsNode;
}
