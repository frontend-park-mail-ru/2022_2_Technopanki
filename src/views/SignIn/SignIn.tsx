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
    setInvalidInput,
    setValidInput,
} from '../../utils/validation/formValidation';
import {
    EMAIL_ERROR,
    PASSWORD_LENGTH_ERROR,
    PASSWORD_SYMBOLS_ERROR,
} from '../../utils/validation/messages';

export default class SignIn extends Component {
    onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        let validFlag = true;

        if (validateEmail(formData.get('email'))) {
            setValidInput(e, 'email');
        } else {
            setInvalidInput(e, 'email', EMAIL_ERROR);
            validFlag = false;
        }

        if (!validatePasswordLength(formData.get('password'))) {
            setInvalidInput(e, 'password', PASSWORD_LENGTH_ERROR);
            validFlag = false;
        } else if (!validatePasswordSymbols(formData.get('password'))) {
            setValidInput(e, 'password');
            setInvalidInput(e, 'password', PASSWORD_SYMBOLS_ERROR);
            validFlag = false;
        } else {
            setValidInput(e, 'password');
        }

        if (!validFlag) {
            return;
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
                            <Input
                                id={'email'}
                                type={'email'}
                                name={'email'}
                                key={'email'}
                                placeholder={'example@mail.ru'}
                                required={true}
                            >
                                Email
                            </Input>
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
