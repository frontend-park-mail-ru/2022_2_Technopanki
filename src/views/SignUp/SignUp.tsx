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
} from '../../services/validation/messages';
import {
    validateEmail,
    validateNameLength,
    validateNameSymbols,
    validatePasswordLength,
    validatePasswordSymbols,
} from '../../services/validation/validation';
import {
    setInvalidInput,
    setValidInput,
} from '../../services/validation/formValidation';
import { VNodeType } from '../../../Reacts/shared/common';

type SignUpField = {
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
    { children: VNodeType },
    {
        inputs: {
            [key: string]: SignUpField;
        };
    }
> {
    // input name is inputs[name]
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
            name: {
                id: 'name',
                type: 'text',
                label: 'Имя',
                placeholder: 'Иван',
                value: null,
                required: true,
                error: false,
                errorMessage: '',
            },
            surname: {
                id: 'surname',
                type: 'text',
                label: 'Фамилия',
                placeholder: 'Иванов',
                value: null,
                required: true,
                error: false,
                errorMessage: '',
            },
        },
    };

    validateField = (
        formDataElement: Exclude<FormDataEntryValue, File>,
        field: SignUpField,
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

    onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let validFlag = true;

        let newState = this.state;

        if (
            !this.validateField(
                formData.get('email') as Exclude<FormDataEntryValue, File>,
                newState.inputs['email'],
                validateEmail,
                EMAIL_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            !this.validateField(
                formData.get('password') as Exclude<FormDataEntryValue, File>,
                newState.inputs['password'],
                validatePasswordSymbols,
                PASSWORD_SYMBOLS_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            !this.validateField(
                formData.get('password') as Exclude<FormDataEntryValue, File>,
                newState.inputs['password'],
                validatePasswordLength,
                PASSWORD_LENGTH_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            !this.validateField(
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
            !this.validateField(
                formData.get('name') as Exclude<FormDataEntryValue, File>,
                newState.inputs['name'],
                validateNameLength,
                NAME_LENGTH_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            !this.validateField(
                formData.get('name') as Exclude<FormDataEntryValue, File>,
                newState.inputs['name'],
                validateNameSymbols,
                NAME_SYMBOLS_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            !this.validateField(
                formData.get('surname') as Exclude<FormDataEntryValue, File>,
                newState.inputs['surname'],
                validateNameLength,
                SURNAME_LENGTH_ERROR,
            )
        ) {
            validFlag = false;
        }
        if (
            !this.validateField(
                formData.get('surname') as Exclude<FormDataEntryValue, File>,
                newState.inputs['surname'],
                validateNameSymbols,
                SURNAME_SYMBOLS_ERROR,
            )
        ) {
            validFlag = false;
        }

        this.setState(() => newState);
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
                                checked={true}
                                id={'applicant'}
                                name={'toggle'}
                                value={'applicant'}
                                required={true}
                            >
                                Я соискатель
                            </RadioButton>
                            <RadioButton
                                key={'toggle2'}
                                checked={false}
                                id={'employer'}
                                name={'toggle'}
                                value={'employer'}
                                required={true}
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

/*
<Input
                                id={'password'}
                                type={'password'}
                                name={'password'}
                                key={'password'}
                                placeholder={'**********'}
                                required={true}
                            >
                                Пароль
                            </Input>
                            <Input
                                id={'repeat_password'}
                                type={'password'}
                                name={'repeat_password'}
                                key={'password'}
                                placeholder={'**********'}
                                required={true}
                            >
                                Повторите пароль
                            </Input>
                            <Input
                                id={'name'}
                                type={'text'}
                                name={'name'}
                                key={'name'}
                                placeholder={'Иван'}
                                required={true}
                            >
                                Имя
                            </Input>
                            <Input
                                id={'surname'}
                                type={'text'}
                                name={'surname'}
                                key={'surname'}
                                placeholder={'Иванов'}
                            >
                                Фамилия
                            </Input>
 */
