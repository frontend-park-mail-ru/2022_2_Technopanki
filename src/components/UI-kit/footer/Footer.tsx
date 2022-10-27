import { Component } from '../../../../Reacts/index';
import styles from './footer.module.scss';

export default class Footer extends Component {
    render() {
        return (
            <footer
                className={`flex row screen-responsive align-items-center justify-content-space-evenly ${styles.footer}`}
            >
                <div className={'w-100 flex justify-content-start'}>
                    <img alt={'Jobflow'} />
                </div>
                <div className={'w-100 flex justify-content-center'}>
                    <h5>Создай свою команду, найди свою миссию</h5>
                </div>
                <div className={'w-100 g-24 flex row justify-content-end'}>
                    <p>Главная</p>
                    <p>Все вакансии</p>
                    <p>Создать резюме</p>
                </div>
            </footer>
        );
    }
}
