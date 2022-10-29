import { Component } from '../../../../Reacts/index';
import styles from './header.module.scss';

export default class Header extends Component {
    // cur = document.getElementById('item1')
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
                    <div className={`flex w-100 g-8 align-items-center`}>
                        <img alt="Jobflow" />
                    </div>
                    <div
                        id={'links-group'}
                        className={`flex justify-content-center w-100 g-16`}
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

                    <div className={'flex g-24 w-100 justify-content-end'}>
                        <p key={'login-link'} className={styles.item__def}>
                            Войти
                        </p>
                        <p key={'signin-link'} className={styles.signup}>
                            Зарегистрироваться
                        </p>
                    </div>
                </div>
            </header>
        );
    }
}
