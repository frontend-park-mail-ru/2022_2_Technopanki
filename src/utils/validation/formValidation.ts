export type ValidationFunc = (value: any) => [boolean, string];

export type ValidationConfig = {
    // Validators
    [key: string]: ValidationFunc[];
};

export const useValidation = (config: ValidationConfig) => {
    const validators = config;
    return (field: string) => validators[field];
};
