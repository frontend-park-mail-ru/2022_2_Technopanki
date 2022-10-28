export const PROVIDER_TYPE = 'provider';
export const CONSUMER_TYPE = 'consumer';
export const CONTEXT_TYPE = 'context';

export const getUniqueSymbol = () => Symbol('key');

// TODO: rename to _NODE_SYMBOL
export const DOM_ELEMENT_SYMBOL = Symbol.for('dom');
export const COMPONENT_ELEMENT_SYMBOL = Symbol.for('component');
export const TEMP_ELEMENT_SYMBOL = Symbol.for('temp');
export const CONTEXT_ELEMENT_SYMBOL = Symbol.for('context');
export const PROVIDER_ELEMENT_SYMBOL = Symbol.for('provider');
export const CONSUMER_ELEMENT_SYMBOL = Symbol.for('consumer');
