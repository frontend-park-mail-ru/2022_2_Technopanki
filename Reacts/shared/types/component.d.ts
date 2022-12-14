import { PropsType, ReactsNode } from './node';

export interface ComponentConstructor {
    new (props: PropsType): ComponentType;
}

export interface ComponentType {
    props: any;
    ref: HTMLElement | null;
    currentNode: ReactsNode | null;
    currentRenderNode: ReactsNode | null;

    componentDidMount(): void;
    componentDidUpdate(): void;
    componentWillUnmount(): void;
    forceUpdate(): void;
    shouldUpdate(nextProps?: PropsType): boolean;

    unmount(): void;
    render(): ReactsNode;
}

export interface RootType {
    render(node: ReactsNode): void;
    unmount(): void;
}
