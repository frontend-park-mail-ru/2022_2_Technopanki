// TODO: Maybe add default props
import { createElement } from './createElement';

const jsx = (type, config, maybeKey) => {
    console.log('config: ', config);
    return createElement(type, config, maybeKey);
};

// TODO
const jsxs = (type, config, maybeKey) => {
    return createElement(type, config, maybeKey);
};

export { jsx, jsxs };
