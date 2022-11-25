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
import Form from '../../../components/UI-kit/forms/Form';
import FormInput from '../../../components/UI-kit/forms/formInputs/FormInput';
import FormItem from '../../../components/UI-kit/forms/FormItem';
// import ProfileSettings, { AvatarSettings, Password, SocialNetworks } from '../../Employer/ProfileSettings';
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
import Footer from '../../../components/UI-kit/footer/Footer';
import FormFileInput from '../../../components/UI-kit/forms/formInputs/FormFileInput';
import { authService } from '../../../services/authService';
import { userActions } from '../../../store/user/actions';
import ButtonRed from '../../../components/UI-kit/buttons/ButtonRed';
import { profileActions } from '../../../store/profile/actions';
import { APPLICANT_PATHS } from '../../../utils/routerConstants';
import { useValidation } from '../../../utils/validation/formValidation';
import {
    fileFormatValidation,
    fileSizeValidation,
    nameLengthValidation,
    nameSymbolsValidation,
    phoneValidation,
    surnameLengthValidation,
    surnameSymbolsValidation,
} from './settingsValidators';

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
    };

    validation = useValidation({
        name: [nameSymbolsValidation, nameLengthValidation],
        surname: [surnameSymbolsValidation, surnameLengthValidation],
        phone: [phoneValidation],
        avatar: [fileSizeValidation, fileFormatValidation],
    });

    submitForm = (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.validation.ok()) {
            return;
        }

        const formData = new FormData(e.target as HTMLFormElement);

        const applicantID = location.pathname.split('/').at(-1);

        // @ts-ignore
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
                        <SettingsHat creatorID={this.props.id} />
                    </div>
                    <h3 className={'col-12'}>Настройки профиля</h3>
                    <Form onSubmit={this.submitForm}>
                        <FormFileInput
                            id={'avatar'}
                            label={'Загрузить новую фотографию'}
                            name={'avatar'}
                            size={'12'}
                            setError={this.validation.setError}
                            validation={this.validation.getValidation('avatar')}
                        />
                        <FormItem header={'О себе'}>
                            <FormInput
                                size={'4'}
                                id={'name'}
                                label={'Имя'}
                                type={'text'}
                                placeholder={'Иван'}
                                name={'name'}
                                value={this.props.name}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'name',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'surname'}
                                label={'Фамилия'}
                                type={'text'}
                                placeholder={'Иванов'}
                                name={'surname'}
                                value={this.props.surname}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'surname',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'status'}
                                label={'Статус'}
                                type={'text'}
                                name={'status'}
                                value={this.props.status}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'status',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'dateOfBirth'}
                                label={'Дата рождения'}
                                type={'date'}
                                placeholder={'Иванов'}
                                name={'dateOfBirth'}
                                value={this.props.dateOfBirth}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'dateOfBirth',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'experience'}
                                label={'Опыт работы'}
                                type={'text'}
                                placeholder={'5 лет'}
                                name={'experience'}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'experience',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'location'}
                                label={'Город проживания'}
                                type={'text'}
                                name={'location'}
                                value={this.props.location}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'location',
                                )}
                                validationMode={'oninput'}
                            />
                        </FormItem>
                        <FormItem header={'Контактные данные'}>
                            <FormInput
                                size={'4'}
                                id={'phone'}
                                label={'Телефон'}
                                type={'text'}
                                name={'phone'}
                                value={this.props.phone}
                                placeholder={'+7 (999) 999-99-99'}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'phone',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'email'}
                                label={'Телефон'}
                                type={'text'}
                                name={'email'}
                                value={this.props.email}
                                placeholder={'example@mail.ru'}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'email',
                                )}
                                validationMode={'oninput'}
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
                    <ButtonRed onClick={this.logout}>Выйти</ButtonRed>
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
