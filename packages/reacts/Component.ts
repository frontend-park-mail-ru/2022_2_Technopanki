import { ComponentClass } from './index';
import { rerenderComponent } from './renderComponent';
import { PropsType } from '../reacts-dom/common';

export class Component<P extends PropsType = {}, S = {}> extends ComponentClass<
    P,
    S
> {
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
