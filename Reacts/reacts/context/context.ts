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
        // The answer to the question: why are we accessing the context value through the consumer, and not directly?
        //
        // In createNode.ts (jsx-runtime) we create a new object for each node. Because JSX goes from top to bottom (from leaves to root), then
        // objects that are created by consumers will have an obsolete value (the provider is lower in the tree, it will
        // not have time to update the value). But contexts also have a recursive reference to the context object itself! (in Consumer)
        // Recursiveness is needed here just so that we can access the value by reference and take the actual value.
        context.props.children = context.props.children(context.Consumer.value);
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
