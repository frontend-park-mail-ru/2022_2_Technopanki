/**
 *
 * @param {string} password
 * @returns {boolean}
 */
export const validatePasswordSymbols = password => {
    const regexp = /^(?=.*[0-9])(?=.*[!#%^*$])(?=.*[a-zA-Z]).*/;
    return regexp.test(password);
};

/**
 * Check if 8 < password.length < 20
 * @param {string} password
 * @returns {boolean}
 */
export const validatePasswordLength = password => {
    return 8 < password.length && password.length < 20;
};

/**
 *
 * @param {string} email
 * @returns {boolean}
 */
export const validateEmail = email => {
    const regexp =
        /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return regexp.test(email);
};

/**
 *
 * @param {string} name
 * @returns {boolean}
 */
export const validateName = name => {
    const regexp = /[a-zA-Zа-яА-Я]{3,20}/;
    return regexp.test(name);
};
