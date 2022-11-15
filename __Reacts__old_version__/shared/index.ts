export const PROVIDER_TYPE = 'provider';
export const CONSUMER_TYPE = 'consumer';
export const CONTEXT_TYPE = 'context';

export const getUniqueSymbol = () => Symbol('key');

export const DOM_NODE_SYMBOL = Symbol.for('dom');
export const COMPONENT_NODE_SYMBOL = Symbol.for('component');
export const CONTEXT_NODE_SYMBOL = Symbol.for(CONTEXT_TYPE);
export const PROVIDER_NODE_SYMBOL = Symbol.for(PROVIDER_TYPE);
