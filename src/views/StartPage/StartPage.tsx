import { Component } from '../../../Reacts';
import ArrowButton from '../../components/UI-kit/buttons/ArrowButton';
import styles from './startPage.module.scss';
import Button from '../../components/UI-kit/buttons/Button';
import ArrowButtonOutline from '../../components/UI-kit/buttons/ArrowButtonOutline';
import Header from '../../components/UI-kit/header/Header';
import ArrowButtonWithText from '../../components/UI-kit/buttons/ArrowButtonWithText';
import ArrowButtonWithTextOutline from '../../components/UI-kit/buttons/ArrowButtonWithTextOutline';
import Logo from '../../static/assets/JobflowDefault.svg';
import img from '../../static/assets/MainPicture.png';

export default class StartPage extends Component {
    render() {
        console.log(img);
        return (
            <div
                className={
                    'grid h-100vh columns g-24 relative hidden screen-responsive'
                }
            >
                <Header key={'header'} />
                <div
                    key={'content'}
                    className={
                        'col-6 justify-content-center flex column g-32 content'
                    }
                >
                    <div
                        key={'logo'}
                        className={`flex w-100 g-8 align-items-center h-16 ${styles.logo}`}
                        dangerouslySetInnerHTML={{ __html: Logo }}
                    ></div>
                    <div key={'content'} className={'flex column g-16'}>
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
                    <div key={'buttons'} className={'flex column g-16'}>
                        <ArrowButtonWithText key={'1'}>
                            <p>Создать аккаунт</p>
                        </ArrowButtonWithText>
                        <ArrowButtonWithTextOutline key={'2'}>
                            <p>Посмотреть все вакансии</p>
                        </ArrowButtonWithTextOutline>
                    </div>
                </div>
                <div className={'col-6 flex h-100 align-items-center'}>
                    <div className={'absolute r-0'}>
                        <img className={''} src={img} />
                    </div>
                </div>
            </div>
        );
    }
}
