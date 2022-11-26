import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './signup.module.scss';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import RadioButton from '../../components/UI-kit/radioButton/radioButton';
import Description from '../../components/auth/Description';
import navigator from '../../router/navigator';
import { dispatch } from '../../store';
import { userActions } from '../../store/user/actions';
import { authService } from '../../services/authService';
import { SIGN_IN_PATH, START_PATH } from '../../utils/routerConstants';
import Form from '../../components/UI-kit/forms/Form';
import FormInput from '../../components/UI-kit/forms/formInputs/FormInput';
import FormItem from '../../components/UI-kit/forms/FormItem';
import { useValidation } from '../../utils/validation/formValidation';
import {
    applicantNameLengthValidator,
    applicantNameSymbolsValidator,
    applicantSurnameLengthValidator,
    applicantSurnameSymbolsValidator,
    emailValidator,
    employerNameLengthValidator,
    employerNameSymbolsValidator,
    passwordLengthValidator,
    passwordSymbolsValidator,
} from '../../utils/validation/commonValidators';

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

export default class SignUp extends ReactsComponent<
    {},
    {
        inputs: {
            [key: string]: AuthField;
        };
    }
> {
    state = {
        toggleType: 'applicant',
    };

    validation = useValidation({
        email: [emailValidator],
        password: [passwordSymbolsValidator, passwordLengthValidator],
        repeatPassword: [passwordSymbolsValidator, passwordLengthValidator],
        name: [applicantNameLengthValidator, applicantNameSymbolsValidator],
        surname: [
            applicantSurnameLengthValidator,
            applicantSurnameSymbolsValidator,
        ],
        companyName: [
            employerNameLengthValidator,
            employerNameSymbolsValidator,
        ],
    });

    onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.validation.ok()) {
            return;
        }

        const formData = new FormData(e.target);

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
                // setInvalidFieldsFromServer(
                //     body as ResponseBody,
                //     newState.inputs,
                //     () => this.setState(() => newState),
                // );
            });
    };

    render() {
        return (
            <div className={'grid h-100vh columns'}>
                <div
                    className={`col-md-6 col-12 h-100vh p-24 flex align-items-center justify-content-center screen-responsive ${styles.form_block}`}
                >
                    <Form onSubmit={this.onSubmit}>
                        <FormItem header={'Зарегистрироваться'}>
                            <FormInput
                                id={'email'}
                                label={'Email'}
                                type={'email'}
                                placeholder={'example@mail.ru'}
                                name={'email'}
                                setError={this.validation.setError}
                                size={'12'}
                                validationMode={'oninput'}
                                validation={this.validation.getValidation(
                                    'email',
                                )}
                            />
                            <FormInput
                                id={'password'}
                                label={'Пароль'}
                                type={'password'}
                                placeholder={'********'}
                                name={'password'}
                                setError={this.validation.setError}
                                size={'12'}
                                validationMode={'oninput'}
                                validation={this.validation.getValidation(
                                    'password',
                                )}
                            />
                            <FormInput
                                id={'repeatPassword'}
                                label={'Повторите пароль'}
                                type={'password'}
                                placeholder={'********'}
                                name={'repeatPassword'}
                                setError={this.validation.setError}
                                size={'12'}
                                validationMode={'oninput'}
                                validation={this.validation.getValidation(
                                    'repeatPassword',
                                )}
                            />
                            {this.state.toggleType === 'applicant' ? (
                                <div className={'col-12 column g-24'}>
                                    <FormInput
                                        id={'applicantName'}
                                        label={'Имя'}
                                        type={'text'}
                                        placeholder={'Иван'}
                                        name={'applicant_name'}
                                        setError={this.validation.setError}
                                        size={'12'}
                                        validationMode={'oninput'}
                                        validation={this.validation.getValidation(
                                            'name',
                                        )}
                                    />
                                    <FormInput
                                        id={'surname'}
                                        label={'Фамилия'}
                                        type={'text'}
                                        placeholder={'Иванов'}
                                        name={'applicant_surname'}
                                        setError={this.validation.setError}
                                        size={'12'}
                                        validationMode={'oninput'}
                                        validation={this.validation.getValidation(
                                            'surname',
                                        )}
                                    />
                                </div>
                            ) : (
                                <FormInput
                                    id={'companyName'}
                                    label={'Название компании'}
                                    type={'text'}
                                    name={'companyName'}
                                    setError={this.validation.setError}
                                    size={'12'}
                                    validationMode={'oninput'}
                                    validation={this.validation.getValidation(
                                        'companyName',
                                    )}
                                />
                            )}
                        </FormItem>
                        <div className={'flex column g-8'}>
                            <RadioButton
                                checked={this.state.toggleType === 'applicant'}
                                id={'applicant'}
                                name={'toggle'}
                                value={'applicant'}
                                onClick={() =>
                                    this.setState(state => ({
                                        ...state,
                                        toggleType: 'applicant',
                                    }))
                                }
                            >
                                Я соискатель
                            </RadioButton>
                            <RadioButton
                                checked={this.state.toggleType === 'employer'}
                                id={'employer'}
                                name={'toggle'}
                                value={'employer'}
                                onClick={() =>
                                    this.setState(state => ({
                                        ...state,
                                        toggleType: 'employer',
                                    }))
                                }
                            >
                                Я работодатель
                            </RadioButton>
                        </div>
                        <ButtonPrimaryBigBlue type={'submit'}>
                            Создать аккаунт
                        </ButtonPrimaryBigBlue>
                        <Link
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
                    </Form>
                </div>
                <Description />
            </div>
        );
    }
}
