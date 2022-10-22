import { Context } from './index';
import { PropType } from '../../shared/common';
import {
    CONTEXT_ELEMENT_SYMBOL,
    CONTEXT_TYPE,
    getUniqueSymbol,
    PROVIDER_ELEMENT_SYMBOL,
} from '../../shared/index';

export function setContextValue(context: Context<any>) {
    if (typeof context.props.children === 'function') {
        context.props.children = context.props.children(context.value);
    }

    if (__DEV__) {
        if (
            typeof context.props.children === 'function' ||
            typeof context.props.children === 'string' ||
            !context.props.children
        ) {
            throw new Error(
                'context children can not be type of function, string, null or undefined',
            );
        }
    }
}

export function createContext<T extends PropType>(defaultValue: T): Context<T> {
    const context = {
        $$typeof: CONTEXT_ELEMENT_SYMBOL,
        type: CONTEXT_TYPE,
        key: getUniqueSymbol(),
        props: {},
        value: defaultValue,
        Consumer: {},
        Provider: {},
    };

    context.Consumer = context;

    context.Provider = {
        $$typeof: PROVIDER_ELEMENT_SYMBOL,
        _context: context,
    };

    // @ts-ignore we have redefined Consumer and Provider fields
    return context;
}