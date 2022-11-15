import { Component } from '../../../__Reacts__old_version__';
import Header from '../../components/UI-kit/header/Header';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyResponsesHat from './VacancyResponsesHat';
import styles from './vacancy.module.scss';
import VacancySideBar from '../../components/sidebars/VacancySideBar';
import { dispatch, userConnect, vacancyConnect } from '../../store';
import { vacancyService } from '../../services/vacancyService';
import { vacancyActions } from '../../store/vacancy/actions';
import VacanciesResumeList from './VacanciesResumeList';
import RenderWithCondition from '../../components/RenderWithCondition';

class VacancyResponses extends Component<{
    userID: string;
    title: string;
    postedByUserID: string;
    vacancyID: string;
}> {
    componentDidMount() {
        vacancyService
            .getVacancyData(location.pathname.split('/').at(-1) as string)
            .then(body => {
                dispatch(vacancyActions.update(body));
            });
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header key={'header'} />
                <div key={'vacancies'} className={'columns mt-header g-24'}>
                    <div className={`col-12 ${styles.header}`}>
                        <VacancyResponsesHat
                            vacancyID={this.props.vacancyID}
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
                            onSuccess={<VacanciesResumeList />}
                        />
                    </div>
                    <div className={'col-12 col-md-3'}>
                        <VacancySideBar />
                    </div>
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}

const UserWrapper = userConnect((state, props) => ({
    userID: state.id,
    vacancyID: props.vacancyID,
    title: props.title,
    postedByUserID: props.postedByUserID,
}))(VacancyResponses);

export default vacancyConnect(state => {
    return {
        vacancyID: state.id,
        title: state.title,
        postedByUserID: state.postedByUserID,
    };
})(UserWrapper);
