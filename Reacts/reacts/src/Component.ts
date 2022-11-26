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
        const newState = update(this.state);

        if (this.shouldUpdateState(newState as S)) {
            this.state = newState;
            if (callback) {
                callback();
            }
            this.forceUpdate();
        }
    }

    // Updating
    shouldUpdate(nextProps: P | Readonly<P> /*nextState?: */): boolean {
        return this.props !== nextProps;
    }

    // TODO: объединить этот метод с shouldUpdate
    shouldUpdateState(nextState: S): boolean {
        return true;
    }

    forceUpdate(): void {
        const newNode = this.render();
        rerenderNode(this.currentNode?.ref, this.currentNode, newNode);

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
