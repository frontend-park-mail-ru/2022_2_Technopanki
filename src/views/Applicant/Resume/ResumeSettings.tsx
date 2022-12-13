import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Header from '../../../components/UI-kit/header/Header';
import SettingsHat from '../../../components/hats/SettingsHat';
import { InputPropsType } from '../../../components/UI-kit/forms/inputs/Input';
import { resumeService } from '../../../services/resume/resumeService';
import navigator from '../../../router/navigator';
import { ResumeState } from '../../../store/resume/type';
import ButtonPrimary from '../../../components/UI-kit/buttons/ButtonPrimary';
import Button from '../../../components/UI-kit/buttons/Button';
import ButtonRed from '../../../components/UI-kit/buttons/ButtonRed';
import Footer from '../../../components/UI-kit/footer/Footer';
import { dispatch, resumeConnect, userConnect } from '../../../store';
import { resumeActions } from '../../../store/resume/actions';
import Form from '../../../components/UI-kit/forms/Form';
import FormInput from '../../../components/UI-kit/forms/formInputs/FormInput';
import FormTextarea from '../../../components/UI-kit/forms/formInputs/FormTextarea';
import FormItem from '../../../components/UI-kit/forms/FormItem';
import { useValidation } from '../../../utils/validation/formValidation';
import {
    validateTitleLength,
    validateTitleSymbols,
} from '../../Vacancy/settingsValidators';
import RenderWithCondition from '../../../components/RenderWithCondition';
import { RESUME_PATHS } from '../../../utils/routerConstants';
import FormInputGroup from '../../../components/UI-kit/forms/formInputs/FormInputGroup';

class ResumeSettings extends ReactsComponent<
    ResumeState & { isNew: boolean },
    {
        sections: {
            fields: {
                [key: string]: {
                    fieldHeader: string;
                    props: InputPropsType;
                };
            };
        }[];
    }
> {
    state = {
        isNew: location.pathname.split('/').at(-1) === 'new',
    };

    validation = useValidation({
        title: [validateTitleSymbols, validateTitleLength],
    });

    submitForm = (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.validation.ok()) {
            return;
        }
        const formData = new FormData(e.target as HTMLFormElement);
        const resumeID = location.pathname.split('/').at(-1);

        if (this.state.isNew) {
            resumeService
                .addResume(this.props.postedByUserID, formData)
                .then(body => navigator.navigate(RESUME_PATHS.INDEX + body.id));
        } else {
            resumeService
                .updateResume(resumeID, formData)
                .then(() => {
                    navigator.goBack();
                })
                .catch(err => console.error(err));
        }
    };

    getDataFromServer() {
        const resumeID = location.pathname.split('/').at(-1);

        if (resumeID !== 'new') {
            resumeService.getResumeData(resumeID as string).then(body => {
                dispatch(resumeActions.update(body));
            });
        }
    }

    deleteResume(creatorID: string) {
        const resumeID = location.pathname.split('/').at(-1);

        resumeService
            .deleteResume(resumeID as string)
            .then(() => navigator.navigate(`/applicant/${creatorID}`));
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <div className={'screen-responsive relative'}>
                <Header />
                <div class={'column g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat creatorID={this.props.postedByUserID} />
                    </div>
                    <h3 className={'col-12'}>Настройки резюме</h3>
                    <Form onSubmit={this.submitForm}>
                        <FormItem header={'О себе'}>
                            <FormInput
                                size={'12'}
                                id={'title'}
                                label={'Заголовок резюме'}
                                type={'text'}
                                name={'title'}
                                setError={this.validation.setError}
                                required={true}
                                value={this.props.title}
                                validation={this.validation.getValidation(
                                    'title',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInputGroup
                                id={'experience'}
                                size={'4'}
                                label={'Опыт работы'}
                                name={'experience'}
                                options={[
                                    {
                                        value: 'Нет опыта',
                                        children: 'Нет опыта',
                                    },
                                    {
                                        value: 'От 1 года до 3 лет',
                                        children: 'От 1 года до 3 лет',
                                    },
                                    {
                                        value: 'От 3 до 6 лет',
                                        children: 'От 3 до 6 лет',
                                    },
                                    {
                                        value: 'Более 6 лет',
                                        children: 'Более 6 лет',
                                    },
                                ]}
                            />
                            <FormTextarea
                                size={'12'}
                                id={'description'}
                                value={this.props.description}
                                label={'Описание резюме'}
                                name={'description'}
                                required={true}
                            />
                        </FormItem>
                        <div>
                            <ButtonPrimary type={'submit'}>
                                Сохранить
                            </ButtonPrimary>
                        </div>
                    </Form>
                </div>
                <div className={'flex row g-16 mt-40'}>
                    <Button onClick={navigator.goBack}>Пропустить</Button>
                    <RenderWithCondition
                        condition={this.state.isNew}
                        onSuccess={
                            <ButtonRed
                                onClick={() => {
                                    this.deleteResume(
                                        this.props.postedByUserID,
                                    );
                                }}
                            >
                                Удалить
                            </ButtonRed>
                        }
                    />
                </div>
                <Footer />
            </div>
        );
    }
}

const UserWrapper = userConnect((state, props) => {
    return {
        id: state.id,
        postedByUserID: props.postedByUserID,
        isNew: props.isNew,
        ...props,
    };
})(ResumeSettings);

export default resumeConnect(state => ({
    ...state,
}))(UserWrapper);
