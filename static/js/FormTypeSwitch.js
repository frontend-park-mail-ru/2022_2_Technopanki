const removeActive = element => {
    element.classList.remove('toggle__active');
    const icon = element.getElementsByClassName('toggle__element-icon');
    icon[0].classList.remove('toggle__element-icon_active');
    icon[0].classList.add('toggle__element-icon_disabled');
};

const addActive = element => {
    element.classList.add('toggle__active');
    const icon = element.getElementsByClassName('toggle__element-icon');
    icon[0].classList.add('toggle__element-icon_active');
    icon[0].classList.remove('toggle__element-icon_disabled');
};

export const addSwitcher = () => {
    const applicant = document.getElementById('applicant_toggle');
    const employer = document.getElementById('employer_toggle');

    const switchToApplicant = () => {
        const applicant = document.getElementById('applicant_toggle');
        const employer = document.getElementById('employer_toggle');

        removeActive(employer);
        addActive(applicant);
    };

    const switchToEmployer = () => {
        const applicant = document.getElementById('applicant_toggle');
        const employer = document.getElementById('employer_toggle');

        removeActive(applicant);
        addActive(employer);
    };

    applicant.addEventListener('click', switchToApplicant);
    employer.addEventListener('click', switchToEmployer);
};
