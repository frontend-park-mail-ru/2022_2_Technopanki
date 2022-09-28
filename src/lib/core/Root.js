import { setUpRouter } from '../router/Router.js';

export default class Root {
    #root;

    constructor(root) {
        this.#root = root;
        window.addEventListener('popstate', e => {
            setUpRouter(location.pathname);
        });
    }

    render() {
        setUpRouter(location.pathname);
    }
}
