import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Header from '../../components/UI-kit/header/Header';
import SettingsHat from '../../components/hats/SettingsHat';
import Form from '../../components/UI-kit/forms/Form';
import FormInput from '../../components/UI-kit/forms/formInputs/FormInput';
import FormItem from '../../components/UI-kit/forms/FormItem';
import FormTextarea from '../../components/UI-kit/forms/formInputs/FormTextarea';
import FormInputGroup from '../../components/UI-kit/forms/formInputs/FormInputGroup';
import Footer from '../../components/UI-kit/footer/Footer';
import { dispatch, userConnect, vacancyConnect } from '../../store';
import { vacancyService } from '../../services/vacancy/vacancyService';
import navigator from '../../router/navigator';
import { vacancyActions } from '../../store/vacancy/actions';
import Button from '../../components/UI-kit/buttons/Button';
import { activateError, deactivateError } from '../../store/errors/actions';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { EMPLOYER_PATHS } from '../../utils/routerConstants';
import ButtonRed from '../../components/UI-kit/buttons/ButtonRed';
import RenderWithCondition from '../../components/RenderWithCondition';
import { VacancyState } from '../../store/vacancy/type';
import { useValidation } from '../../utils/validation/formValidation';
import {
    validateExperience,
    validateLocation,
    validateSalary,
    validateTitleLength,
    validateTitleSymbols,
} from './settingsValidators';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';

class VacancySettings extends ReactsComponent<
    {
        id: string;
        avatarSrc: string;
        vacancy: VacancyState;
    },
    { isNew: boolean }
> {
    state = {
        isNew: location.pathname.split('/').at(-1) === 'new',
    };

    validation = useValidation({
        title: [validateTitleLength, validateTitleSymbols],
        salary: [validateSalary],
        experience: [validateExperience],
        location: [validateLocation],
    });

    submitForm = (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.validation.ok()) {
            return;
        }

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
                .createVacancy(
                    this.props.vacancy.postedByUserID,
                    formData,
                    this.props.avatarSrc.split('/').at(-1) as string,
                )
                .then(body => {
                    if (body.id) {
                        navigator.navigate('/vacancy/' + body.id.toString());
                    } else {
                        navigator.navigate(
                            EMPLOYER_PATHS.PROFILE +
                                this.props.vacancy.postedByUserID,
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
        if (this.state.isNew) {
            const vacancyID = location.pathname.split('/').at(-1) as string;
            vacancyService
                .getVacancyData(vacancyID)
                .then(body => dispatch(vacancyActions.update(body)))
                .catch(err => console.error(err));
        }
    }

    render() {
        return (
            <div className={'screen-responsive relative hidden'}>
                <Header />
                <ErrorPopup />
                <div className={'columns g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={this.props.avatarSrc}
                            status={'Место встречи профессионалов'}
                            postedByUserID={this.props.vacancy.postedByUserID}
                            linkTo={
                                EMPLOYER_PATHS.PROFILE +
                                this.props.vacancy.postedByUserID
                            }
                            submit={() =>
                                document
                                    .querySelector('#vacancy_form')
                                    .dispatchEvent(new Event('submit'))
                            }
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки вакансии</h3>
                    <Form onSubmit={this.submitForm}>
                        <FormItem header={'О вакансии'}>
                            <FormInput
                                size={'12'}
                                id={'title'}
                                label={'Название вакансии'}
                                value={this.props.vacancy.title}
                                type={'text'}
                                placeholder={'Название компании'}
                                name={'title'}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'title',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'salary'}
                                label={'Заработная плата'}
                                value={this.props.vacancy.salary}
                                type={'text'}
                                placeholder={'100.000'}
                                name={'salary'}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'salary',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'experience'}
                                label={'Опыт работы'}
                                value={this.props.vacancy.experience}
                                type={'text'}
                                placeholder={'3-6'}
                                name={'experience'}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'experience',
                                )}
                                validationMode={'oninput'}
                            />
                        </FormItem>
                        <FormItem header={'Дополнительная информация'}>
                            <FormInput
                                size={'4'}
                                id={'location'}
                                label={'Город работы'}
                                value={this.props.vacancy.location}
                                type={'text'}
                                placeholder={'Москва'}
                                name={'location'}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'location',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'hours'}
                                label={'График работы'}
                                value={this.props.vacancy.hours}
                                type={'text'}
                                placeholder={'40 часов в неделю'}
                                name={'hours'}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'hours',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInputGroup
                                id={'format'}
                                size={'4'}
                                label={'Формат работы'}
                                name={'format'}
                                options={[
                                    {
                                        value: 'Полный день',
                                        children: 'Полный день',
                                    },
                                    {
                                        value: 'Смешанный формат',
                                        children: 'Смешанный формат',
                                    },
                                    {
                                        value: 'Удаленная работа',
                                        children: 'Удаленная работа',
                                    },
                                    {
                                        value: 'Гибкий график',
                                        children: 'Гибкий график',
                                    },
                                    {
                                        value: 'Сменный график',
                                        children: 'Сменный график',
                                    },
                                ]}
                            />
                        </FormItem>
                        <FormItem header={'Описание вакансии'}>
                            <FormTextarea
                                size={'12'}
                                id={'description'}
                                label={'Описание'}
                                value={this.props.vacancy.description}
                                placeholder={
                                    'Напишите здесь описание вашей компании'
                                }
                                name={'description'}
                                required={true}
                            />
                            <FormTextarea
                                size={'12'}
                                id={'tasks'}
                                label={'Задачи'}
                                value={this.props.vacancy.tasks}
                                name={'tasks'}
                                required={true}
                            />
                            <FormTextarea
                                size={'12'}
                                id={'requirements'}
                                label={'Требования'}
                                value={this.props.vacancy.requirements}
                                name={'requirements'}
                                required={true}
                            />
                            <FormTextarea
                                size={'12'}
                                id={'extra'}
                                label={'Будет плюсом'}
                                value={this.props.vacancy.extra}
                                name={'extra'}
                                required={true}
                            />
                        </FormItem>
                        <div>
                            <ButtonPrimary type={'submit'}>
                                Сохранить
                            </ButtonPrimary>
                        </div>
                    </Form>
                    <div className={'col-12 col-md-9'}></div>
                    <div className={'col-12 row flex g-16'}>
                        <Button onClick={navigator.goBack}>Назад</Button>
                        <RenderWithCondition
                            condition={!this.state.isNew}
                            onSuccess={
                                <ButtonRed
                                    onClick={() =>
                                        vacancyService
                                            .deleteVacancy(this.props.id)
                                            .then(() =>
                                                navigator.navigate(
                                                    EMPLOYER_PATHS.PROFILE +
                                                        this.props.vacancy
                                                            .postedByUserID,
                                                ),
                                            )
                                    }
                                >
                                    Удалить вакансию
                                </ButtonRed>
                            }
                        />
                    </div>
                </div>
                <Footer />
            </div>
        );
    }
}

const UserWrapper = userConnect((state, props) => ({
    vacancy: props.vacancy,
    avatarSrc: state.avatarSrc,
}))(VacancySettings);

export default vacancyConnect(state => ({
    vacancy: { ...state },
}))(UserWrapper);
