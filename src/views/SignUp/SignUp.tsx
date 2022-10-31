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

export default class SignUp extends Component {
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

        if (formData.get('password') !== formData.get('repeat_password')) {
            setInvalidInput(e, 'repeat_password', PASSWORD_REPEAT_ERROR);
            validFlag = false;
        } else {
            setValidInput(e, 'repeat_password');
        }

        if (!validateNameLength(formData.get('name'))) {
            setInvalidInput(e, 'name', NAME_LENGTH_ERROR);
            validFlag = false;
        } else if (!validateNameSymbols(formData.get('name'))) {
            setValidInput(e, 'name');
            setInvalidInput(e, 'name', NAME_SYMBOLS_ERROR);
            validFlag = false;
        } else {
            setValidInput(e, 'name');
        }

        if (!validateNameLength(formData.get('surname'))) {
            setInvalidInput(e, 'surname', SURNAME_LENGTH_ERROR);
            validFlag = false;
        } else if (!validateNameSymbols(formData.get('surname'))) {
            setValidInput(e, 'surname');
            setInvalidInput(e, 'surname', SURNAME_SYMBOLS_ERROR);
            validFlag = false;
        } else {
            setValidInput(e, 'surname');
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
                        <h5 key={'header'}>Зарегистрироваться</h5>
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
                            to={'/signin'}
                            content={
                                <p className={styles.form_link}>
                                    Уже есть аккаунт? Войти
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
