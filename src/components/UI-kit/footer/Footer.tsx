import { Component } from '../../../../Reacts';
import styles from './footer.module.scss';
import Logo from '../../../static/assets/JobflowDefault.svg';
import JobflowLogo from '../JobflowLogo';
import Link from '../../Link/Link';

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
                    <Link
                        to={'/vacancies'}
                        content={
                            <p key={'item1'} className={styles.item}>
                                Вакансии
                            </p>
                        }
                    />
                    <Link
                        to={'/applicant/1'}
                        content={
                            <p key={'item2'} className={styles.item}>
                                Соискатели
                            </p>
                        }
                    />

                    <Link
                        to={'/applicant/1'}
                        content={
                            <p key={'item3'} className={styles.item}>
                                Создать резюме
                            </p>
                        }
                    />
                </div>
            </footer>
        );
    }
}
