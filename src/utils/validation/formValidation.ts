export type ValidationFunc = (value: any) => [boolean, string];

export type ValidationConfig = {
    // Validators
    [key: string]: ValidationFunc[];
};

export type ValidationReturnFunc = (field: string) => ValidationFunc[];

/**
 * Hook that allows you to use validation
 * @param config
 * @return {{getValidation, setError, ok}}
 */
export const useValidation = (
    config: ValidationConfig,
): {
    getValidation: ValidationReturnFunc;
    setError: (isValid: boolean, name: string) => void;
    ok: () => boolean;
} => {
    const validators = config;
    let errorStore = {};
    Object.keys(config).map(key => {
        errorStore = { ...errorStore, [key]: false };
    });
    return {
        getValidation: (field: string) => validators[field],
        setError: (isValid: boolean, name: string) =>
            ((<{ [key: string]: boolean }>errorStore)[name] = isValid),
        ok: (): boolean => {
            return Object.values(errorStore).indexOf(true) === -1;
        },
    };
};
