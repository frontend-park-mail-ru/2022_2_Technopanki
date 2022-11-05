import { Component } from '../../../Reacts';
import Header from '../../components/UI-kit/header/Header';
import Footer from '../../components/UI-kit/footer/Footer';
import VacancyResponsesHat from './VacancyResponsesHat';
import styles from './vacancy.module.scss';
import ResumeList from '../../components/UI-kit/resumeList/ResumeList';
import VacancySideBar from '../../components/sidebars/VacancySideBar';
import { dispatch, vacancyConnect } from '../../store';
import { vacancyService } from '../../services/vacancyService';
import { vacancyActions } from '../../store/vacancy/actions';
import VacanciesResumeList from './VacanciesResumeList';

class VacancyResponses extends Component<
    {
        title: string;
        postedByUserID: string;
    },
    { vacancyID: string }
> {
    state = {
        vacancyID: '',
    };

    getVacancyData() {
        if (this.state.vacancyID) {
            vacancyService
                .getVacancyData(this.state.vacancyID as string)
                .then(body => {
                    dispatch(vacancyActions.update(body));
                });
        }
    }

    componentDidMount() {
        this.setState(state => ({
            ...state,
            vacancyID: location.pathname.split('/').at(-1) as string,
        }));
    }

    componentDidUpdate() {
        this.getVacancyData();
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header key={'header'} />
                <div key={'vacancies'} className={'columns mt-header g-24'}>
                    <div className={`col-12 ${styles.header}`}>
                        <VacancyResponsesHat
                            postedByUserID={this.props.postedByUserID}
                        />
                    </div>
                    <h3 key={'title'} className={'col-12'}>
                        {this.props.title}
                    </h3>
                    <div
                        key={'responses'}
                        className={'col-12 col-md-9 column g-16'}
                    >
                        <h6 key={'asd'}>Отклики на вакансию</h6>
                        <VacanciesResumeList />
                    </div>
                    <div key={'kj'} className={'col-12 col-md-3'}>
                        <VacancySideBar />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default vacancyConnect(store => {
    return {
        title: store.getState().title,
        postedByUserID: store.getState().postedByUserID,
    };
})(VacancyResponses);
