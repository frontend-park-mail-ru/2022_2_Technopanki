import { Component, createRoot } from '../../Reacts';
import Router from './router';
import { Path } from './types';
import { RootType } from '../../Reacts/reacts-dom/root';
import { VNodeType } from '../../Reacts/shared/common';

export type PathType = {
    path: string;
    validator: (url: string) => boolean;
};

class Navigator {
    private navMap = new Map<string, Path>();
    private urls: PathType[] = [];
    private fallback?: Path;
    private router = Router;
    private root: RootType;

    constructor(root: HTMLElement, restoreScroll?: boolean) {
        this.root = createRoot(root);
        restoreScroll
            ? this.router.enableScrollRestoration()
            : this.router.disableScrollRestoration();

        window.addEventListener('popstate', (e: PopStateEvent) => {
            this.navigate(location.pathname, true);
        });
    }

    disableScrollRestoration() {
        this.router.disableScrollRestoration();
    }

    setFallback(fallbackPath: string, FallbackComponent: Function) {
        this.fallback = { path: '/fallback', callback: () => {} };
        this.fallback.path = fallbackPath;
        this.fallback.callback = () => this.root.render(<FallbackComponent />);
    }

    addNewPath(path: PathType, Component: Function) {
        this.urls.push(path);
        this.navMap.set(path.path, {
            path: path.path,
            callback: () => {
                this.root.render(<Component />);
            },
        });
    }

    addNewPaths(paths: { path: PathType; component: Function }[]) {
        paths.forEach(({ path, component }) =>
            this.addNewPath(path, component),
        );
    }

    navigate(to: string, pop: boolean = false) {
        const url = this.urls.find(url => url.validator(to));

        if (url) {
            this.router.navigate(
                // @ts-ignore we checked for
                { ...this.navMap.get(url.path), options: { pop: pop } },
                to.slice(url.path.length, to.length),
            );
        } else {
            // @ts-ignore we checked for
            this.router.navigate(this.fallback);
        }
    }

    goBack() {
        history.history.back();
    }
}

export default new Navigator(
    document.querySelector('#root') || document.body,
    true,
);
