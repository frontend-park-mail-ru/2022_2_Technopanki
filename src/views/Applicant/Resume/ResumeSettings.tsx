import { Component } from '../../../../Reacts';
import Form, { FormSectionType } from '../../../components/UI-kit/forms/Form';
// import { AvatarSettings, Password, SocialNetworks } from '../../Employer/Profile/ProfileSettings';
import Header from '../../../components/UI-kit/header/Header';
import SettingsHat from '../../../components/hats/SettingsHat';
import CancelSaveButtons from '../../../components/CancelSaveButtons/CancelSaveButtons';
import Input, { InputPropsType } from '../../../components/UI-kit/forms/inputs/Input';
import Textarea from '../../../components/UI-kit/forms/inputs/Textarea';
import Chips from '../../../components/UI-kit/chips/Chips';
import { ProfileState } from '../../../store/profile/types';
import { resumeService } from '../../../services/resumeService';
import navigator from '../../../router/navigator';
import { vacancyService } from '../../../services/vacancyService';
import { ResumeState } from '../../../store/resume/type';
import FormSection from '../../../components/UI-kit/forms/FormSection';
import ButtonPrimary from '../../../components/UI-kit/buttons/ButtonPrimary';
import Button from '../../../components/UI-kit/buttons/Button';
import ButtonRed from '../../../components/UI-kit/buttons/ButtonRed';
import Footer from '../../../components/UI-kit/footer/Footer';
import { resumeConnect } from '../../../store';

class ResumeSettings extends Component<
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
    >{
    state = {
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
                    },
                    description: {
                        size: 8,
                        type: 'textarea',
                        placeholder: 'О себе...',
                        name: 'description',
                        required: true,
                        value: this.props.description,
                    },
                },
            },
            {
                fields: {
                    university: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Университет',
                        name: 'university',
                        required: true,
                        value: this.props.university,
                    },
                    faculty: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Направление',
                        name: 'faculty',
                        required: true,
                        value: this.props.faculty,
                    },
                    status: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Статус',
                        name: 'status',
                        required: false,
                        value: this.props.status,
                    }
                }
            }
        ]
    };

    submitForm = (e: SubmitEvent) => {
        e.preventDefault()
        const formData = new FormData(e.target);

        if (this.props.isNew) {
            resumeService
                .addResume(formData)
                .then(body => navigator.navigate('/resume/' + body.id));
        } else {
            resumeService
                .updateResume(this.props.id, formData)
                .then(() => {
                    navigator.goBack();
                })
                .catch(err => console.error(err))
        }
    };

    render() {
        return (
            <div
                className={'screen-responsive relative'}
            >
                <Header />
                <div class={'column g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={this.props.avatarSrc}
                            name={'Захар'}
                            surname={'Урванцев'}
                            description={'Студент МГТУ, разработчик и просто хороший человек'}
                            to={'/vacancy'}
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
                            <ButtonPrimary
                                type={'submit'}
                                onClick={navigator.goBack}
                            >
                                Сохранить
                            </ButtonPrimary>
                        </div>
                    </form>
                </div>
                <div className={'flex row g-16 mt-40'}>
                    <Button
                        onClick={navigator.goBack}
                    >
                        Пропустить
                    </Button>
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}

export default resumeConnect((state, props) => ({
    id: state.id,
    postedByUserID: state.postedByUserID,
    isNew: props.isNew,
}))(ResumeSettings);
