import { ComponentClass } from './index';
import {
    renderInDomElement,
    rerenderElement,
} from '../reacts-dom/render/index';

export abstract class Component<P, S> extends ComponentClass<P, S> {
    setState<K extends keyof S>(
        update: (prevState: S, props?: Readonly<P>) => Pick<S, K> | S | null,
        callback?: () => void,
    ) {
        // @ts-ignore
        this.state = update(this.state);
        console.log('setState called');
        if (callback) {
            callback();
        }

        // @ts-ignore
        console.log(this);
        rerenderElement(this._baseElement, this.render());
    }
}
