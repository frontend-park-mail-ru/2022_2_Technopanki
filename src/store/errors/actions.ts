export const activateError = (header: string, text: string = '') => ({
    type: 'ERRORS_ACTIVATE',
    header,
    text,
});

export const deactivateError = () => ({
    type: 'ERRORS_DEACTIVATE',
});
