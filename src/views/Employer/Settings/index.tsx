import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import VacancyHat from '../../../components/hats/VacancyHat';
import VacancySettingsHat from '../../../components/hats/VacancySettingsHat';

export default class EmployerSettings extends Component {
    render() {
        return (
            <div className={'screen-responsive relative hidden'}>
                <Header />
                <div className={'columns flex column g-24'}>
                    <div className={`col-12 mt-header`}>
                        <VacancySettingsHat
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
