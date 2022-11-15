import { Component } from '../../../__Reacts__old_version__';
import Input from '../../components/UI-kit/forms/inputs/Input';
import styles from './signup.module.scss';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import RadioButton from '../../components/UI-kit/radioButton/radioButton';
import Description from '../../components/auth/Description';
import {
    COMPANY_NAME_ERROR,
    EMAIL_ERROR,
    NAME_LENGTH_ERROR,
    NAME_SYMBOLS_ERROR,
    PASSWORD_LENGTH_ERROR,
    PASSWORD_REPEAT_ERROR,
    PASSWORD_SYMBOLS_ERROR,
    SURNAME_LENGTH_ERROR,
    SURNAME_SYMBOLS_ERROR,
} from '../../utils/validation/messages';
import {
    validateCompanyName,
    validateEmail,
    validateNameLength,
    validateNameSymbols,
    validatePasswordLength,
    validatePasswordSymbols,
} from '../../utils/validation/validation';
import navigator from '../../router/navigator.tsx';
import { dispatch } from '../../store';
import { userActions } from '../../store/user/actions';
import { authService } from '../../services/authService';
import { SIGN_IN_PATH, START_PATH } from '../../utils/routerConstants';

export type ResponseBody = {
    descriptors: string[];
    error: string;
};

export type AuthField = {
    id: string;
    type: string;
    label: string;
    placeholder: string;
    value: string | null;
    required: boolean;
    error: boolean;
    errorMessage: string | null;
};

export type AuthFields = { [key: string]: AuthField };

export const setFieldAsInvalid = (field: AuthField, errorMessage: string) => {
    if (field) {
        field.error = true;
        field.errorMessage = errorMessage;
    }
};

export const setInvalidFieldsFromServer = (
    responseBody: ResponseBody,
    inputs: AuthFields,
    callback: Function,
) => {
    if (
        responseBody &&
        Array.isArray(responseBody.descriptors) &&
        responseBody.descriptors[0]
    ) {
        setFieldAsInvalid(
            inputs[responseBody.descriptors[0]],
            responseBody.error,
        );
        callback();
        setFieldAsInvalid(inputs[responseBody.descriptors[0]] as AuthField, '');
    } else {
        throw new Error(`empty body: ${responseBody}`);
    }
};

export const validateField = (
    formDataElement: Exclude<FormDataEntryValue, File>,
    field: AuthField,
    validate: (data: string) => boolean,
    errorMessage: string,
): boolean => {
    if (formDataElement) {
        field.value = formDataElement;

        if (validate(formDataElement)) {
            if (
                errorMessage === field.errorMessage ||
                field.errorMessage === ''
            ) {
                field.error = false;
                field.errorMessage = '';
                return true;
            }
            return false;
        }
        setFieldAsInvalid(field, errorMessage);
        return false;
    }

    return false;
};

export default class SignUp extends Component<
    {},
    {
        inputs: {
            [key: string]: AuthField;
        };
    }
