import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Header from '../../../components/UI-kit/header/Header';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import ButtonIcon from '../../../components/UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../../static/icons/phone.svg';
import MailIcon from '../../../static/icons/mail.svg';
import ButtonPrimary from '../../../components/UI-kit/buttons/ButtonPrimary';
import Link from '../../../components/Link/Link';
import Button from '../../../components/UI-kit/buttons/Button';
import SettingsHat from '../../../components/hats/SettingsHat';
// import ProfileSettings, { AvatarSettings, Password, SocialNetworks } from '../../Employer/ProfileSettings';
import Form, { FormSectionType } from '../../../components/UI-kit/forms/Form';
import Input, {
    InputPropsType,
} from '../../../components/UI-kit/forms/inputs/Input';
import CancelSaveButtons from '../../../components/CancelSaveButtons/CancelSaveButtons';
import IconInput from '../../../components/UI-kit/forms/inputs/IconInput';
// import Location from '../../../static/icons/location_input.svg'
import styles from './profileSettings.module.scss';
import ApplicantProfile from './Profile';
import ProfileSettings from '../../Employer/ProfileSettings';
import {
    ApplicantProfileType,
    EmployerProfile,
    ProfileState,
} from '../../../store/profile/types';
import {
    dispatch,
    errorsConnect,
    profileConnect,
    userConnect,
} from '../../../store';
import {
    phoneValidation,
    validateEmail,
    validateNameSymbols,
    validatePasswordSymbols,
} from '../../../utils/validation/validation';
import {
    EMAIL_ERROR,
    NAME_SYMBOLS_ERROR,
    PASSWORD_SYMBOLS_ERROR,
    PHONE_ERROR,
} from '../../../utils/validation/messages';
import { employerProfileService } from '../../../services/employerProfileService';
import navigator from '../../../router/navigator';
import { applicantProfileService } from '../../../services/applicantService';
import Textarea from '../../../components/UI-kit/forms/inputs/Textarea';
import Footer from '../../../components/UI-kit/footer/Footer';
import FileInput from '../../../components/UI-kit/forms/inputs/FileInput';
import { authService } from '../../../services/authService';
import { userActions } from '../../../store/user/actions';
import ButtonRed from '../../../components/UI-kit/buttons/ButtonRed';
import { profileActions } from '../../../store/profile/actions';
import FormSection from '../../../components/UI-kit/forms/FormSection';
import { APPLICANT_PATHS } from '../../../utils/routerConstants';

class AvatarSettingsComponent extends ReactsComponent<
    { previewSrc: string },
    { previewSrc: string }
> {
    setPreview = (event: InputEvent) => {
        // @ts-ignore
        const [file] = event.target.files;
        const fileUrl = URL.createObjectURL(file);

        this.setState(state => ({ ...state, previewSrc: fileUrl }));
    };

    state = {
        previewSrc: this.props.previewSrc,
    };

    render() {
        return (
            <div key={'avatar'} className={'columns g-16'}>
                <div key={'preview'} className={'col-12 col-md-4'}>
                    <img
                        height={64}
                        width={64}
                        id={'preview_img'}
                        alt={'preview'}
                        src={this.state.previewSrc}
                    />
                </div>
                <div key={'input'} className={'col-12 col-md-4'}>
                    <FileInput
                        id={'avatar'}
                        label={'Загрузить новую фотогрфию'}
                        onUpload={this.setPreview}
                    />
                </div>
            </div>
        );
    }
}

const AvatarSettings = profileConnect(store => {
    return {
        previewSrc: store.previewSrc,
    };
})(AvatarSettingsComponent);

