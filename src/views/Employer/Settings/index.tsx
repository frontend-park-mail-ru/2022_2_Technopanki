import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import styles from '../Vacancy/vacancy.module.scss';
import VacancyHat from '../../../components/hats/VacancyHat';

export default class EmployerSettings extends Component {
    render() {
        return (
            <div className={'screen-responsive relative hidden'}>
                <Header />
                <div className={'columns g-24'}>
                    <div className={`col-12`}>
                        <VacancyHat
                            imgSrc={'./'}
                            companyName={'VK'}
                            description={'Место встречи профессионалов'}
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки вакансии</h3>
                </div>
            </div>
        );
    }
}