> {
    // input applicant_name is inputs[applicant_name]
    state = {
        inputs: {
            email: {
                id: 'email',
                type: 'email',
                label: 'Email',
                placeholder: 'example@mail.ru',
                value: null,
                required: true,
                error: false,
                errorMessage: '',
            },
            password: {
                id: 'password',
                type: 'password',
                label: 'Пароль',
                placeholder: '*********',
                value: null,
                required: true,
                error: false,
                errorMessage: '',
            },
            repeatPassword: {
                id: 'repeatPassword',
                type: 'password',
                label: 'Повторите пароль',
                placeholder: '*********',
                value: null,
                required: true,
                error: false,
                errorMessage: '',
            },
            applicant_name: {
                id: 'applicant_name',
                type: 'text',
                label: 'Имя',
                placeholder: 'Иван',
                value: null,
                required: true,
                error: false,
                errorMessage: '',
            },
            applicant_surname: {
                id: 'applicant_surname',
                type: 'text',
                label: 'Фамилия',
                placeholder: 'Иванов',
                value: null,
                required: true,
                error: false,
                errorMessage: '',
            },
        },
        toggleType: 'applicant',
    };

    onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let validFlag = true;
        let newState = this.state;

        if (
            !validateField(
                formData.get('email') as Exclude<FormDataEntryValue, File>,
                newState.inputs['email'],
                validateEmail,
                EMAIL_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            !validateField(
                formData.get('password') as Exclude<FormDataEntryValue, File>,
                newState.inputs['password'],
                validatePasswordSymbols,
                PASSWORD_SYMBOLS_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            !validateField(
                formData.get('password') as Exclude<FormDataEntryValue, File>,
                newState.inputs['password'],
                validatePasswordLength,
                PASSWORD_LENGTH_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            !validateField(
                formData.get('repeatPassword') as Exclude<
                    FormDataEntryValue,
                    File
                >,
                newState.inputs['repeatPassword'],
                (
                    repeatPassword: string,
                    password: string = formData.get('password') as Exclude<
                        FormDataEntryValue,
                        File
                    >,
                ) => password === repeatPassword,
                PASSWORD_REPEAT_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            this.state.toggleType === 'applicant' &&
            !validateField(
                formData.get('applicant_name') as Exclude<
                    FormDataEntryValue,
                    File
                >,
                newState.inputs['applicant_name'],
                validateNameLength,
                NAME_LENGTH_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            this.state.toggleType === 'applicant' &&
            !validateField(
                formData.get('applicant_name') as Exclude<
                    FormDataEntryValue,
                    File
                >,
                newState.inputs['applicant_name'],
                validateNameSymbols,
                NAME_SYMBOLS_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            this.state.toggleType === 'employer' &&
            !validateField(
                formData.get('company_name') as Exclude<
                    FormDataEntryValue,
                    File
                >,
                newState.inputs['company_name'],
                validateCompanyName,
                COMPANY_NAME_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            this.state.toggleType === 'applicant' &&
            !validateField(
                formData.get('applicant_surname') as Exclude<
                    FormDataEntryValue,
                    File
                >,
                newState.inputs['applicant_surname'],
                validateNameLength,
                SURNAME_LENGTH_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            this.state.toggleType === 'applicant' &&
            !validateField(
                formData.get('applicant_surname') as Exclude<
                    FormDataEntryValue,
                    File
                >,
                newState.inputs['applicant_surname'],
                validateNameSymbols,
                SURNAME_SYMBOLS_ERROR,
            )
        ) {
            validFlag = false;
        }

        this.setState(() => newState);

        // TODO: здесь новоеизображение надо не забыть засетить
        if (validFlag) {
            authService
                .signUp(formData)
                .then(body => {
                    dispatch(
                        userActions.SIGN_UP(
                            body.id,
                            (formData.get('toggle') as string) === 'applicant'
                                ? (formData.get('applicant_name') as string)
                                : (formData.get('company_name') as string),
                            formData.get('applicant_surname') as string,
                            body.image,
                            formData.get('toggle') as 'applicant' | 'employer',
                        ),
                    );
                    navigator.navigate(`/${formData.get('toggle')}/${body.id}`);
                })
                .catch(body => {
                    setInvalidFieldsFromServer(
                        body as ResponseBody,
                        newState.inputs,
                        () => this.setState(() => newState),
                    );
                });
        }
    };

    render() {
        return (
            <div className={'grid h-100vh columns'}>
                <div
                    key={'form'}
                    className={`col-md-6 col-12 h-100vh p-24 flex align-items-center justify-content-center screen-responsive ${styles.form_block}`}
                >
                    <form
                        onSubmit={this.onSubmit}
                        key={'form'}
                        className={`flex w-100 column g-24`}
                    >
                        <h5 key={'header'}>Зарегистрироваться</h5>
                        <div key={'inputs'} className={'flex column g-16'}>
                            {Object.entries(this.state.inputs).map(
                                ([name, value]) => (
                                    <Input
                                        key={value.id}
                                        id={value.id}
                                        type={value.type}
                                        placeholder={value.placeholder}
                                        label={value.label}
                                        name={name}
                                        required={value.required}
                                        value={value.value}
                                        error={value.error}
                                        errorMessage={value.errorMessage}
                                    />
                                ),
                            )}
                        </div>
                        <div key={'toggle'} className={'flex column g-12'}>
                            <RadioButton
                                key={'toggle1'}
                                checked={this.state.toggleType === 'applicant'}
                                id={'applicant'}
                                name={'toggle'}
                                value={'applicant'}
                                required={true}
                                onClick={() => {
                                    this.setState(state => ({
                                        inputs: {
                                            email: state.inputs.email,
                                            password: state.inputs.password,
                                            repeatPassword:
                                                state.inputs.repeatPassword,
                                            applicant_name: {
                                                id: 'applicant_name',
                                                type: 'text',
                                                label: 'Имя',
                                                placeholder: 'Иван',
                                                value: null,
                                                required: true,
                                                error: false,
                                                errorMessage: '',
                                            },
                                            applicant_surname: {
                                                id: 'applicant_surname',
                                                type: 'text',
                                                label: 'Фамилия',
                                                placeholder: 'Иванов',
                                                value: null,
                                                required: true,
                                                error: false,
                                                errorMessage: '',
                                            },
                                        },
                                        toggleType: 'applicant',
                                    }));
                                }}
                            >
                                Я соискатель
                            </RadioButton>
                            <RadioButton
                                key={'toggle2'}
                                checked={this.state.toggleType === 'employer'}
                                id={'employer'}
                                name={'toggle'}
                                value={'employer'}
                                required={true}
                                onClick={() => {
                                    this.setState(state => ({
                                        inputs: {
                                            email: state.inputs.email,
                                            password: state.inputs.password,
                                            repeatPassword:
                                                state.inputs.repeatPassword,
                                            company_name: {
                                                id: 'company_name',
                                                type: 'text',
                                                label: 'Название компании',
                                                placeholder: 'Company',
                                                value: null,
                                                required: true,
                                                error: false,
                                                errorMessage: '',
                                            },
                                        },
                                        toggleType: 'employer',
                                    }));
                                }}
                            >
                                Я работодатель
                            </RadioButton>
                        </div>
                        <ButtonPrimaryBigBlue key={'button'} type={'submit'}>
                            Создать аккаунт
                        </ButtonPrimaryBigBlue>
                        <Link
                            key={'signin'}
                            to={SIGN_IN_PATH}
                            content={
                                <p className={styles.form_link}>
                                    Уже есть аккаунт? Войти
                                </p>
                            }
                        />
                        <Link
                            to={START_PATH}
                            content={
                                <p
                                    className={
                                        'font-size-12 color-300 text-align-center'
                                    }
                                >
                                    Перейти на главную страницу
                                </p>
                            }
                        />
                    </form>
                </div>
                <Description key={'desc'} />
            </div>
        );
    }
}