class ApplicantSettings extends ReactsComponent<
    ProfileState,
    {
        profile: ApplicantProfileType;
        sections: {
            header: string;
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
        profile: { ...this.props },
        sections: [
            {
                header: 'О себе',
                fields: {
                    name: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Имя',
                        label: 'Имя',
                        name: 'name',
                        required: true,
                        value: this.props.name,
                        validator: validateNameSymbols,
                        error: false,
                        errorMessage: NAME_SYMBOLS_ERROR,
                    },
                    surname: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Фамилия',
                        label: 'Фамилия',
                        name: 'surname',
                        required: true,
                        value: this.props.surname,
                        validator: validateNameSymbols,
                        error: false,
                        errorMessage: NAME_SYMBOLS_ERROR,
                    },
                },
            },
            {
                header: '',
                fields: {
                    dateOfBirth: {
                        size: 4,
                        type: 'date',
                        placeholder: '',
                        label: 'Дата рождения',
                        name: 'dateOfBirth',
                        required: false,
                        value: `${
                            this.props.dateOfBirth
                                ? this.props.dateOfBirth.slice(0, 10)
                                : ''
                        }`,
                    },
                    location: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Город',
                        label: 'Город проживания',
                        name: 'location',
                        required: true,
                        value: this.props.location,
                    },
                    status: {
                        size: 8,
                        type: 'text',
                        placeholder: 'Статус',
                        label: 'Статус',
                        name: 'status',
                        required: true,
                        value: this.props.status,
                    },
                },
            },
            {
                header: 'Контактные данные',
                fields: {
                    phone: {
                        size: 4,
                        type: 'text',
                        placeholder: '+7 (999) 999-99-99',
                        label: 'Телефон',
                        name: 'phone',
                        required: false,
                        value: this.props.phone,
                        validator: phoneValidation,
                        errorMessage: PHONE_ERROR,
                    },
                    email: {
                        size: 4,
                        type: 'text',
                        placeholder: 'example@mail.ru',
                        label: 'Email',
                        name: 'email',
                        required: true,
                        value: this.props.email,
                        validator: validateEmail,
                        error: false,
                        errorMessage: EMAIL_ERROR,
                    },
                },
            },
            {
                header: 'Пароль',
                fields: {
                    password: {
                        size: 4,
                        type: 'password',
                        placeholder: '********',
                        label: 'Новый пароль',
                        name: 'password',
                        validator: validatePasswordSymbols,
                        error: false,
                        errorMessage: PASSWORD_SYMBOLS_ERROR,
                        value: undefined,
                    },
                    repeatPassword: {
                        size: 4,
                        type: 'password',
                        placeholder: '********',
                        label: 'Повторите пароль',
                        name: 'repeatPassword',
                        value: undefined,
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

        if (
            this.state.sections[3].fields.password.value !==
            this.state.sections[3].fields.repeatPassword.value
        ) {
            this.state.sections[3].fields.repeatPassword.error = true;
            isValid = false;
        }

        if (!isValid) {
            this.setState(state => ({ ...state, sections: sections }));
            return;
        }

        const applicantID = location.pathname.split('/').at(-1);

        const image = document.querySelector('#avatar').files[0];
        const formDataImage = new FormData();
        formDataImage.append('avatar', image);
        employerProfileService
            .updateProfileImg(applicantID, formDataImage)
            .then(body => userActions.updateAvatar(body.image));

        applicantProfileService
            .updateProfile(
                this.state.profile.id,
                this.state.profile.profileType,
                formData,
            )
            .then(body => {
                dispatch(
                    userActions.updateName(
                        formData.get('name') as string,
                        formData.get('surname') as string,
                    ),
                );
                setTimeout(
                    () =>
                        navigator.navigate(
                            APPLICANT_PATHS.PROFILE + this.props.id,
                        ),
                    750,
                );
            })
            .catch(err => console.error(err));
    };

    getDataFromServer() {
        const applicantID = location.pathname.split('/').at(-1);
        applicantProfileService.getApplicantData(applicantID).then(body => {
            dispatch(profileActions.update({ ...body, id: applicantID }));
        });
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    logout = () => {
        authService
            .logout()
            .then(() => {
                dispatch(userActions.LOGOUT());
                navigator.navigate('/');
            })
            .catch(err => console.error(err));
    };

    render() {
        return (
            <div className={'screen-responsive relative'}>
                <Header />
                <div class={'column g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat
                            creatorID={this.props.id}
                            submit={() =>
                                document
                                    .querySelector('#profile_form')
                                    .dispatchEvent(new Event('submit'))
                            }
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки профиля</h3>
                    <form
                        onSubmit={this.submitForm.bind(this)}
                        id={'profile_form'}
                        key={'form'}
                        className={'col-12 col-md-4 column g-24'}
                    >
                        <div key={'avatar'} className={'w-100'}>
                            <AvatarSettings key={'avatar'} />
                        </div>
                        {this.state.sections.map(section => (
                            <FormSection
                                key={section.header}
                                header={section.header}
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
                    <ButtonRed key={'logout'} onClick={this.logout}>
                        Выйти
                    </ButtonRed>
                </div>
                <Footer />
            </div>
        );
    }
}

const UserWrapper = userConnect((state, props) => {
    return { userID: state.id, ...props };
})(ApplicantSettings);

export default profileConnect((state, props) => {
    return {
        ...state,
    };
})(UserWrapper);
