import { Reducer } from './types/reducer';
import { Action } from './types/action';
import { StoreType } from './types/store';

/**
 * Store class contains the reducer, state and methods for working with it.
 */
export default class Store<S = any> implements StoreType {
    state: S;
    currentReducer: Reducer;
    listeners: (() => void)[] = [];

    constructor(
        reducer: Reducer,
        initialState: S,
        listeners: (() => void)[] = [],
    ) {
        this.state = initialState;
        this.currentReducer = reducer;
        this.listeners = listeners;
    }

    /**
     * Send action to reducer
     * @param action
     */
    dispatch(action: Action): void {
        this.state = this.currentReducer(this.state, action);
        this.listeners.forEach(listener => listener());
    }

    /**
     * Subscribe to changes in state
     * @param listener
     * @return unsubscribe function
     */
    subscribe(listener: () => void): Function {
        this.listeners.push(listener);

        return () => {
            const index = this.listeners.indexOf(listener);
            this.listeners.splice(index, 1);
        };
    }

    /**
     * Get snapshot of state
     */
    getState(): S {
        return this.state;
    }
}
