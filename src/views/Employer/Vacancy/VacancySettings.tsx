import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import VacancyHat from '../../../components/hats/VacancyHat';
import VacancySettingsHat from '../../../components/hats/VacancySettingsHat';
import Form, { FormSectionType } from '../../../components/UI-kit/forms/Form';
import Input from '../../../components/UI-kit/forms/inputs/Input';
import CancelSaveButtons from '../../../components/CancelSaveButtons/CancelSaveButtons';
import Description from '../../../components/auth/Description';
import EmployerProfileSideBar from '../../../components/sidebars/EmployerProfileSideBar';
import Textarea from '../../../components/UI-kit/forms/inputs/Textarea';

class AboutVacancy extends Component {
    render() {
        return (
            <div className={'flex column g-16'}>
                <Input
                    id={'name'}
                    type={'text'}
                    placeholder={'Фронтенд-разработчик (VK Play)'}
                    label={'Название вакансии'}
                    name={'employer_name'}
                />
                <div className={'columns g-24'}>
                    <div className={'col-12 col-md-4'}>
                        <Input
                            id={'salary'}
                            type={'text'}
                            placeholder={'100.000'}
                            label={'Заработная плата'}
                            name={'salary'}
                        />
                    </div>
                    <div className={'col-12 col-md-4'}>
                        <Input
                            id={'experience'}
                            type={'text'}
                            placeholder={'3-6'}
                            label={'Требуемый опыт работы'}
                            name={'experience'}
                        />
                    </div>
                </div>
            </div>
        );
    }
}

class AdditionalInformation extends Component {
    render() {
        return (
            <div className={'columns g-24'}>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'sity'}
                        type={'text'}
                        placeholder={'Москва'}
                        label={'Город работы'}
                        name={'sity'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'schedule'}
                        type={'text'}
                        placeholder={'40 часов в неделю'}
                        label={'График работы'}
                        name={'schedule'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={' format'}
                        type={'text'}
                        placeholder={'Смешанный формат'}
                        label={'Формат работы'}
                        name={' format'}
                    />
                </div>
            </div>
        );
    }
}

class VacancyDescription extends Component {
    render() {
        return (
            <div className={'columns g-24'}>
                <div className={'col-12'}>
                    <Textarea placeholder={'Описание вакансии'}>
                        Описание вакансии
                    </Textarea>
                </div>
                <div className={'col-12'}>
                    <Textarea placeholder={'Задачи'}>Задачи</Textarea>
                </div>
                <div className={'col-12'}>
                    <Textarea placeholder={'Требования'}>Требования</Textarea>
                </div>
                <div className={'col-12'}>
                    <Textarea placeholder={'Будет плюсом'}>
                        Будет плюсом
                    </Textarea>
                </div>
            </div>
        );
    }
}

export default class VacancySettings extends Component<
    {},
    { sections: FormSectionType[] }
> {
    state = {
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

    submitForm = () => {};

    render() {
        return (
            <div className={'screen-responsive relative hidden'}>
                <Header />
                <div className={'columns g-24'}>
                    <div className={`col-12 mt-header`}>
                        <VacancySettingsHat
                            imgSrc={'./'}
                            companyName={'VK'}
                            description={'Место встречи профессионалов'}
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки вакансии</h3>
                    <div className={'col-12 col-md-9'}>
                        <Form
                            sections={this.state.sections}
                            submitComponent={
                                <CancelSaveButtons
                                    onCancel={() => {}}
                                    onSave={() => {}}
                                />
                            }
                            onSubmit={this.submitForm}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
