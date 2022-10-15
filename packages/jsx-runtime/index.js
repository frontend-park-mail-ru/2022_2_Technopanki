// TODO: Maybe add default props
import { createElement } from '../reacts-dom/render/createElement';

const jsx = (type, config, maybeKey) => {
    return createElement(type, config, maybeKey);
};

// TODO
const jsxs = (type, config, maybeKey) => {
    return createElement(type, config, maybeKey);
};

export { jsx, jsxs };
