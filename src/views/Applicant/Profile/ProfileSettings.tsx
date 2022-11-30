import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Header from '../../../components/UI-kit/header/Header';
import ButtonPrimary from '../../../components/UI-kit/buttons/ButtonPrimary';
import Button from '../../../components/UI-kit/buttons/Button';
import SettingsHat from '../../../components/hats/SettingsHat';
import Form from '../../../components/UI-kit/forms/Form';
import FormInput from '../../../components/UI-kit/forms/formInputs/FormInput';
import FormItem from '../../../components/UI-kit/forms/FormItem';
import { InputPropsType } from '../../../components/UI-kit/forms/inputs/Input';
import {
    ApplicantProfileType,
    ProfileState,
} from '../../../store/profile/types';
import { dispatch, profileConnect, userConnect } from '../../../store';
import { employerProfileService } from '../../../services/employerProfileService';
import navigator from '../../../router/navigator';
import { applicantProfileService } from '../../../services/applicantService';
import Footer from '../../../components/UI-kit/footer/Footer';
import FormFileInput from '../../../components/UI-kit/forms/formInputs/FormFileInput';
import WorkExperienceInput from '../../../components/WorkExperienceInput';
import { authService, USER_TYPE } from '../../../services/auth/authService';
import { userActions } from '../../../store/user/actions';
import ButtonRed from '../../../components/UI-kit/buttons/ButtonRed';
import { profileActions } from '../../../store/profile/actions';
import {
    APPLICANT_PATHS,
    EMPLOYER_PATHS,
} from '../../../utils/routerConstants';
import { useValidation } from '../../../utils/validation/formValidation';
import {
    dateOfBirthValidation,
    emailValidation,
    fileFormatValidation,
    fileSizeValidation,
    locationValidation,
    nameLengthValidation,
    nameSymbolsValidation,
    phoneValidation,
    surnameLengthValidation,
    surnameSymbolsValidation,
} from './settingsValidators';
import { activateSuccess } from '../../../store/succeses/actions';
import { applicantActions } from '../../../store/applicant/actions';
import ErrorPopup from '../../../components/ErrorPopup/ErrorPopup';
import { activateError, deactivateError } from '../../../store/errors/actions';
import { VacancyUpdateError } from '../../../services/vacancy/types';

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
        dateOfBirth: [dateOfBirthValidation],
        location: [locationValidation],
        email: [emailValidation],
    });

    profileValidation = useValidation({
        name: [nameSymbolsValidation, nameLengthValidation],
        surname: [surnameSymbolsValidation, surnameLengthValidation],
        phone: [phoneValidation],
        dateOfBirth: [dateOfBirthValidation],
        location: [locationValidation],
        email: [emailValidation],
    });

    avatarValidation = useValidation({
        avatar: [fileSizeValidation, fileFormatValidation],
    });

    submitAvatar = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.avatarValidation.ok()) {
            return;
        }

        // @ts-ignore
        const image = document.querySelector('#avatar').files[0];
        const formDataImage = new FormData();
        formDataImage.append('avatar', image);

        try {
            const newImageSrc = await employerProfileService.updateProfileImg(
                this.props.id,
                formDataImage,
            );

            dispatch(userActions.updateAvatar(newImageSrc));
            navigator.navigate(APPLICANT_PATHS.PROFILE + this.props.id);
        } catch (e) {
            dispatch(activateError((e as VacancyUpdateError).error));
            setTimeout(() => dispatch(deactivateError()), 3000);
        }
    };

    submitForm = (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.profileValidation.ok()) {
            return;
        }

        const formData = new FormData(e.target as HTMLFormElement);

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
                navigator.navigate(APPLICANT_PATHS.PROFILE + this.props.id);
            })
            .catch(err => {
                console.error(err);
                dispatch(activateError((err as VacancyUpdateError).error));
                setTimeout(() => dispatch(deactivateError()), 3000);
            });
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
                <ErrorPopup />
                <div class={'column g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat creatorID={this.props.id} />
                    </div>
                    <h3 className={'col-12 mb-40'}>Настройки профиля</h3>
                    <Form onSubmit={this.submitAvatar}>
                        <FormFileInput
                            id={'avatar'}
                            label={'Загрузить новую фотографию'}
                            name={'avatar'}
                            size={'12'}
                            setError={this.avatarValidation.setError}
                            validation={this.avatarValidation.getValidation(
                                'avatar',
                            )}
                        />
                        <div>
                            <ButtonPrimary type={'submit'}>
                                Сохранить
                            </ButtonPrimary>
                        </div>
                    </Form>
                    <Form onSubmit={this.submitForm}>
                        <FormItem header={'О себе'}>
                            <FormInput
                                size={'4'}
                                id={'name'}
                                label={'Имя'}
                                type={'text'}
                                placeholder={'Иван'}
                                name={'name'}
                                value={this.props.name}
                                setError={this.profileValidation.setError}
                                required={true}
                                validation={this.profileValidation.getValidation(
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
                                setError={this.profileValidation.setError}
                                required={true}
                                validation={this.profileValidation.getValidation(
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
                                setError={this.profileValidation.setError}
                                validation={this.profileValidation.getValidation(
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
                                setError={this.profileValidation.setError}
                                validation={this.profileValidation.getValidation(
                                    'dateOfBirth',
                                )}
                                validationMode={'oninput'}
                            />
                            <WorkExperienceInput size={'4'} />
                            <FormInput
                                size={'4'}
                                id={'location'}
                                label={'Город проживания'}
                                type={'text'}
                                name={'location'}
                                value={this.props.location}
                                setError={this.profileValidation.setError}
                                validation={this.profileValidation.getValidation(
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
                                setError={this.profileValidation.setError}
                                validation={this.profileValidation.getValidation(
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
                                setError={this.profileValidation.setError}
                                validation={this.profileValidation.getValidation(
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
