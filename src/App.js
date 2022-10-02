// import { Router } from './lib/router/Router.js';
import { renderDOM } from './lib/core/renderDOM.js';
import Main from './views/Main.js';

const root = document.querySelector('#root');
renderDOM(root, Main);

window.addEventListener('popstate', e => {
    // Router(location.pathname);
});

// Router(location.pathname);
