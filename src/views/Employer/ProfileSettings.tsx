import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Header from '../../components/UI-kit/header/Header';
import SettingsHat from '../../components/hats/SettingsHat';
import { InputPropsType } from '../../components/UI-kit/forms/inputs/Input';
import FileInput from '../../components/UI-kit/forms/inputs/FileInput';
import navigator from '../../router/navigator';
import Footer from '../../components/UI-kit/footer/Footer';
import { employerProfileService } from '../../services/employerProfileService';
import { EmployerProfile, ProfileState } from '../../store/profile/types';
import { dispatch, profileConnect, userConnect } from '../../store';
import {
    phoneValidation,
    validateCompanyName,
    validateEmail,
    validatePasswordLength,
    validatePasswordSymbols,
    validateStatusSymbols,
} from '../../utils/validation/validation';
import {
    MAX_PHOTO_SIZE,
    PASSWORD_LENGTH_ERROR,
    PASSWORD_SYMBOLS_ERROR,
} from '../../utils/validation/messages';
import { profileActions } from '../../store/profile/actions';
import { userActions } from '../../store/user/actions';
import { authService } from '../../services/authService';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';
import ButtonRed from '../../components/UI-kit/buttons/ButtonRed';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import SuccessPopup from '../../components/SuccessPopup/SuccessPopup';
import { activateError, deactivateError } from '../../store/errors/actions';
import {
    activateSuccess,
    deactivateSuccess,
} from '../../store/succeses/actions';
import { EMPLOYER_PATHS } from '../../utils/routerConstants';
import Form from '../../components/UI-kit/forms/Form';
import FormItem from '../../components/UI-kit/forms/FormItem';
import FormInput from '../../components/UI-kit/forms/formInputs/FormInput';
import FormTextarea from '../../components/UI-kit/forms/formInputs/FormTextarea';
import FormInputGroup from '../../components/UI-kit/forms/formInputs/FormInputGroup';
import { useValidation } from '../../utils/validation/formValidation';
import {
    locationValidation,
    nameLengthValidation,
    nameSymbolsValidation,
    passwordLengthValidation,
    passwordSymbolsValidation,
    sloganLengthValidation,
    sloganSymbolsValidation,
    sloganZeroLengthValidation,
    validateSizeLength,
    validateSizeSymbols,
} from './settingsValidators';

class AvatarSettingsComponent extends ReactsComponent<
    { previewSrc: string },
    { previewSrc: string }
> {
    setPreview = (event: InputEvent) => {
        // @ts-ignore
        const [file]: [File] = event.target.files;
        if (file.size > MAX_PHOTO_SIZE) {
            dispatch(
                activateError(
                    'Размер файл слишком большой',
                    'Размер файла не должен превышать 1MB',
                ),
            );
            setTimeout(() => dispatch(deactivateError()), 3000);
            return;
        }
        const fileUrl = URL.createObjectURL(file);

        this.setState(state => ({ ...state, previewSrc: fileUrl }));
    };

    state = {
        previewSrc: this.props.previewSrc,
    };

    render() {
        return (
            <div className={'columns g-16'}>
                <div className={'col-12 col-md-3'}>
                    <img
                        height={64}
                        width={64}
                        id={'preview_img'}
                        alt={'preview'}
                        src={this.state.previewSrc}
                    />
                </div>
                <div className={'col-12 col-md-9'}>
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
        previewSrc: state.avatarSrc,
    };
})(AvatarSettingsComponent);

class ProfileSettingsComponent extends ReactsComponent<
    ProfileState & { userID: string },
    {
        profile: EmployerProfile;
        error: boolean;
    }
