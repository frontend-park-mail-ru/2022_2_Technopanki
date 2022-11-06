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
import { profileActions } from '../../store/profile/actions';

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
    const state = store.getState();

    return {
        previewSrc: state.previewSrc,
    };
})(AvatarSettingsComponent);

// todo: добавить валидацию на все компоненты
class ProfileSettingsComponent extends Component<{
    profile: EmployerProfile;
}> {
    state = {
        profile: {
            id: '',
            profileType: '',
            bannerSrc: '',
            avatarSrc: '',
            name: '',
            status: '',
            description: '',
            phone: '',
            email: '',
            location: '',
            size: '',
            fieldOfActivity: [],
        },
    };

    sections = [
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
                    value: () => this.state.profile.name,
                    error: false,
                    errorMessage: 'Ошибка в названии компании',
                },
                status: {
                    size: 4,
                    type: 'text',
                    placeholder: 'Hello world!',
                    label: 'Статус',
                    name: 'status',
                    required: true,
                    value: () => this.state.profile.status,
                },
                size: {
                    size: 4,
                    type: 'text',
                    placeholder: '10.000',
                    label: 'Размер компании',
                    name: 'size',
                    required: true,
                    value: () => this.state.profile.size,
                },
                phone: {
                    size: 4,
                    type: 'text',
                    placeholder: '+7 (999) 999-99-99',
                    label: 'Телефон',
                    name: 'phone',
                    required: true,
                    value: () => this.state.profile.phone,
                },
                email: {
                    size: 4,
                    type: 'text',
                    placeholder: 'example@mail.ru',
                    label: 'Email',
                    name: 'email',
                    required: true,
                    value: () => this.state.profile.email,
                },
                description: {
                    size: 12,
                    type: 'textarea',
                    placeholder: undefined,
                    label: 'Описание компании',
                    name: 'description',
                    required: true,
                    value: () => this.state.profile.description,
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
                    value: () => undefined,
                },
                repeatPassword: {
                    size: 4,
                    type: 'password',
                    placeholder: '********',
                    label: 'Повторите пароль',
                    name: 'repeatPassword',
                    value: () => undefined,
                },
            },
        },
    ];

    componentDidMount() {
        const employerID = location.pathname.split('/').at(-1);
        employerProfileService
            .getProfileData(employerID)
            .then(body => {
                this.setState(state => ({ ...state, profile: body }));
            })
            .catch(err => console.error(err));
    }

    submitForm = (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        console.log(this.sections);

        let sections = this.sections;
        let isValid = true;

        if (formData.get('name').length < 5) {
            sections.forEach(section => {
                if (section.fields.name) {
                    section.fields.name.error = true;
                    section.fields.name.errorMessage = 'Ошибка в названии';
                    isValid = false;
                }
            });
        }

        if (!isValid) {
            this.setState(state => state);
            return;
        }

        console.log(this.state.profile);
        employerProfileService
            .updateProfile(
                this.state.profile.id,
                this.state.profile.profileType,
                formData,
            )
            .then(() => {
                console.log('back');
                navigator.goBack();
            })
            .catch(err => console.error(err));
    };

    // TODO
    submitEvent = () => {
        this.rootDomRef
            ?.querySelector('form')
            ?.dispatchEvent(document.createEvent('submit'));
    };

    render() {
        console.log(this.sections);
        return (
            <div className={'screen-responsive relative hidden'}>
                <Header key={'header'} />
                <div key={'hat'} className={'columns g-24'}>
                    <div key={'hat'} className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={this.props.avatarSrc}
                            name={this.props.name}
                            surname={''}
                            status={this.props.status}
                            submit={this.submitEvent}
                        />
                    </div>
                    <h3 key={'header'} className={'col-12'}>
                        Настройки профиля
                    </h3>
                    <form
                        onSubmit={this.submitForm}
                        key={'form'}
                        className={'col-12 col-md-9 column g-24'}
                    >
                        {this.sections.map(section => (
                            <div
                                className={'columns g-16'}
                                key={section.header}
                            >
                                <h5 key={'header'} className={'col-12'}>
                                    {section.header}
                                </h5>
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
                                                    value={field?.value()}
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
                                                    value={field.value()}
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
                        <CancelSaveButtons
                            onCancel={() => navigator.goBack()}
                        />
                    </form>
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}

export default userConnect(store => ({ userID: store.getState().id }))(
    ProfileSettingsComponent,
);
