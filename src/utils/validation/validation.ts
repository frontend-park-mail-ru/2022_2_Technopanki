/**
 *
 * @param {string} password
 * @returns {boolean}
 */
export const validatePasswordSymbols = (password: string): boolean => {
    const regexp = /^(?=.*[0-9])(?=.*[!#%^*$])(?=.*[a-zA-Z]).*/;
    return regexp.test(password);
};

/**
 * Check if 8 <= password.length <= 20
 * @param {string} password
 * @returns {boolean}
 */
export const validatePasswordLength = (password: string): boolean => {
    return 8 <= password.length && password.length <= 20;
};

/**
 *
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = (email: string): boolean => {
    const regexp =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regexp.test(email);
};

/**
 * @param {string} name
 * @returns {boolean}
 */
export const validateNameLength = (name: string): boolean => {
    return 3 <= name.length && name.length <= 30;
};

/**
 * @param {string} name
 * @returns {boolean}
 */
export const validateNameSymbols = (name: string): boolean => {
    const regexp = /^[a-zA-Zа-яА-Я]*$/;
    return regexp.test(name);
};

export const validateCompanyName = (name: string): boolean => {
    const regexp = /^[a-zA-Z а-яА-Я]*$/;
    return regexp.test(name) && name.length > 0;
};

export const phoneValidation = (phone: string): boolean => {
    const regexp = /^\+[0-9]{1,4} \([0-9]{1,4}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/;
    return regexp.test(phone);
};

export const validateResumeTitle = (title: string): boolean => {
    return !!title;
};

export const validateResumeDescription = (description: string): boolean => {
    return !!description;
};
