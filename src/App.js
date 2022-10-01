import { Router } from './lib/router/Router.js';

Router(location.pathname);

const testServer = async () => {
    const response = await fetch('http://localhost:8080/auth/sign-up', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            Email: 'vladislav@gmail.com',
            Name: 'Vladislav',
            Surname: 'Kirpichov',
            Password: '12345',
        }),
        credentials: 'include',
    });

    response.headers.forEach(elem => console.log(elem));
    response.json().then(data => console.log(data));
};

const testApi = async () => {
    const response = await fetch('http://localhost:8080/api/vacancy', {
        method: 'GET',
    });

    // response.headers.forEach()
};

// testServer();
// testApi();
