import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Header from '../../../components/UI-kit/header/Header';
import SettingsHat from '../../../components/hats/SettingsHat';
import Input, {
    InputPropsType,
} from '../../../components/UI-kit/forms/inputs/Input';
import { resumeService } from '../../../services/resumeService';
import navigator from '../../../router/navigator';
import { vacancyService } from '../../../services/vacancyService';
import { ResumeState } from '../../../store/resume/type';
import FormSection from '../../../components/UI-kit/forms/FormSection';
import ButtonPrimary from '../../../components/UI-kit/buttons/ButtonPrimary';
import Button from '../../../components/UI-kit/buttons/Button';
import ButtonRed from '../../../components/UI-kit/buttons/ButtonRed';
import Footer from '../../../components/UI-kit/footer/Footer';
import { dispatch, resumeConnect, userConnect } from '../../../store';
import { resumeActions } from '../../../store/resume/actions';
import {
    validateResumeDescription,
    validateResumeTitle,
} from '../../../utils/validation/validation';
import {
    RESUME_DESCRIPTION_ERROR,
    RESUME_TITLE_ERROR,
} from '../../../utils/validation/messages';
import { SERVER_URLS } from '../../../utils/networkConstants';
import Form from '../../../components/UI-kit/forms/Form';
import FormInputGroup from '../../../components/UI-kit/forms/formInputs/FormInputGroup';
import FormInput from '../../../components/UI-kit/forms/formInputs/FormInput';
import FormTextarea from '../../../components/UI-kit/forms/formInputs/FormTextarea';
import FormItem from '../../../components/UI-kit/forms/FormItem';
import { useValidation } from '../../../utils/validation/formValidation';
import {
    validateTitleLength,
    validateTitleSymbols,
} from '../../Vacancy/settingsValidators';

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
        const formData = new FormData(e.target);
        const resumeID = location.pathname.split('/').at(-1);

        if (this.state.isNew) {
            resumeService
                .addResume(this.props.postedByUserID, formData)
                .then(body => navigator.navigate('/resume/' + body.id));
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
                        <SettingsHat
                            creatorID={this.props.postedByUserID}
                            submit={() =>
                                document
                                    .querySelector('#profile_form')
                                    .dispatchEvent(new Event('submit'))
                            }
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки резюме</h3>
                    <Form onSubmit={this.submitForm}>
                        <FormItem header={'О себе'}>
                            <FormInput
                                size={'12'}
                                id={'title'}
                                label={'Заголовок вакансии'}
                                type={'text'}
                                name={'title'}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'title',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormTextarea
                                size={'12'}
                                id={'description'}
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
                    {this.state.isNew ? (
                        <div />
                    ) : (
                        <ButtonRed
                            key={'removal'}
                            onClick={() => {
                                this.deleteResume(this.props.postedByUserID);
                            }}
                        >
                            Удалить
                        </ButtonRed>
                    )}
                </div>
                <Footer />
            </div>
        );
    }
}

const UserWrapper = userConnect((state, props) => {
    return {
        id: state.id,
        postedByUserID:
            props.postedByUserID !== '' ? props.postedByUserID : state.id,
        isNew: props.isNew,
        ...props,
    };
})(ResumeSettings);

export default resumeConnect((state, props) => {
    return {
        ...state,
    };
})(UserWrapper);
