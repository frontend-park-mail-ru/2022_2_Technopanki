import { Reducer } from './types/reducer';
import { Action } from './types/action';
import { Store } from './types/store';

export function createStore<S = any>(
    reducer: Reducer<S>,
    initialState: S,
): Store {
    let state = initialState;
    let currentReducer = reducer;
    let listeners: (() => void)[] = [];

    function getState(): S {
        return state;
    }

    function subscribe(listener: () => void) {
        listeners.push(listener);

        return function unsubscribe() {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        };
    }

    function dispatch(action: Action) {
        state = currentReducer(state, action);
        listeners.forEach(listener => listener());
    }

    return {
        dispatch: dispatch,
        subscribe: subscribe,
        getState: getState,
    };
}
