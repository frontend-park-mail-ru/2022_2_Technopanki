import {
    PropsType,
    ReactsComponentNode,
    ReactsNode,
} from '../../shared/types/node';
import { ComponentType } from '../../shared/types/component';
import { rerenderNode } from '../../reacts-dom/render/rerenderNode';

/**
 * ReactsComponent allows you to encapsulate logic into one component
 * and provides hooks to control the state of the component
 */
export abstract class ReactsComponent<P extends PropsType = {}, S = {}>
    implements ComponentType
{
    readonly props: Readonly<P>;
    state: Readonly<S> | Readonly<{}> = {};

    ref: HTMLElement | null = null;
    currentNode: ReactsComponentNode | null = null;
    currentRenderNode: ReactsNode | null = null;

    constructor(props: P) {
        this.props = { ...props };
    }

    /**
     * Updates state of component and forces component to update if
     * this.shouldUpdateState returns true
     * @param update - pure function that takes old state and returns new state
     * @param callback - will be called before updating component
     */
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

    /**
     * Checks if component should be updated with new props
     * @param nextProps
     */
    shouldUpdate(nextProps: P | Readonly<P> /*nextState?: */): boolean {
        return this.props !== nextProps;
    }

    // TODO: объединить этот метод с shouldUpdate
    /**
     * Checks if component should be updated with new state
     * @param nextState
     */
    shouldUpdateState(nextState: S): boolean {
        return true;
    }

    /**
     * Updates component node without any comparison
     */
    forceUpdate(): void {
        const newNode = this.render();
        rerenderNode(
            this.currentRenderNode?.ref,
            this.currentRenderNode,
            newNode,
        );

        this.currentRenderNode = newNode;
        (<ReactsComponentNode>this.currentNode).props.children = newNode;
        this.componentDidUpdate();
    }

    /**
     * This hook will be called then component is rendered for the first time
     */
    componentDidMount(): void {}

    /**
     * This hook will be called then component updates
     */
    componentDidUpdate(): void {}

    /**
     * This hook will be called right before component will be unmounted
     */
    componentWillUnmount(): void {}

    unmount(): void {
        this.ref = null;
        this.currentRenderNode = null;
        this.currentNode = null;
    }

    /**
     * Creates virtual dom render tree and returns it
     */
    abstract render(): ReactsNode;
}
