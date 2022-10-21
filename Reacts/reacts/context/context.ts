import { Context } from './index';
import { PropType } from '../../shared/common';
import {
    CONTEXT_ELEMENT_SYMBOL,
    CONTEXT_TYPE,
    getUniqueSymbol,
    PROVIDER_ELEMENT_SYMBOL,
} from '../../shared/index';

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

    return context;
}
