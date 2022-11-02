import { Component } from '../../../../Reacts';
import styles from './footer.module.scss';
import Logo from '../../../static/assets/JobflowDefault.svg';
import JobflowLogo from '../JobflowLogo';

export default class Footer extends Component {
    render() {
        return (
            <footer
                className={`flex mt-40 py-24 row align-items-center justify-content-space-evenly`}
            >
                <JobflowLogo />
                <div
                    key={'headline'}
                    className={`w-100 flex justify-content-center ${styles.tagline}`}
                >
                    <h5>Создай свою команду, найди свою миссию</h5>
                </div>
                <div
                    key={'items'}
                    className={`w-100 g-24 flex row justify-content-end ${styles.items}`}
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
