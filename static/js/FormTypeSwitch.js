const removeActive = element => {
    element.classList.remove('toggle__active');
    const icon = element.querySelector('.toggle__element-icon');
    icon[0].classList.remove('toggle__element-icon_active');
    icon[0].classList.add('toggle__element-icon_disabled');
};

const addActive = element => {
    element.classList.add('toggle__active');
    const icon = element.querySelector('.toggle__element-icon');
    icon[0].classList.add('toggle__element-icon_active');
    icon[0].classList.remove('toggle__element-icon_disabled');
};

export const addSwitcher = () => {
    const applicant = document.querySelector('#applicant_toggle');
    const employer = document.querySelector('#employer_toggle');

    const switchToApplicant = () => {
        removeActive(employer);
        addActive(applicant);
    };

    const switchToEmployer = () => {
        removeActive(applicant);
        addActive(employer);
    };

    applicant.addEventListener('click', switchToApplicant);
    employer.addEventListener('click', switchToEmployer);
};
