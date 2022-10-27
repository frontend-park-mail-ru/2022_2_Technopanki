import { Component } from '../../../../Reacts/index';
import styles from './footer.module.scss';

export default class Footer extends Component {
    render() {
        return (
            <footer
                className={`flex row screen-responsive align-items-center justify-content-space-evenly ${styles.footer}`}
            >
                <div
                    key={'logo'}
                    className={'w-100 flex justify-content-start'}
                >
                    <img alt={'Jobflow'} />
                </div>
                <div
                    key={'headline'}
                    className={'w-100 flex justify-content-center'}
                >
                    <h5>Создай свою команду, найди свою миссию</h5>
                </div>
                <div
                    key={'items'}
                    className={'w-100 g-24 flex row justify-content-end'}
                >
                    <p key={'item1'} className={styles.item}>
                        Главная
                    </p>
                    <p key={'item2'} className={styles.item}>
                        Все вакансии
                    </p>
                    <p key={'item3'} className={styles.item}>
                        Создать резюме
                    </p>
                </div>
            </footer>
        );
    }
}
