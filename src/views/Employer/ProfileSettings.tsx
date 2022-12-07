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
import { profileActions } from '../../store/profile/actions';
import { userActions } from '../../store/user/actions';
import { authService, USER_TYPE } from '../../services/auth/authService';
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
import FormFileInput from '../../components/UI-kit/forms/formInputs/FormFileInput';
import {
    businessTypeValidation,
    fileFormatValidation,
    fileSizeValidation,
    locationValidation,
    nameLengthValidation,
    nameSymbolsValidation,
    sloganLengthValidation,
    sloganSymbolsValidation,
    sloganZeroLengthValidation,
    validateSizeLength,
    validateSizeSymbols,
} from './settingsValidators';
import { VacancyUpdateError } from '../../services/vacancy/types';
import {
    passwordLengthValidator,
    passwordSymbolsValidator,
} from '../../utils/validation/commonValidators';
import { useValidation } from '../../utils/validation/formValidation';
import FormCheckbox from '../../components/UI-kit/forms/formInputs/FormCheckbox';

class ProfileSettingsComponent extends ReactsComponent<
    ProfileState & { userID: string; twoFactor: boolean },
    {
        profile: EmployerProfile;
        error: boolean;
    }
> {
    state = {
        profile: { ...this.props },
    };

    profileFieldsValidation = useValidation({
        slogan: [
            sloganLengthValidation,
            sloganZeroLengthValidation,
            sloganSymbolsValidation,
        ],
        name: [nameSymbolsValidation, nameLengthValidation],
        password: [passwordLengthValidator, passwordSymbolsValidator],
        location: [locationValidation],
        size: [validateSizeSymbols, validateSizeLength],
        businessType: [businessTypeValidation],
    });

    avatarValidation = useValidation({
        avatar: [fileSizeValidation, fileFormatValidation],
    });

    updateProfile = (id: string, formData: FormData) => {
        dispatch(
            profileActions.updateFromFormData(id, USER_TYPE.EMPLOYER, formData),
        );
        dispatch(userActions.updateName(formData.get('name') as string, ''));
        dispatch(activateSuccess('Данные профиля успешно изменены!', ''));
    };

    submitAvatar = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.avatarValidation.ok()) {
            return;
        }
        // @ts-ignore
        const image = document.querySelector('#avatar').files[0];
        const formData = new FormData();
        formData.append('avatar', image);

        try {
            const newImageSrc = await employerProfileService.updateProfileImg(
                this.props.id,
                formData,
            );

            dispatch(userActions.updateAvatar(newImageSrc));
            dispatch(profileActions.updateProfileAvatar(newImageSrc));
            navigator.navigate(EMPLOYER_PATHS.PROFILE + this.props.id);
        } catch (e) {
            dispatch(activateError((e as VacancyUpdateError).error));
            setTimeout(() => dispatch(deactivateError()), 3000);
        }
    };

    submitForm = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.profileFieldsValidation.ok()) {
            return;
        }

        const formData = new FormData(e.target as HTMLFormElement);

        try {
            await employerProfileService.updateProfile(
                this.props.id,
                USER_TYPE.EMPLOYER,
                formData,
            );

            this.updateProfile(this.props.id, formData);
            setTimeout(() => dispatch(deactivateSuccess()), 3000);
            navigator.navigate(EMPLOYER_PATHS.PROFILE + this.props.id);
        } catch (e) {
            // @ts-ignore
            dispatch(activateError((e as VacancyUpdateError).error));
            setTimeout(() => dispatch(deactivateError()), 3000);
        }
    };

    getDataFromServer() {
        const employerID = location.pathname.split('/').at(-1) as string;
        if (employerID !== this.props.id && employerID === this.props.userID) {
            employerProfileService.getProfileData(employerID).then(body => {
                dispatch(profileActions.updateEmployerFromServer(body));
            });
        }
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    shouldUpdate(
        nextProps:
            | Readonly<ProfileState & { userID: string }>
            | (ProfileState & { userID: string }),
    ): boolean {
        return (
            this.props.userID !== nextProps.userID ||
            this.props.id !== nextProps.id
        );
    }

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
                        <FormItem header={'О пользователе'}>
                            <FormInput
                                size={'12'}
                                id={'name'}
                                label={'Название компании'}
                                value={this.props.name}
                                type={'text'}
                                placeholder={'Название компании'}
                                name={'name'}
                                setError={this.profileFieldsValidation.setError}
                                required={true}
                                validation={this.profileFieldsValidation.getValidation(
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
                                name={'status'}
                                setError={this.profileFieldsValidation.setError}
                                required={true}
                                validation={this.profileFieldsValidation.getValidation(
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
                                setError={this.profileFieldsValidation.setError}
                                validation={this.profileFieldsValidation.getValidation(
                                    'location',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                name={'size'}
                                id={'size'}
                                label={'Размер компании'}
                                value={this.props.size}
                                type={'text'}
                                placeholder={'10.000'}
                                setError={this.profileFieldsValidation.setError}
                                validation={this.profileFieldsValidation.getValidation(
                                    'size',
                                )}
                                validationMode={'oninput'}
                            />
                            <FormInput
                                size={'4'}
                                name={'businessType'}
                                id={'businessType'}
                                label={'Тип бизнеса'}
                                value={this.props.businessType}
                                type={'text'}
                                required={true}
                                setError={this.profileFieldsValidation.setError}
                                validation={this.profileFieldsValidation.getValidation(
                                    'businessType',
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
                        <FormCheckbox
                            checked={this.props.twoFactor}
                            name={'TwoFactorSignIn'}
                            value={'twoFactor'}
                            id={'twoFactor'}
                        >
                            Включить двухфакторную авторизацию
                        </FormCheckbox>
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
                                setError={this.profileFieldsValidation.setError}
                                required={true}
                                validation={this.profileFieldsValidation.getValidation(
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
                                setError={this.profileFieldsValidation.setError}
                                required={true}
                                validation={this.profileFieldsValidation.getValidation(
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
    return { userID: state.id, ...props, twoFactor: state.twoFactor };
})(ProfileSettingsComponent);

export default profileConnect(state => {
    return { ...state };
})(UserWrapper);
