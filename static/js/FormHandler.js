export const setFormHandler = () => {
    const sendFormToServer = async e => {
        e.preventDefault();
        const data = new FormData(e.target);
        const values = Object.fromEntries(data.entries());

        let resBody = {
            email: values.email,
            password: values.password,
            name: values.name,
            surname: values.surname,
        };

        const response = await fetch('/employers', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(resBody),
        });

        response.json().then(data => {
            const dataElem = document.querySelector('#data');
            dataElem.innerText = JSON.stringify(data);
        });
    };

    const form = document.querySelector('#signup_form');
    form.addEventListener('submit', sendFormToServer);
};
