import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Header from '../../components/UI-kit/header/Header';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyResponsesHat from './VacancyResponsesHat';
import styles from './vacancy.module.scss';
import VacancySideBar from '../../components/sidebars/VacancySideBar';
import { dispatch, userConnect, vacancyConnect } from '../../store';
import { vacancyService } from '../../services/vacancy/vacancyService';
import { vacancyActions } from '../../store/vacancy/actions';
import RenderWithCondition from '../../components/RenderWithCondition';
import ResumeList from '../../components/UI-kit/resumeList/ResumeList';
import { employerProfileService } from '../../services/employerProfileService';
import { profileActions } from '../../store/profile/actions';
import { ResumeListItemPropsType } from '../../components/UI-kit/resumeList/ResumeListItem';
import { VacancyState } from '../../store/vacancy/type';

class VacancyResponses extends ReactsComponent<
    {
        userID: string;
    } & VacancyState,
    {
        responses: ResumeListItemPropsType[];
    }
> {
    state = {
        responses: [] as ResumeListItemPropsType[],
    };
    async getDataFromServer() {
        const vacancyID: string = location.pathname.split('/').at(-1) as string;

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

        const responses = await vacancyService.getResponses(vacancyID);

        if (vacancyData) {
            dispatch(vacancyActions.update(vacancyData));
        }
        dispatch(profileActions.update(profileData));
        this.setState(state => ({ ...state, responses: responses.data }));
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header key={'header'} />
                <div key={'vacancies'} className={'columns mt-header g-24'}>
                    <div className={`col-12 ${styles.header}`}>
                        <VacancyResponsesHat
                            vacancyID={
                                location.pathname.split('/').at(-1) as string
                            }
                            postedByUserID={this.props.postedByUserID}
                        />
                    </div>
                    <h3 className={'col-12'}>{this.props.title}</h3>
                    <div className={'col-12 col-md-9 column g-16'}>
                        <h6>Отклики на вакансию</h6>
                        <RenderWithCondition
                            condition={
                                this.props.userID === this.props.postedByUserID
                            }
                            onSuccess={
                                <ResumeList resume={this.state.responses} />
                            }
                        />
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <VacancySideBar />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const UserWrapper = userConnect((state, props) => ({
    userID: state.id,
    ...state,
}))(VacancyResponses);

export default vacancyConnect(state => ({ ...state }))(UserWrapper);
