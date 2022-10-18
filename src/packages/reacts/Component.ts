import { ComponentClass, ReactsContext } from './index';
import { rerenderComponent } from './renderComponent';
import { PropsType } from '../shared/common';

export class Component<P extends PropsType, S = {}> extends ComponentClass<
    P,
    S
> {
    constructor(props: P | Readonly<P>) {
        super(props);
    }

    shouldComponentUpdate(props: P | Readonly<P>): boolean {
        // TODO: refactor
        return this.props.value === props.value;
    }

    setState<K extends keyof S>(
        update: (prevState: S, props?: Readonly<P>) => Pick<S, K> | S,
        callback?: () => void,
    ) {
        // @ts-ignore
        this.state = update(this.state);
        console.log('setState called');

        if (callback) {
            callback();
        }

        rerenderComponent(this);
    }
}
