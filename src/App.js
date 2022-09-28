import Root from './lib/core/Root.js';

const root = document.querySelector('#root');
const rootComponent = new Root(root);

rootComponent.render();
