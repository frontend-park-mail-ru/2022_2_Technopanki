import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Header from '../../components/UI-kit/header/Header';
import styles from './vacancy.module.scss';
import TextBlock from '../../components/UI-kit/text/TextBlock';
import VacancySideBar from '../../components/sidebars/VacancySideBar';
import VacancyHat, { ProfileHatProps } from './VacancyHat';
import Footer from '../../components/UI-kit/footer/Footer';
import { dispatch, profileConnect, vacancyConnect } from '../../store';
import { vacancyService } from '../../services/vacancy/vacancyService';
import { vacancyActions } from '../../store/vacancy/actions';
import { VacancyState } from '../../store/vacancy/type';
import SuccessPopup from '../../components/SuccessPopup/SuccessPopup';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { profileActions } from '../../store/profile/actions';
import { employerProfileService } from '../../services/employerProfileService';
import { ProfileState } from '../../store/profile/types';

class Vacancy extends ReactsComponent<
    VacancyState & { profile: ProfileState }
> {
    // TODO: можно оптимизировать
    async getDataFromServer() {
        // Мы точно уверены что путь будет vacancy/{0,9}+
        const vacancyID = location.pathname.split('/').at(-1);
        let vacancyData = null;
        let postedByUserID = this.props.postedByUserID;

        if (this.props.id !== vacancyID) {
            vacancyData = await vacancyService.getVacancyData(
                vacancyID as string,
            );
            postedByUserID = vacancyData.postedByUserId.toString();
        }

        const profileData = await employerProfileService.getProfileData(
            postedByUserID,
        );

        if (vacancyData) {
            dispatch(vacancyActions.update(vacancyData));
        }
        dispatch(profileActions.update(profileData));
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header />
                <SuccessPopup />
                <ErrorPopup />
                <div className={styles.header_substrate}></div>
                <div className={'columns mt-header g-24'}>
                    <div className={`col-12 ${styles.header}`}>
                        <VacancyHat
                            vacancyID={this.props.id}
                            postedByUserID={this.props.postedByUserID}
                            sendRequest={!!this.props.id}
                            companyName={this.props.profile.name}
                            creatorImgSrc={this.props.profile.avatarSrc}
                            status={this.props.profile.status}
                        />
                    </div>
                    <h3 className={'col-12'}>{this.props.title}</h3>
                    <div className={'col-12 col-md-9 flex column g-40'}>
                        <TextBlock
                            headline={'Описание'}
                            content={this.props.description}
                        />
                        <TextBlock
                            headline={'Задачи'}
                            content={this.props.tasks}
                        />
                        <TextBlock
                            headline={'Требования'}
                            content={this.props.requirements}
                        />
                        <TextBlock
                            headline={'Будет плюсом'}
                            content={this.props.extra}
                        />
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <VacancySideBar
                            salary={this.props.salary}
                            experience={this.props.experience}
                            location={this.props.location}
                            format={this.props.format}
                            hours={this.props.hours}
                            skills={this.props.skills}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const vacancyWrapper = vacancyConnect((state, props) => {
    return { ...state, profile: props.profile };
})(Vacancy);

export default profileConnect(state => {
    return { profile: state };
})(vacancyWrapper);
