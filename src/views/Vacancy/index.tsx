import { Component } from '../../../Reacts';
import Header from '../../components/UI-kit/header/Header';
import styles from './vacancy.module.scss';
import TextBlock from '../../components/UI-kit/text/TextBlock';
import VacancySideBar from '../../components/sidebars/VacancySideBar';
import VacancyHat from './VacancyHat';
import Footer from '../../components/UI-kit/footer/Footer';
import { vacancyStore } from '../../store/vacancy/store';
import { dispatch, vacancyConnect } from '../../store';
import { vacancyService } from '../../services/vacancyService';
import { vacancyActions } from '../../store/vacancy/actions';
import { VacancyState } from '../../store/vacancy/type';

type VacancyPropsType = {
    id?: string;
    postedByUserID: string;
    title: string;
    description: string;
    tasks: string;
    requirements: string;
    extra: string;
    sideBar: {
        salary: string;
        experience: string;
        location: string;
        format: string;
        hours: string;
        skills: string[];
    };
};

class Vacancy extends Component<VacancyPropsType> {
    getDataFromServer() {
        // Мы точно уверены что путь будет vacancy/{0,9}+
        const vacancyID = this.props.id || location.pathname.split('/').at(-1);
        console.log(`VacancyID: ${vacancyID}`);

        vacancyService.getVacancyData(vacancyID as string).then(body => {
            dispatch(vacancyActions.update(body));
        });
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden g-24'}>
                <Header />
                <div className={styles.header_substrate}></div>
                <div className={'columns mt-header g-24'}>
                    <div className={`col-12 ${styles.header}`}>
                        <VacancyHat creatorID={this.props.postedByUserID} />
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
                            salary={this.props.sideBar.salary}
                            experience={this.props.sideBar.experience}
                            location={this.props.sideBar.location}
                            format={this.props.sideBar.format}
                            hours={this.props.sideBar.hours}
                            skills={this.props.sideBar.skills}
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

export default vacancyConnect((store, props) => {
    const storeState = store.getState() as VacancyState;

    return {
        id: props.id || storeState.id,
        postedByUserID: storeState.postedByUserID,
        title: storeState.title,
        description: storeState.description,
        tasks: storeState.tasks,
        requirements: storeState.requirements,
        extra: storeState.extra,
        sideBar: {
            salary: storeState.salary,
            experience: storeState.experience,
            location: storeState.location,
            format: storeState.format,
            hours: storeState.hours,
            skills: storeState.skills,
        },
    };
})(Vacancy);
