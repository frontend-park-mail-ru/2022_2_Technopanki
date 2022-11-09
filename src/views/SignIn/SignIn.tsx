import { Component } from '../../../Reacts';
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
import { AuthField, setFieldAsInvalid, validateField } from '../SignUp/SignUp';
import navigator from '../../router/navigator';
import { dispatch } from '../../store';
import { userActions } from '../../store/user/actions';
import { authService } from '../../services/authService';

export default class SignIn extends Component<
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

        this.setState(() => newState);

        if (validFlag) {
            authService
                .signIn(formData)
                .then(body => {
                    authService.CSRF().then(CSRFbody => {
                        localStorage.setItem('CSRF', CSRFbody.value);
                        dispatch(
                            userActions.SIGN_IN(
                                body.id,
                                body.user_type === 'employer'
                                    ? body.company_name
                                    : body.applicant_name,
                                body.applicant_surname,
                                body.user_type,
                            ),
                        );
                        navigator.goBack();
                    });
                })
                .catch(body => {
                    setFieldAsInvalid(
                        newState.inputs[body.descriptors[0]],
                        body.error,
                    );
                    this.setState(() => newState);
                    setFieldAsInvalid(newState.inputs[body.descriptors[0]], '');
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
                        key={'form'}
                        className={`flex w-100 column g-24`}
                    >
                        <h5 key={'header'}>Войти</h5>
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
                        <ButtonPrimaryBigBlue key={'button'}>
                            Войти
                        </ButtonPrimaryBigBlue>
                        <Link
                            to={'/signup'}
                            content={
                                <p className={styles.form_link}>
                                    Впервые на нашем сайте? Зарегестрироваться
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
