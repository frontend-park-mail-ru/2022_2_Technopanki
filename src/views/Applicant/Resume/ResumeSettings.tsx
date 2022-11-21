import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Form, { FormSectionType } from '../../../components/UI-kit/forms/Form';
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
        sections: [
            {
                fields: {
                    title: {
                        size: 8,
                        type: 'text',
                        placeholder: 'Название резюме',
                        label: 'Название резюме',
                        name: 'title',
                        required: true,
                        value: this.props.title,
                        validator: validateResumeTitle,
                        error: false,
                        errorMessage: RESUME_TITLE_ERROR,
                    },
                    description: {
                        size: 8,
                        type: 'textarea',
                        placeholder: 'О себе...',
                        label: 'О себе',
                        name: 'description',
                        required: true,
                        value: this.props.description,
                        validator: validateResumeDescription,
                        error: false,
                        errorMessage: RESUME_DESCRIPTION_ERROR,
                    },
                },
            },
            {
                fields: {
                    university: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Университет',
                        label: 'Университет',
                        name: 'university',
                        required: true,
                        value: this.props.university,
                    },
                    faculty: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Направление',
                        label: 'Направление',
                        name: 'faculty',
                        required: true,
                        value: this.props.faculty,
                    },
                    status: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Статус',
                        label: 'Статус',
                        name: 'status',
                        required: false,
                        value: this.props.status,
                    },
                },
            },
        ],
    };

    submitForm = (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        let sections = this.state.sections;
        let isValid = true;

        formData.forEach((value, key) => {
            sections.forEach(section => {
                if (section.fields[key]) {
                    if (
                        section.fields[key].validator &&
                        !section.fields[key].validator(value) &&
                        (section.fields[key].required || value)
                    ) {
                        section.fields[key].error = true;
                        isValid = false;
                    } else {
                        section.fields[key].error = false;
                    }
                    section.fields[key].value = value;
                    return;
                }
            });
        });

        if (!isValid) {
            this.setState(state => ({ ...state, sections: sections }));
            return;
        }

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
                    <form
                        key={'form'}
                        id={'profile_form'}
                        onSubmit={this.submitForm.bind(this)}
                        className={'col-12 col-md-9 column g-24'}
                    >
                        {/*<div key={'avatar'} className={'w-100'}>*/}
                        {/*    <AvatarSettings key={'avatar'} />*/}
                        {/*</div>*/}
                        {this.state.sections.map(section => (
                            <FormSection
                                key={'resume_form'}
                                fields={section.fields}
                            />
                        ))}
                        <div>
                            <ButtonPrimary type={'submit'}>
                                Сохранить
                            </ButtonPrimary>
                        </div>
                    </form>
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
                <Footer key={'footer'} />
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
