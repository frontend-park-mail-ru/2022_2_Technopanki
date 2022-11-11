export const activateSuccess = (header: string, text: string) => ({
    type: 'SUCCESS_ACTIVATE',
    header,
    text,
});

export const deactivateSuccess = () => ({
    type: 'SUCCESS_DEACTIVATE',
});
