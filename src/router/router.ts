import { Options, Path, RouterType } from './types';

class Router implements RouterType {
    /**
     * Enable scroll restoration behavior
     */
    enableScrollRestoration() {
        history.scrollRestoration = 'auto';
    }

    /**
     * Disable scroll restoration behavior
     */
    disableScrollRestoration() {
        history.scrollRestoration = 'manual';
    }

    /**
     * Navigate to the given path
     * @param to
     */
    navigate(to: Path) {
        console.log(to);
        if (!to.options || !to.options.pop) {
            window.history.pushState(to.options, '', to.path);
        }

        to.callback();
    }

    /**
     * Makes fetch request and renders page then answer from request comes
     * @param key
     * @param path
     * @param url
     * @param formData
     */
    fetch(key: string, path: string, url: string, formData: FormData) {}
}

export default new Router();
