import { Component } from '../../../Reacts';
import ArrowButton from '../../components/UI-kit/buttons/ArrowButton';
import styles from './startPage.module.scss';
import Button from '../../components/UI-kit/buttons/Button';
import ArrowButtonOutline from '../../components/UI-kit/buttons/ArrowButtonOutline';
import Header from '../../components/UI-kit/header/Header';
import ArrowButtonWithText from '../../components/UI-kit/buttons/ArrowButtonWithText';

export default class StartPage extends Component {
    render() {
        return (
            <div className={'grid columns g-24 screen-responsive'}>
                <Header key={'header'} />
                <div
                    key={'content'}
                    className={'col-6 flex column g-32 content'}
                >
                    <div className={'flex column g-16'}>
                        <h3 className={styles.header}>
                            Начни строить свою карьеру прямо сейчас!
                        </h3>
                        <p className={styles.text}>
                            На нашем сайте вы всегда можете узнать последние
                            новости рынка труда, а также изучить свежий обзор
                            зарплат, с помощью которого легко оценить, на какие
                            должности стоит нацелиться.
                        </p>
                    </div>
                    <ArrowButtonWithText>
                        <p>Создать аккаунт</p>
                    </ArrowButtonWithText>
                </div>
                <div className={'col-6'}>
                    <p>Some text</p>
                </div>
            </div>
        );
    }
}