> {
    state = {
        profile: { ...this.props },
    };

    validation = useValidation({
        slogan: [
            sloganLengthValidation,
            sloganZeroLengthValidation,
            sloganSymbolsValidation,
        ],
        name: [nameSymbolsValidation, nameLengthValidation],
        password: [passwordLengthValidation, passwordSymbolsValidation],
        location: [locationValidation],
        size: [validateSizeSymbols, validateSizeLength],
    });

    submitForm = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.validation.ok()) {
            return;
        }

        const formData = new FormData(e.target);

        const image = document.querySelector('#avatar').files[0];
        const formDataImage = new FormData();
        formDataImage.append('avatar', image);

        try {
            const newImage = await employerProfileService.updateProfileImg(
                this.state.profile.id,
                formDataImage,
            );

            await employerProfileService.updateProfile(
                this.props.id,
                'employer',
                formData,
            );

            dispatch(
                profileActions.updateFromFormData(
                    this.props.id,
                    'employer',
                    newImage,
                    formData,
                ),
            );
            dispatch(
                userActions.updateName(formData.get('name') as string, ''),
            );
            dispatch(activateSuccess('Данные профиля успешно изменены!', ''));
            setTimeout(() => dispatch(deactivateSuccess()), 3000);
            console.log(EMPLOYER_PATHS.PROFILE + this.props.id);
            navigator.navigate(EMPLOYER_PATHS.PROFILE + this.props.id);
        } catch (e) {
            console.error(e);
            // TODO: проставить ошибку с сервера
            dispatch(
                activateError(
                    'Упс... что-то пошло не так',
                    'Пожалуйста, повторите попытку',
                ),
            );
            setTimeout(() => dispatch(deactivateError()), 3000);
        }
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

    shouldUpdateState(nextState: {
        profile: EmployerProfile;
        error: boolean;
    }): boolean {
        return super.shouldUpdateState(nextState);
    }
    // TODO: перенести logout в header

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
                <ErrorPopup />
                <SuccessPopup />
                <Header />
                <div className={'columns g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={this.props.avatarSrc}
                            name={this.props.name}
                            surname={''}
                            status={this.props.status}
                            postedByUserID={this.props.id}
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки профиля</h3>
                    <Form onSubmit={this.submitForm}>
                        <AvatarSettings />
                        <FormItem header={'О пользователе'}>
                            <FormInput
                                size={'12'}
                                id={'name'}
                                label={'Название компании'}
                                value={this.props.name}
                                type={'text'}
                                placeholder={'Название компании'}
                                name={'name'}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'name',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'status'}
                                label={'Слоган'}
                                value={this.props.status}
                                type={'text'}
                                placeholder={'Привет мир!'}
                                name={'Слоган'}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'slogan',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'location'}
                                label={'Местоположение'}
                                value={this.props.location}
                                type={'text'}
                                placeholder={'Местоположение компании'}
                                name={'location'}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'location',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                name={'size'}
                                id={'size'}
                                label={'Размер компании'}
                                value={this.props.location}
                                type={'text'}
                                placeholder={'10.000'}
                                name={'size'}
                                setError={this.validation.setError}
                                validation={this.validation.getValidation(
                                    'size',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormTextarea
                                size={'12'}
                                id={'description'}
                                label={'Описание'}
                                value={this.props.description}
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
                    <hr className={'col-12'} />
                    <Form onSubmit={() => console.log('password change')}>
                        <FormItem header={'Смена пароля'}>
                            <FormInput
                                size={'4'}
                                id={'password'}
                                label={'Новый пароль'}
                                type={'password'}
                                placeholder={'********'}
                                name={'password'}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'password',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                id={'repeatPassword'}
                                label={'Повторите новый пароль'}
                                type={'password'}
                                placeholder={'********'}
                                name={'repeatPassword'}
                                setError={this.validation.setError}
                                required={true}
                                validation={this.validation.getValidation(
                                    'password',
                                )}
                                validationMode={'oninput'}
                            />
                        </FormItem>
                        <div>
                            <ButtonRed type={'submit'}>
                                Сохранить пароль
                            </ButtonRed>
                        </div>
                    </Form>
                    <p
                        className={'col-12 cursor-pointer'}
                        onClick={() => navigator.goBack()}
                    >
                        Вернуться назад
                    </p>
                </div>
                <Footer />
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
