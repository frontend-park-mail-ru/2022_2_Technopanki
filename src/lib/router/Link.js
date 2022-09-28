import { setUpRouter } from './Router.js';

export const Link = (to, innerText, ...children) => {
    const RouteLink = e => {
        e.preventDefault();
        window.history.pushState(null, null, to);
        setUpRouter(to);
    };

    const button = document.createElement('button');
    button.href = to;
    if (innerText !== null) {
        button.innerText = innerText;
    } else {
        button.append(...children);
    }

    button.onclick = RouteLink;

    return button;
};
