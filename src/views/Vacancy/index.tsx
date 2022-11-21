import { Component } from '../../../__Reacts__old_version__';
import Header from '../../components/UI-kit/header/Header';
import styles from './vacancy.module.scss';
import TextBlock from '../../components/UI-kit/text/TextBlock';
import VacancySideBar from '../../components/sidebars/VacancySideBar';
import VacancyHat from './VacancyHat';
import Footer from '../../components/UI-kit/footer/Footer';
import { dispatch, vacancyConnect } from '../../store';
import { vacancyService } from '../../services/vacancyService';
import { vacancyActions } from '../../store/vacancy/actions';
import { VacancyState } from '../../store/vacancy/type';
import SuccessPopup from '../../components/SuccessPopup/SuccessPopup';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';

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
        const vacancyID = location.pathname.split('/').at(-1);
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
                <Header key={'header'} />
                <SuccessPopup key={'success'} />
                <ErrorPopup key={'eror'} />
                <div
                    key={'substrate'}
                    className={styles.header_substrate}
                ></div>
                <div key={'user'} className={'columns mt-header g-24'}>
                    <div key={'hat'} className={`col-12 ${styles.header}`}>
                        <VacancyHat
                            vacancyID={this.props.id}
                            postedByUserID={this.props.postedByUserID}
                            sendRequest={!!this.props.id}
                        />
                    </div>
                    <h3 key={'header'} className={'col-12'}>
                        {this.props.title}
                    </h3>
                    <div
                        key={'text'}
                        className={'col-12 col-md-9 flex column g-40'}
                    >
                        <TextBlock
                            key={'description'}
                            headline={'Описание'}
                            content={this.props.description}
                        />
                        <TextBlock
                            key={'tasks'}
                            headline={'Задачи'}
                            content={this.props.tasks}
                        />
                        <TextBlock
                            key={'requirements'}
                            headline={'Требования'}
                            content={this.props.requirements}
                        />
                        <TextBlock
                            key={'extra'}
                            headline={'Будет плюсом'}
                            content={this.props.extra}
                        />
                    </div>
                    <div key={'sidebar'} className={'col-12 col-md-3'}>
                        <VacancySideBar />
                    </div>
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}

export default vacancyConnect(state => {
    const storeState = state as VacancyState;
    return {
        id: storeState.id,
        postedByUserID: storeState.postedByUserID,
        title: storeState.title,
        description: storeState.description,
        tasks: storeState.tasks,
        requirements: storeState.requirements,
        extra: storeState.extra,
    };
})(Vacancy);
