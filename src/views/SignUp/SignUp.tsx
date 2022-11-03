import { Component } from '../../../Reacts';
import Input from '../../components/UI-kit/forms/inputs/Input';
import styles from './signup.module.scss';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import RadioButton from '../../components/UI-kit/radioButton/radioButton';
import Description from '../../components/auth/Description';
import {
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
    validateEmail,
    validateNameLength,
    validateNameSymbols,
    validatePasswordLength,
    validatePasswordSymbols,
} from '../../utils/validation/validation';
import navigator from '../../router/navigator';
import { dispatch } from '../../store';
import { userActions } from '../../store/user/actions';
import { authService } from '../../services/authService';

export const validateField = (
    formDataElement: Exclude<FormDataEntryValue, File>,
    field: AuthField,
    validate: (data: string) => boolean,
    errorMessage: string,
): boolean => {
    if (formDataElement) {
        field.value = formDataElement;

        if (validate(formDataElement)) {
            if (errorMessage === field.errorMessage) {
                field.error = false;
                field.errorMessage = '';
            }
            return true;
        }
        field.error = true;
        field.errorMessage = errorMessage;
        return false;
    }

    return true;
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

        if (validFlag) {
            authService
                .signUp(formData)
                .then(response => {
                    dispatch(
                        userActions.SIGN_UP(
                            // TODO: id
                            response.body.id,
                            formData.get('applicant_name') ||
                                formData.get('company_name') ||
                                '',
                            formData.get('applicant_surname'),
                            formData.get('toggle'),
                        ),
                    );
                    navigator.navigate('/');
                })
                .catch(err => console.log(err));
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
                                                id: 'companyName',
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
                            to={'/signin'}
                            content={
                                <p className={styles.form_link}>
                                    Уже есть аккаунт? Войти
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
