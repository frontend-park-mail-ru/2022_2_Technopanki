import { Component } from '../../../../Reacts';
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
    ProfileState,
} from '../../../store/profile/types';
import { dispatch, errorsConnect, profileConnect } from '../../../store';
import {
    validateEmail,
    validateNameSymbols,
    validatePasswordSymbols,
} from '../../../utils/validation/validation';
import {
    EMAIL_ERROR,
    NAME_SYMBOLS_ERROR,
    PASSWORD_SYMBOLS_ERROR,
} from '../../../utils/validation/messages';
import { employerProfileService } from '../../../services/employerProfileService';
import navigator from '../../../router/navigator';
import { applicantProfileService } from '../../../services/applicantService';
import Textarea from '../../../components/UI-kit/forms/inputs/Textarea';
import Footer from '../../../components/UI-kit/footer/Footer';
import FileInput from '../../../components/UI-kit/forms/inputs/FileInput';
import { authService } from '../../../services/authService';
import { userActions } from '../../../store/user/actions';

class AvatarSettingsComponent extends Component<
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
                <div key={'preview'} className={'col-12 col-md-3'}>
                    <img
                        height={64}
                        width={64}
                        id={'preview_img'}
                        alt={'preview'}
                        src={this.state.previewSrc}
                    />
                </div>
                <div key={'input'} className={'col-12 col-md-9'}>
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
        previewSrc: state.previewSrc,
    };
})(AvatarSettingsComponent);

class ApplicantSettings extends Component<
    ProfileState,
    {
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
        profile: this.props,
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
                        required: true,
                        value: this.props.dateOfBirth,
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
                        required: true,
                        value: this.props.phone,
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
                    },
                    repeatPassword: {
                        size: 4,
                        type: 'password',
                        placeholder: '********',
                        label: 'Повторите пароль',
                        name: 'repeatPassword',
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
                        !section.fields[key].validator(value)
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

        console.log(this.props);
        applicantProfileService
            .updateProfile(this.props.id, this.props.profileType, formData)
            .then(() => {
                console.log('back');
                navigator.goBack();
            })
            .catch(err => console.error(err));
    };

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
                            imgSrc={this.props.avatarSrc}
                            name={this.props.name}
                            surname={this.props.surname}
                            status={this.props.status}
                            submit={''}
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки профиля</h3>
                    <form
                        onSubmit={this.submitForm}
                        key={'form'}
                        className={'col-12 col-md-4 column g-24'}
                    >
                        {this.state.sections.map(section => (
                            <div
                                className={'columns g-16'}
                                key={section.header}
                            >
                                {section.header.length > 0 ? (
                                    <h5 key={'header'} className={'col-12'}>
                                        {section.header}
                                    </h5>
                                ) : (
                                    <h5
                                        key={'header'}
                                        className={'col-12 mx-0'}
                                    >
                                        {section.header}
                                    </h5>
                                )}
                                {Object.entries(section.fields).map(
                                    ([id, field]) => (
                                        <div
                                            key={id}
                                            className={`col-12 col-md-${field.size.toString()}`}
                                        >
                                            {field.type === 'textarea' ? (
                                                <Textarea
                                                    key={id}
                                                    id={id}
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    value={field.value}
                                                    label={field.label}
                                                    name={field.name}
                                                />
                                            ) : (
                                                <Input
                                                    key={id}
                                                    id={id}
                                                    type={field.type}
                                                    placeholder={
                                                        field.placeholder
                                                    }
                                                    label={field.label}
                                                    name={field.name}
                                                    value={field?.value}
                                                    error={field.error}
                                                    errorMessage={
                                                        field.errorMessage
                                                    }
                                                />
                                            )}
                                        </div>
                                    ),
                                )}
                            </div>
                        ))}
                    </form>
                </div>
                <Button onClick={this.logout}>Выйти</Button>
                <CancelSaveButtons onCancel={() => navigator.goBack()} />
                <Footer key={'footer'} />
            </div>
        );
    }
}

export default profileConnect((state, props) => {
    return {
        ...state,
    };
})(ApplicantSettings);
