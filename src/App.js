import Root from './lib/core/Root.js';

const root = document.querySelector('#root');
const rootComponent = new Root(root);

rootComponent.render();

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

testServer();
testApi();
