import { Component } from '../../../Reacts';
import Input from '../../components/UI-kit/forms/inputs/Input';
import styles from './signup.module.scss';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import RadioButton from '../../components/UI-kit/radioButton/radioButton';
import Description from '../../components/auth/Description';

export default class SignUp extends Component {
    render() {
        return (
            <div className={'grid h-100vh columns'}>
                <div
                    className={`col-md-6 col-12 h-100vh p-24 flex align-items-center justify-content-center screen-responsive ${styles.form_block}`}
                >
                    <form key={'form'} className={`flex w-100 column g-24`}>
                        <h5 key={'header'}>Зарегистрироваться</h5>
                        <div key={'inputs'} className={'flex column g-16'}>
                            <Input
                                type={'email'}
                                key={'email'}
                                placeholder={'example@mail.ru'}
                            >
                                Email
                            </Input>
                            <Input
                                type={'password'}
                                key={'password'}
                                placeholder={'**********'}
                            >
                                Пароль
                            </Input>
                            <Input
                                type={'password'}
                                key={'password'}
                                placeholder={'**********'}
                            >
                                Повторите пароль
                            </Input>
                            <Input
                                type={'text'}
                                key={'name'}
                                placeholder={'Иван'}
                            >
                                Имя
                            </Input>
                            <Input
                                type={'text'}
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
                            >
                                Я соискатель
                            </RadioButton>
                            <RadioButton
                                key={'toggle2'}
                                checked={false}
                                id={'employer'}
                                name={'toggle'}
                                value={'employer'}
                            >
                                Я работодатель
                            </RadioButton>
                        </div>
                        <ButtonPrimaryBigBlue key={'button'}>
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
