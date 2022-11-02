import { Component } from '../../../../Reacts';
import Logo from '../../../static/assets/Jobflow.svg';
import styles from './header.module.scss';
import HeaderProfile from './HeaderProfile';
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
                    <div
                        key={'logo'}
                        className={`flex w-100 align-items-center`}
                    >
                        <JobflowLogo />
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
                    <HeaderProfile />
                </div>
            </header>
        );
    }
}
