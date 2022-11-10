import { Component } from '../../../Reacts';
import Header from '../../components/UI-kit/header/Header';
import SettingsHat from '../../components/hats/SettingsHat';
import { InputPropsType } from '../../components/UI-kit/forms/inputs/Input';
import FileInput from '../../components/UI-kit/forms/inputs/FileInput';
import navigator from '../../router/navigator.tsx';
import Footer from '../../components/UI-kit/footer/Footer';
import { employerProfileService } from '../../services/employerProfileService';
import { EmployerProfile, ProfileState } from '../../store/profile/types';
import { dispatch, profileConnect, userConnect } from '../../store';
import {
    phoneValidation,
    validateCompanyName,
    validateEmail,
    validatePasswordSymbols,
} from '../../utils/validation/validation';
import {
    EMAIL_ERROR,
    NAME_SYMBOLS_ERROR,
    PASSWORD_REPEAT_ERROR,
    PASSWORD_SYMBOLS_ERROR,
} from '../../utils/validation/messages';
import FormSection from '../../components/UI-kit/forms/FormSection';
import { profileActions } from '../../store/profile/actions';
import { userActions } from '../../store/user/actions';
import { authService } from '../../services/authService';
import Button from '../../components/UI-kit/buttons/Button';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';
import ButtonRed from '../../components/UI-kit/buttons/ButtonRed';

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
                        type: 'number',
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
                        validator: phoneValidation,
                        required: true,
                        value: this.props.phone,
                        errorMessage:
                            'Номер телефона должен быть в формате: +7 (999) 999-99-99',
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
                        value: undefined,
                    },
                    repeatPassword: {
                        size: 4,
                        type: 'password',
                        placeholder: '********',
                        label: 'Повторите пароль',
                        name: 'repeatPassword',
                        errorMessage: PASSWORD_REPEAT_ERROR,
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
            this.state.sections[1].fields.password.value !==
            this.state.sections[1].fields.repeatPassword.value
        ) {
            this.state.sections[1].fields.repeatPassword.error = true;
            isValid = false;
        }

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
                    profileActions.updateFromFormData(
                        this.state.profile.id,
                        this.state.profile.profileType,
                        formData,
                    ),
                );
                dispatch(
                    userActions.updateName(formData.get('name') as string, ''),
                );
                navigator.navigate(`/employer/${this.props.id}`);
            })
            .catch(err => console.error(err));
    };

    getDataFromServer() {
        const employerID = location.pathname.split('/').at(-1);
        if (employerID !== this.props.id && employerID === this.props.userID) {
            employerProfileService.getProfileData(employerID).then(body => {
                dispatch(profileActions.update({ ...body, id: employerID }));
            });
        }
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
            <div className={'screen-responsive relative hidden'}>
                <Header key={'header'} />
                <div key={'hat'} className={'columns g-24'}>
                    <div key={'settings'} className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={this.props.avatarSrc}
                            name={this.props.name}
                            surname={''}
                            status={this.props.status}
                            postedByUserID={this.props.id}
                            submit={() =>
                                document
                                    .querySelector('#profile_form')
                                    .dispatchEvent(new Event('submit'))
                            }
                        />
                    </div>
                    <h3 key={'h'} className={'col-12'}>
                        Настройки профиля
                    </h3>
                    <form
                        key={'form'}
                        id={'profile_form'}
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
                        <div>
                            <ButtonPrimary type={'submit'}>
                                Сохранить
                            </ButtonPrimary>
                        </div>
                    </form>
                </div>
                <div className={'flex row g-16 mt-40'}>
                    <Button>Пропустить</Button>
                    <ButtonRed key={'logout'} onClick={this.logout}>
                        Выйти
                    </ButtonRed>
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}

const UserWrapper = userConnect((state, props) => {
    return { userID: state.id, ...props };
})(ProfileSettingsComponent);

export default profileConnect((state, props) => {
    return { ...state };
})(UserWrapper);
