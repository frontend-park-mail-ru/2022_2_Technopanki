import { Component } from '../../../Reacts';
import Input from '../../components/UI-kit/forms/inputs/Input';
import styles from './signin.module.scss';
import Logo from '../../static/assets/JobflowDefault.svg';
import Illustration from '../../static/assets/illustration.svg';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import RadioButton from '../../components/UI-kit/radioButton/radioButton';

export default class SignIn extends Component {
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
                            to={'/signup'}
                            content={
                                <p className={styles.form_link}>
                                    Уже есть аккаунт? Войти
                                </p>
                            }
                        />
                    </form>
                </div>
                <div
                    className={`col-md-6 col-0 ${styles.description} relative`}
                >
                    <div
                        className={`flex column g-24 ${styles.description_text}`}
                    >
                        <div
                            className={'inner-svg-h-16'}
                            dangerouslySetInnerHTML={{ __html: Logo }}
                        ></div>
                        <h3 className={styles.description_header}>
                            Создай свою команду. Найди свою миссию
                        </h3>
                        <p className={styles.description_p}>
                            Мы создаем передовые технологии на всех доступных
                            платформах для того, чтобы работодатели могли быстро
                            найти подходящего сотрудника, а соискатели — хорошую
                            работу.
                        </p>
                    </div>
                    <div
                        className={`absolute l-24 r-0 b-0 ${styles.description_illustration}`}
                        dangerouslySetInnerHTML={{ __html: Illustration }}
                    ></div>
                </div>
            </div>
        );
    }
}
