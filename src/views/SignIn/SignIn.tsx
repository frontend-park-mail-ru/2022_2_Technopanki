import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Input from '../../components/UI-kit/forms/inputs/Input';
import styles from './signin.module.scss';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import Description from '../../components/auth/Description';
import navigator from '../../router/navigator';
import { dispatch } from '../../store';
import { userActions } from '../../store/user/actions';
import { authService } from '../../services/authService';
import {
    APPLICANT_PATHS,
    EMPLOYER_PATHS,
    SIGN_UP_PATH,
    START_PATH,
} from '../../utils/routerConstants';
import { useValidation } from '../../utils/validation/formValidation';
import {
    emailValidator,
    passwordLengthValidator,
    passwordSymbolsValidator,
} from '../../utils/validation/commonValidators';
import FormInput from '../../components/UI-kit/forms/formInputs/FormInput';
import Form from '../../components/UI-kit/forms/Form';
import FormItem from '../../components/UI-kit/forms/FormItem';
import { activateError, deactivateError } from '../../store/errors/actions';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';

export default class SignIn extends ReactsComponent {
    validation = useValidation({
        email: [emailValidator],
        password: [passwordLengthValidator, passwordSymbolsValidator],
    });

    onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.validation.ok()) {
            return;
        }
        const formData = new FormData(e.target as HTMLFormElement);

        authService
            .signIn(formData)
            .then(body => {
                dispatch(
                    userActions.SIGN_IN(
                        body.id,
                        body.applicant_name,
                        body.applicant_surname,
                        body.email,
                        body.image,
                        body.user_type,
                    ),
                );
                navigator.navigate(
                    body.user_type === 'employer'
                        ? EMPLOYER_PATHS.PROFILE + body.id
                        : APPLICANT_PATHS.PROFILE + body.id,
                );
            })
            .catch(body => {
                dispatch(activateError(body.error, body.descriptors[0]));
                setTimeout(() => dispatch(deactivateError()), 3000);
            });
    };

    render() {
        return (
            <div className={'grid h-100vh columns'}>
                <ErrorPopup />
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
                        </FormItem>
                        <ButtonPrimaryBigBlue type={'submit'}>
                            Войти
                        </ButtonPrimaryBigBlue>
                        <Link
                            to={SIGN_UP_PATH}
                            content={
                                <p className={styles.form_link}>
                                    Впервые на нашем сайте? Зарегистрироваться
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
