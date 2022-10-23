import { ComponentClass } from './index';
import { rerenderComponent } from './renderComponent';
import { PropsType } from '../../shared/common';

export class Component<P extends PropsType = {}, S = {}> extends ComponentClass<
    P,
    S
> {
    constructor(props: P | Readonly<P>) {
        super(props);
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

    unmount(): void {
        console.log('unmount');
    }
}
