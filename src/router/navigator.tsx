import Router from './router';
import { Path } from './types';
import Root from '../../Reacts/reacts-dom/root';

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
    private prevUrl: string;

    constructor(root: HTMLElement, restoreScroll?: boolean) {
        this.root = new Root(root);
        restoreScroll
            ? this.router.enableScrollRestoration()
            : this.router.disableScrollRestoration();

        window.addEventListener('popstate', (e: PopStateEvent) => {
            this.navigate(location.pathname, true);
        });

        this.prevUrl = '';
    }

    disableScrollRestoration() {
        this.router.disableScrollRestoration();
    }

    setFallback(fallbackPath: string, FallbackComponent: Function) {
        this.fallback = {
            path: fallbackPath,
            callback: () => this.root.render(<FallbackComponent />),
        };
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
        if (to === this.prevUrl) {
            return;
        }

        const url = this.urls.find(url => url.validator(to));
        console.log('asd');

        try {
            if (url) {
                this.router.navigate(
                    // @ts-ignore we checked for
                    { ...this.navMap.get(url.path), options: { pop: pop } },
                    to.slice(url.path.length, to.length),
                );
            } else {
                console.log(this.navMap.get('/404'));
                // @ts-ignore we checked for
                this.router.navigate(
                    { ...this.navMap.get('/404'), options: { pop: pop } },
                    '',
                );
            }
        } catch {
            console.log(this.navMap.get('/404'));
            // @ts-ignore we checked for
            this.router.navigate(
                { ...this.navMap.get('/404'), options: { pop: pop } },
                '',
            );
        }

        this.prevUrl = to;
    }

    goBack() {
        history.back();
    }
}

export default new Navigator(
    document.querySelector('#root') || document.body,
    true,
);
