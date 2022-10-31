import { Component } from '../../../Reacts';
import Input from '../../components/UI-kit/forms/inputs/Input';
import styles from './signin.module.scss';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import Description from '../../components/auth/Description';

export default class SignIn extends Component {
    render() {
        return (
            <div className={'grid h-100vh columns'}>
                <div
                    className={`col-md-6 col-12 h-100vh p-24 flex align-items-center justify-content-center screen-responsive ${styles.form_block}`}
                >
                    <form key={'form'} className={`flex w-100 column g-24`}>
                        <h5 key={'header'}>Войти</h5>
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
