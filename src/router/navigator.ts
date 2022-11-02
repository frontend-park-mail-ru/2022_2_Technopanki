import { createRoot } from '../../Reacts';
import Router from './router';
import { Path } from './types';
import { RootType } from '../../Reacts/reacts-dom/root';
import { VNodeType } from '../../Reacts/shared/common';

class Navigator {
    private navMap: {url: string, options: Options}[] = [];
    private fallback?: Path;
    private router = Router;
    private root: RootType;

    constructor(root: HTMLElement, restoreScroll?: boolean) {
        this.root = createRoot(root);
        restoreScroll
            ? this.router.enableScrollRestoration()
            : this.router.disableScrollRestoration();

        window.addEventListener('popstate', (e: PopStateEvent) => {
            this.router.navigate({
                path: location.pathname,
                callback: () => this.navMap[location.pathname]?.callback(),
                options: {
                    pop: true,
                },
            });
        });
    }

    disableScrollRestoration() {
        this.router.disableScrollRestoration();
    }

    setFallback(fallbackPath: string, fallbackComponent: VNodeType) {
        this.fallback = { path: '/fallback', callback: () => {} };
        this.fallback.path = fallbackPath;
        this.fallback.callback = () => this.root.render(fallbackComponent);
    }

    addNewPath(path: string, component: VNodeType) {
        this.navMap.set(path, {
            path: path,
            callback: () => this.root.render(component),
        });
    }

    navigate(to: string, urlParams?: string) {
        if (this.navMap.has(to)) {
            // @ts-ignore we checked for
            this.router.navigate(this.navMap.get(to).);
            return;
        }

        if (this.fallback) {
            this.router.navigate(this.fallback);
        }
    }

    goBack() {
        history.back();
    }
}

export default new Navigator(
    document.querySelector('#root') || document.body,
    true,
);
