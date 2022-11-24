export type ValidationFunc = (value: any) => [boolean, string];

export type ValidationConfig = {
    // Validators
    [key: string]: ValidationFunc[];
};

export type ValidationReturnFunc = (field: string) => ValidationFunc[];

export const useValidation = (
    config: ValidationConfig,
): [ValidationReturnFunc, { [key: string]: boolean }] => {
    const validators = config;
    let errorStore = {};
    Object.keys(config).map(key => {
        errorStore = { ...errorStore, [key]: false };
    });
    return [(field: string) => validators[field], errorStore];
};
