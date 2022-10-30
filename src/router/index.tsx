class Router {
    /**
     * Current scroll position we should start at for a new view
     */
    restoreScrollPosition: number | false | null;

    constructor() {
        window.addEventListener('popstate', () => {
            this.navigate(location.pathname, true);
        });
        this.restoreScrollPosition = null;
    }

    /**
     * Enable scroll restoration behavior to this path
     */
    enableScrollRestoration() {}

    /**
     * Navigate to the given path
     * @param path
     * @param pop
     */
    navigate(path: string, pop?: boolean) {}

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
