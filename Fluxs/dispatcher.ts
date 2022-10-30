import Store from './store';
import { Action } from './types/action';

type DispatchCallback = (action: Action) => void;

class Dispatcher {
    callbacks: DispatchCallback[] = [];

    register(callback: DispatchCallback) {
        this.callbacks.push(callback);
    }

    dispatch(action: Action) {
        for (const callback of this.callbacks) {
            callback(action);
        }
    }
}

export default new Dispatcher();
