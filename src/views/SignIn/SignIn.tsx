import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Input from '../../components/UI-kit/forms/inputs/Input';
import styles from './signin.module.scss';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import Description from '../../components/auth/Description';
import {
    validateEmail,
    validatePasswordLength,
    validatePasswordSymbols,
} from '../../utils/validation/validation';
import {
    EMAIL_ERROR,
    PASSWORD_LENGTH_ERROR,
    PASSWORD_SYMBOLS_ERROR,
} from '../../utils/validation/messages';
import {
    AuthField,
    ResponseBody,
    setInvalidFieldsFromServer,
    validateField,
} from '../SignUp/SignUp';
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

export default class SignIn extends ReactsComponent<
    {},
    {
        inputs: {
            [key: string]: AuthField;
        };
    }
> {
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
        },
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

        if (!validFlag) {
            this.setState(() => newState);
        } else {
            authService
                .signIn(formData)
                .then(body => {
                    dispatch(
                        userActions.SIGN_IN(
                            body.id,
                            body.user_type === 'employer'
                                ? body.company_name
                                : body.applicant_name,
                            body.applicant_surname,
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
                    setInvalidFieldsFromServer(
                        body as ResponseBody,
                        newState.inputs,
                        (() => this.setState(() => newState)).bind(this),
                    );
                });
        }
    };

    render() {
        return (
            <div className={'grid h-100vh columns'}>
                <div
                    className={`col-md-6 col-12 h-100vh p-24 flex align-items-center justify-content-center screen-responsive ${styles.form_block}`}
                >
                    <form
                        onSubmit={this.onSubmit}
                        className={`flex w-100 column g-24`}
                    >
                        <h5>Войти</h5>
                        <div className={'flex column g-16'}>
                            {Object.entries(this.state.inputs).map(
                                ([name, value]) => (
                                    <div>
                                        <p>{value}</p>
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
                                    </div>
                                ),
                            )}
                        </div>
                        <ButtonPrimaryBigBlue>Войти</ButtonPrimaryBigBlue>
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
                    </form>
                </div>
                <Description />
            </div>
        );
    }
}
