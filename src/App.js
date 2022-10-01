import { Router } from './lib/router/Router.js';

window.addEventListener('popstate', e => {
    Router(location.pathname);
});

Router(location.pathname);
