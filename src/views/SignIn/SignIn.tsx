import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './signin.module.scss';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import Description from '../../components/auth/Description';
import { dispatch } from '../../store';
import { userActions } from '../../store/user/actions';
import { authService, USER_TYPE } from '../../services/auth/authService';
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
import { AuthError, SignInResponse } from '../../services/auth/types';
import navigator from '../../router/navigator';
import { SERVER_URLS, USER_URLS } from '../../utils/networkConstants';

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
        try {
            const response = await authService.signIn(formData);

            if (response === 202) {
                navigator.navigate(USER_URLS.CONFIRM + '/signin');
                return;
            }

            dispatch(
                userActions.SIGN_IN(
                    (response as SignInResponse).id.toString(),
                    (response as SignInResponse).applicant_name ??
                        (response as SignInResponse).company_name,
                    (response as SignInResponse).applicant_surname,
                    (response as SignInResponse).email,
                    (response as SignInResponse).image,
                    (response as SignInResponse).two_factor_sign_in,
                    (response as SignInResponse).user_type,
                ),
            );

            navigator.navigate(
                ((response as SignInResponse).user_type === USER_TYPE.APPLICANT
                    ? APPLICANT_PATHS.PROFILE
                    : EMPLOYER_PATHS.PROFILE) +
                    (response as SignInResponse).id.toString(),
            );
        } catch (e: unknown) {
            dispatch(activateError((e as AuthError).error));
            setTimeout(() => dispatch(deactivateError()), 3000);
        }
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
                                required={true}
                                validationMode={'onblur'}
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
                                required={true}
                                validationMode={'onblur'}
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
