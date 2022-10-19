import { Consumer, Context, Provider } from './index';
import { PropType } from '../shared/common';
import {
    CONSUMER_ELEMENT_SYMBOL,
    CONSUMER_TYPE,
    getUniqueSymbol,
    PROVIDER_ELEMENT_SYMBOL,
    PROVIDER_TYPE,
} from '../shared/index';

// TODO: refactor
export function ProviderConstructor<T extends PropType>(
    defaultValue: T,
): Provider<T> {
    return {
        $$typeof: PROVIDER_ELEMENT_SYMBOL,
        type: PROVIDER_TYPE,
        key: getUniqueSymbol(),
        props: { value: defaultValue },
        // _consumers: consumers,
    };
}

export function ConsumerConstructor<T extends PropType>(
    defaultValue: T,
    provider: Provider<T>,
): Consumer<T> {
    return {
        $$typeof: CONSUMER_ELEMENT_SYMBOL,
        type: CONSUMER_TYPE,
        key: getUniqueSymbol(),
        props: { value: defaultValue },
        _provider: provider,
    };
}

export function createContext<T extends PropType>(defaultValue: T): Context<T> {
    const provider = ProviderConstructor(defaultValue);
    const consumer = ConsumerConstructor(defaultValue, provider);
    return {
        Provider: provider,
        Consumer: consumer,
    };
}
