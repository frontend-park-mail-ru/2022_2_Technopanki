import { Component } from '../../../../Reacts';
import Logo from '../../../static/assets/Jobflow.svg';
import styles from './header.module.scss';
import MenuIcon from '../../../static/icons/menu.svg';
import ThemeIcon from '../../../static/icons/theme.svg';
import ModalWindow from '../modalWindow/ModalWindow';
import { toggleTheme } from '../../../toggleTheme';
import Link from '../../Link/Link';
import JobflowLogo from '../JobflowLogo';

// TODO: refactor
export default class Header extends Component {
    setActive = (event: MouseEvent) => {
        let cur = document.querySelector(`.${styles.item__active}`);
        let target = event.target as Element;

        if (cur !== null && target !== cur) {
            cur.classList.remove(`${styles.item__active}`);
            target.classList.add(`${styles.item__active}`);
        }
    };

    render() {
        return (
            <header
                className={`x-0 t-0 border-bottom-light fixed screen-responsive ${styles.header}`}
            >
                <div
                    className={`flex h-100 row align-items-center justify-content-space-evenly`}
                >
                    <div className={'w-100 flex column justify-content-center'}>
                        <Link to={'/'} content={<JobflowLogo />} />
                    </div>
                    <div
                        key={'items'}
                        id={'links-group'}
                        className={`flex justify-content-center w-100 g-16 ${styles.items}`}
                    >
                        {/*TODO переделать на Link в роутере*/}
                        <p
                            key={'item1'}
                            id={'item1'}
                            className={`${styles.item__def} ${styles.item__active}`}
                            onClick={this.setActive}
                        >
                            Вакансии
                        </p>
                        <p
                            key={'item2'}
                            id={'item2'}
                            className={styles.item__def}
                            onClick={this.setActive}
                        >
                            Соискатели
                        </p>
                        <p
                            key={'item3'}
                            id={'item3'}
                            className={styles.item__def}
                            onClick={this.setActive}
                        >
                            Создать резюме
                        </p>
                    </div>
                    <div
                        key={'login'}
                        className={`flex g-24 w-100 align-items-center justify-content-end ${styles.auth}`}
                    >
                        <div
                            key={'theme_toggle'}
                            onClick={toggleTheme}
                            className={styles.theme}
                            dangerouslySetInnerHTML={{
                                __html: ThemeIcon,
                            }}
                        />
                        <Link
                            to={'/signin'}
                            content={
                                <p
                                    key={'signin-link'}
                                    className={styles.item__def}
                                >
                                    Войти
                                </p>
                            }
                        />
                        <Link
                            to={'/signup'}
                            content={
                                <p
                                    key={'signup-link'}
                                    className={styles.signup}
                                >
                                    Зарегистрироваться
                                </p>
                            }
                        />
                    </div>
                    <ModalWindow
                        key={'navIcon'}
                        content={
                            <div
                                className={`flex g-24 w-100 justify-content-end ${styles.menu_icon}`}
                                dangerouslySetInnerHTML={{
                                    __html: MenuIcon,
                                }}
                            ></div>
                        }
                        hidden={
                            <div
                                className={'w-100 background-0 rounded-lg p-32'}
                            >
                                <div
                                    key={'items'}
                                    id={'links-group'}
                                    className={`flex column justify-content-center w-100 g-16`}
                                >
                                    {/*TODO переделать на Link в роутере*/}
                                    <p
                                        key={'item1'}
                                        id={'item1'}
                                        className={`${styles.item__def} ${styles.item__active}`}
                                        onClick={this.setActive}
                                    >
                                        Вакансии
                                    </p>
                                    <p
                                        key={'item2'}
                                        id={'item2'}
                                        className={styles.item__def}
                                        onClick={this.setActive}
                                    >
                                        Соискатели
                                    </p>
                                    <p
                                        key={'item3'}
                                        id={'item3'}
                                        className={styles.item__def}
                                        onClick={this.setActive}
                                    >
                                        Создать резюме
                                    </p>
                                </div>
                                <div
                                    key={'login'}
                                    className={`flex column g-24 w-100 justify-content-end`}
                                ></div>
                                <Link
                                    to={'/signin'}
                                    content={
                                        <p
                                            key={'signin-link'}
                                            className={styles.item__def}
                                        >
                                            Войти
                                        </p>
                                    }
                                />
                                <Link
                                    to={'/signup'}
                                    content={
                                        <p
                                            key={'signup-link'}
                                            className={styles.signup}
                                        >
                                            Зарегистрироваться
                                        </p>
                                    }
                                />
                            </div>
                        }
                    />
                </div>
            </header>
        );
    }
}
