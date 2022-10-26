import { Component } from '../reacts/index';
import { Store } from '../../Fluxs/types/store';

function connect(store: Store, target: Component<any, any>) {
    return function (...args: any) {
        // @ts-ignore we pass our custom component here
        const instance = new target(...args);
        instance.props.value = store.getState();
        store.subscribe(() => {
            instance.render();
        });
        return instance;
    };
}

export default function createConnect(store: Store) {
    return function (target: Component<any, any>) {
        console.log('connect called');
        return function (...args: any) {
            // @ts-ignore we pass our custom component here
            const instance = new target(...args);
            instance.props.value = store.getState();
            store.subscribe(() => {
                instance.render();
            });
            return instance;
        };
    };
}
