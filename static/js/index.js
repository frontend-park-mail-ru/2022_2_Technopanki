const applicant = document.getElementById('applicant_toggle');
const employer = document.getElementById('employer_toggle');

const removeActive = (element) => {
    element.classList.remove('toggle__active');
    const icon = element.getElementsByClassName('toggle__element-icon');
    icon[0].classList.remove('toggle__element-icon_active');
    icon[0].classList.add('toggle__element-icon_disabled');
};

const addActive = (element) => {
    element.classList.add('toggle__active');
    const icon = element.getElementsByClassName('toggle__element-icon');
    icon[0].classList.add('toggle__element-icon_active');
    icon[0].classList.remove('toggle__element-icon_disabled');
};

applicant.addEventListener('click', () => {
    removeActive(employer);
    addActive(applicant);
});

employer.addEventListener('click', () => {
    removeActive(applicant);
    addActive(employer);
});

const form = document.getElementById('signup_form');
const sendFormToServer = async (e) => {
    e.preventDefault();
    const data = new FormData(e.target);
    const values = Object.fromEntries(data.entries());

    let resBody = {
        email: values.email,
        password: values.password,
        name: values.name,
        surname: values.surname
    };

    const response = await fetch('/employers', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(resBody),
    });

    response.json().then(data => {
        const dataElem = document.getElementById('data');
        dataElem.innerText = JSON.stringify(data);
    });
}

form.addEventListener('submit', sendFormToServer);