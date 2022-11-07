import { Component } from '../../../Reacts';
import Header from '../../components/UI-kit/header/Header';
import SettingsHat from '../../components/hats/SettingsHat';
import Input, {
    InputPropsType,
} from '../../components/UI-kit/forms/inputs/Input';
import Form, { FormSectionType } from '../../components/UI-kit/forms/Form';
import CancelSaveButtons from '../../components/CancelSaveButtons/CancelSaveButtons';
import IconInput from '../../components/UI-kit/forms/inputs/IconInput';
import VKLogo from '../../static/icons/logos/VKColor.svg';
import TwitterLogo from '../../static/icons/logos/TwitterColor.svg';
import FacebookLogo from '../../static/icons/logos/FacebookColor.svg';
import TelegramLogo from '../../static/icons/logos/TelegramColor.svg';
import YouTubeLogo from '../../static/icons/logos/YouTubeColor.svg';
import InstagramLogo from '../../static/icons/logos/InstagramColor.svg';
import FileInput from '../../components/UI-kit/forms/inputs/FileInput';
import navigator from '../../router/navigator';
import Footer from '../../components/UI-kit/footer/Footer';
import { sendProfileImg } from '../../services/imageService';
import { employerProfileService } from '../../services/employerProfileService';
import { userStore } from '../../store/user/store';
import { defaultProfileState, profileStore } from '../../store/profile/store';
import { EmployerProfile, ProfileState } from '../../store/profile/types';
import {
    dispatch,
    errorsConnect,
    profileConnect,
    userConnect,
} from '../../store';
import Textarea from '../../components/UI-kit/forms/inputs/Textarea';
import ChipsInput from '../../components/UI-kit/forms/inputs/ChipsInput';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { activateError, deactivateError } from '../../store/errors/actions';
import {
    validateCompanyName,
    validateEmail,
    validateNameSymbols,
    validatePasswordSymbols,
} from '../../utils/validation/validation';
import {
    EMAIL_ERROR,
    NAME_SYMBOLS_ERROR,
    PASSWORD_SYMBOLS_ERROR,
} from '../../utils/validation/messages';
import FormSection from '../../components/UI-kit/forms/FormSection';
import { profileActions } from '../../store/profile/actions';
import RenderWithCondition from '../../components/RenderWithCondition';
import { userActions } from '../../store/user/actions';
import { authService } from '../../services/authService';
import Button from '../../components/UI-kit/buttons/Button';

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

const AvatarSettings = profileConnect(state => {
    return {
        previewSrc: state.previewSrc,
    };
})(AvatarSettingsComponent);

// todo: добавить валидацию на все компоненты
class ProfileSettingsComponent extends Component<
    ProfileState & { userID: string },
    {
        profile: EmployerProfile;
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
                header: 'О компании',
                fields: {
                    name: {
                        size: 8,
                        type: 'text',
                        placeholder: 'Company name',
                        label: 'Название компании',
                        name: 'name',
                        required: true,
                        value: this.props.name,
                        validator: validateCompanyName,
                        error: false,
                        errorMessage: NAME_SYMBOLS_ERROR,
                    },
                    status: {
                        size: 4,
                        type: 'text',
                        placeholder: 'Hello world!',
                        label: 'Статус',
                        name: 'status',
                        required: true,
                        value: this.props.status,
                    },
                    size: {
                        size: 4,
                        type: 'text',
                        placeholder: '10.000',
                        label: 'Размер компании',
                        name: 'size',
                        required: true,
                        value: this.props.size,
                    },
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
                    description: {
                        size: 12,
                        type: 'textarea',
                        placeholder: undefined,
                        label: 'Описание компании',
                        name: 'description',
                        required: true,
                        value: this.props.description,
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
                        !section.fields[key].validator(value) &&
                        (section.fields[key].required ||
                            section.fields[key].value)
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

        employerProfileService
            .updateProfileImg(this.state.profile.id, formData)
            .then(() => console.log('send image to server'));

        employerProfileService
            .updateProfile(
                this.state.profile.id,
                this.state.profile.profileType,
                formData,
            )
            .then(() => {
                dispatch(
                    userActions.updateName(formData.get('name') as string, ''),
                );
                navigator.goBack();
            })
            .catch(err => console.error(err));
    };

    getDataFromServer() {
        const employerID = location.pathname.split('/').at(-1);
        employerProfileService.getProfileData(employerID).then(body => {
            dispatch(profileActions.update({ ...body, id: employerID }));
        });
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    componentDidUpdate() {
        console.log('BEFORE PROFILE STATE: ', profileStore.getState());
        console.log('update', this.props, this);
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
        console.log('ON RENDER PROPS: ', this.props);
        return (
            <div className={'screen-responsive relative hidden'}>
                <Header key={'header'} />
                <div key={'hat'} className={'columns g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={this.props.avatarSrc}
                            name={this.props.name}
                            surname={''}
                            status={this.props.status}
                            submit={this.submitEvent}
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки профиля</h3>
                    <form
                        onSubmit={this.submitForm.bind(this)}
                        className={'col-12 col-md-9 column g-24'}
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
                        <CancelSaveButtons
                            key={'buttons'}
                            onCancel={() =>
                                navigator.navigate(`/employer/${this.props.id}`)
                            }
                        />
                    </form>
                </div>
                <Button onClick={this.logout}>Выйти</Button>
                <Footer key={'footer'} />
            </div>
        );
    }
}

const UserWrapper = userConnect((state, props) => {
    return { userID: state.id, ...props };
})(ProfileSettingsComponent);

export default profileConnect((state, props) => {
    console.log('called settings connect');
    return { ...state };
})(UserWrapper);
