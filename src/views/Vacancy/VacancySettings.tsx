import { Component } from '../../../Reacts';
import Header from '../../components/UI-kit/header/Header';
import SettingsHat from '../../components/hats/SettingsHat';
import Form, { FormSectionType } from '../../components/UI-kit/forms/Form';
import Input from '../../components/UI-kit/forms/inputs/Input';
import CancelSaveButtons from '../../components/CancelSaveButtons/CancelSaveButtons';
import Textarea from '../../components/UI-kit/forms/inputs/Textarea';
import Footer from '../../components/UI-kit/footer/Footer';
import { dispatch, userConnect, vacancyConnect } from '../../store';
import { vacancyService } from '../../services/vacancyService';
import navigator from '../../router/navigator.tsx';
import { vacancyActions } from '../../store/vacancy/actions';
import ChipsInput from '../../components/UI-kit/forms/inputs/ChipsInput';
import Button from '../../components/UI-kit/buttons/Button';
import { activateError, deactivateError } from '../../store/errors/actions';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { EMPLOYER_PATHS } from '../../utils/routerConstants';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';

class AboutVacancyComponent extends Component<{
    title: string;
    salary: string;
    experience: string;
}> {
    render() {
        return (
            <div className={'flex column g-16'}>
                <Input
                    id={'title'}
                    type={'text'}
                    placeholder={'Фронтенд-разработчик (VK Play)'}
                    label={'Название вакансии'}
                    name={'title'}
                    value={this.props.title}
                />
                <div className={'columns g-24'}>
                    <div className={'col-12 col-md-4'}>
                        <Input
                            id={'salary'}
                            type={'text'}
                            placeholder={'100.000'}
                            label={'Заработная плата (руб/мес)'}
                            name={'salary'}
                            value={this.props.salary}
                        />
                    </div>
                    <div className={'col-12 col-md-4'}>
                        <Input
                            id={'experience'}
                            type={'text'}
                            placeholder={'3-6'}
                            label={'Требуемый опыт работы'}
                            name={'experience'}
                            value={this.props.experience}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

const AboutVacancy = vacancyConnect((state, props) => {
    return {
        title: state.title,
        salary: state.salary,
        experience: state.experience,
    };
})(AboutVacancyComponent);

class Skills extends Component<
    { skills: string[] },
    {
        skills: string[];
    }
> {
    state = {
        skills: this.props.skills,
    };

    deleteItem = (index: number) => {
        this.setState(state => ({
            ...state,
            skills: [
                ...state.skills.slice(0, index),
                ...state.skills.slice(index + 1),
            ],
        }));
    };

    addItem = (value: string) => {
        this.setState(state => ({
            ...state,
            skills: [...state.skills, value],
        }));
    };

    render() {
        return (
            <div>
                <input
                    className={'none'}
                    name={'skills'}
                    value={this.state.skills}
                />
                <ChipsInput
                    id={'skillsChips'}
                    label={'Область деятельности'}
                    items={this.state.skills}
                    deleteItem={this.deleteItem.bind(this)}
                    addItem={this.addItem.bind(this)}
                />
            </div>
        );
    }
}

class AdditionalInformationComponent extends Component<{
    location: string;
    schedule: string;
    format: string;
}> {
    render() {
        return (
            <div className={'columns g-24'}>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'location'}
                        type={'text'}
                        placeholder={'Москва'}
                        label={'Город работы'}
                        name={'location'}
                        value={this.props.location}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'schedule'}
                        type={'text'}
                        placeholder={'40 часов в неделю'}
                        label={'График работы'}
                        name={'schedule'}
                        value={this.props.schedule}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'format'}
                        type={'text'}
                        placeholder={'Смешанный формат'}
                        label={'Формат работы'}
                        name={'format'}
                        value={this.props.format}
                    />
                </div>
            </div>
        );
    }
}

const AdditionalInformation = vacancyConnect(state => {
    return {
        location: state.location,
        schedule: state.hours,
        format: state.format,
    };
})(AdditionalInformationComponent);

