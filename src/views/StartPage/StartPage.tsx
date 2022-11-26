import styles from './startPage.module.scss';
import Header from '../../components/UI-kit/header/Header';
import ArrowButtonWithText from '../../components/UI-kit/buttons/ArrowButtonWithText';
import ArrowButtonWithTextOutline from '../../components/UI-kit/buttons/ArrowButtonWithTextOutline';
import Logo from '../../static/assets/JobflowDefault.svg';
import Link from '../../components/Link/Link';
import { SIGN_UP_PATH, VACANCIES_PATH } from '../../utils/routerConstants';
import { ReactsComponent } from '../../../Reacts/reacts/src/Component';

export default class StartPage extends ReactsComponent {
    render() {
        return (
            <div
                className={
                    'grid h-100vh columns g-24 hidden relative screen-responsive'
                }
            >
                <Header />
                <div
                    className={
                        'col-md-6 col-12 h-100vh justify-content-center flex column g-32'
                    }
                >
                    <div
                        className={`flex g-8 align-items-center h-16 ${styles.logo}`}
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
                    <div className={'flex column g-16'}>
                        <Link
                            to={SIGN_UP_PATH}
                            content={
                                <ArrowButtonWithText>
                                    <p>Создать аккаунт</p>
                                </ArrowButtonWithText>
                            }
                        />
                        <Link
                            to={VACANCIES_PATH}
                            content={
                                <ArrowButtonWithTextOutline>
                                    <p>Посмотреть все вакансии</p>
                                </ArrowButtonWithTextOutline>
                            }
                        />
                    </div>
                </div>
                <div
                    className={`col-md-6 col-0 relative flex h-100 align-items-center`}
                >
                    <div className={`absolute r-0 ${styles.picture}`}></div>
                    <div
                        className={`absolute ${styles.picture_overflow} ${styles['picture_overflow-1']}`}
                    ></div>
                    <div
                        className={`absolute ${styles.picture_overflow} ${styles['picture_overflow-2']}`}
                    ></div>
                </div>
            </div>
        );
    }
}
