import Store from './store';
import { Action } from './types/action';

type DispatchCallback = (action: Action) => void;

class Dispatcher {
    callbacks: DispatchCallback[] = [];

    register(callback: DispatchCallback) {
        this.callbacks.push(callback);
    }

    dispatch(action: Action) {
        this.callbacks.map(callback => callback(action));
    }
}

export default new Dispatcher();