class VacancyDescriptionComponent extends Component<{
    description: string;
    tasks: string;
    requirements: string;
    extra: string;
}> {
    render() {
        return (
            <div className={'columns g-24'}>
                <div className={'col-12'}>
                    <Textarea
                        id={'description'}
                        label={'Описание вакансии'}
                        name={'description'}
                        placeholder={'Описание вакансии'}
                        value={this.props.description}
                    />
                </div>
                <div className={'col-12'}>
                    <Textarea
                        id={'tasks'}
                        label={'Задачи'}
                        name={'tasks'}
                        placeholder={'Задачи'}
                        value={this.props.tasks}
                    />
                </div>
                <div className={'col-12'}>
                    <Textarea
                        id={'requirements'}
                        label={'Требования'}
                        name={'requirements'}
                        placeholder={'Требования'}
                        value={this.props.requirements}
                    />
                </div>
                <div className={'col-12'}>
                    <Textarea
                        id={'extra'}
                        label={'Будет плюсом'}
                        name={'extra'}
                        placeholder={'Будет плюсом'}
                        value={this.props.extra}
                    />
                </div>
            </div>
        );
    }
}

const VacancyDescription = vacancyConnect(state => {
    return {
        description: state.description,
        tasks: state.tasks,
        requirements: state.requirements,
        extra: state.extra,
    };
})(VacancyDescriptionComponent);

class VacancySettings extends Component<
    { id: string; postedByUserID: string; avatarSrc: string },
    { sections: FormSectionType[] }
> {
    state = {
        isNew: location.pathname.split('/').at(-1) === 'new',
        sections: [
            {
                header: 'О вакансии',
                content: <AboutVacancy />,
            },
            {
                header: 'Дополнительная информация',
                content: <AdditionalInformation />,
            },
            {
                header: 'Описание вакансии',
                content: <VacancyDescription />,
            },
        ],
    };

    submitForm = (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let errorFlag = false;

        formData.forEach(value => {
            if (!value || value === '') {
                dispatch(
                    activateError(
                        'Пожалуйста, заполните все поля формы',
                        'В форме не должно быть пустых полей',
                    ),
                );
                setTimeout(() => dispatch(deactivateError()), 5000);
                errorFlag = true;
            }
        });

        if (errorFlag) {
            return;
        }

        if (this.state.isNew) {
            vacancyService
                .createVacancy(this.props.postedByUserID, formData)
                .then(body => {
                    if (body.id) {
                        navigator.navigate('/vacancy/' + body.id.toString());
                    } else {
                        navigator.navigate(
                            EMPLOYER_PATHS.PROFILE + this.props.postedByUserID,
                        );
                    }
                });
        } else {
            vacancyService
                .updateVacancy(this.props.id, formData)
                .then(() => {
                    navigator.goBack();
                })
                .catch(err => console.error(err));
        }
    };

    componentDidMount() {
        if (!this.state.isNew) {
            const vacancyID = location.pathname.split('/').at(-1);
            vacancyService
                .getVacancyData(vacancyID)
                .then(body => dispatch(vacancyActions.update(body)))
                .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden'}>
                <Header key={'header'} />
                <ErrorPopup key={'error'} />
                <div key={'hat'} className={'columns g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={this.props.avatarSrc}
                            status={'Место встречи профессионалов'}
                            postedByUserID={this.props.postedByUserID}
                            linkTo={
                                EMPLOYER_PATHS.PROFILE +
                                this.props.postedByUserID
                            }
                            submit={() =>
                                document
                                    .querySelector('#vacancy_form')
                                    .dispatchEvent(new Event('submit'))
                            }
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки вакансии</h3>
                    <div className={'col-12 col-md-9'}>
                        <Form
                            id={'vacancy_form'}
                            sections={this.state.sections}
                            submitComponent={
                                <ButtonPrimary>Сохранить</ButtonPrimary>
                            }
                            onSubmit={this.submitForm.bind(this)}
                        />
                    </div>
                    <div className={'col-12 row flex g-16'}>
                        <Button key={'back'} onClick={navigator.goBack}>
                            Назад
                        </Button>
                        <Button
                            key={'delete'}
                            onClick={() =>
                                vacancyService
                                    .deleteVacancy(this.props.id)
                                    .then(() => navigator.goBack())
                            }
                        >
                            Удалить вакансию
                        </Button>
                    </div>
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}

const UserWrapper = userConnect((state, props) => ({
    id: props.id,
    postedByUserID:
        props.postedByUserID !== '' ? props.postedByUserID : state.id,
    avatarSrc: state.avatarSrc,
}))(VacancySettings);

export default vacancyConnect((state, props) => ({
    id: state.id,
    postedByUserID: state.postedByUserID,
}))(UserWrapper);
