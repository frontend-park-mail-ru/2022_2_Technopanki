import { Component } from '../../../Reacts';
import Header from '../../components/UI-kit/header/Header';
import SettingsHat from '../../components/hats/SettingsHat';
import Input from '../../components/UI-kit/forms/inputs/Input';
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
import { dispatch, errorsConnect, profileConnect } from '../../store';
import Textarea from '../../components/UI-kit/forms/inputs/Textarea';
import ChipsInput from '../../components/UI-kit/forms/inputs/ChipsInput';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { activateError, deactivateError } from '../../store/errors/actions';

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

class FieldOfActivity extends Component<
    { fieldOfActivity: string[] },
    {
        fieldOfActivity: string[];
    }
> {
    state = {
        fieldOfActivity: this.props.fieldOfActivity,
    };

    deleteItem = (index: number) => {
        console.log(this.state);
        this.setState(state => ({
            ...state,
            fieldOfActivity: [
                ...state.fieldOfActivity.slice(0, index),
                ...state.fieldOfActivity.slice(index + 1),
            ],
        }));
        console.log(this.state);
    };

    addItem = (value: string) => {
        this.setState(state => ({
            ...state,
            fieldOfActivity: [...state.fieldOfActivity, value],
        }));
    };

    render() {
        return (
            <div key={'fields'}>
                <input
                    className={'none'}
                    name={'field_of_activity'}
                    value={this.state.fieldOfActivity}
                />
                <ChipsInput
                    id={'fieldOfActivity'}
                    label={'Область деятельности'}
                    items={this.state.fieldOfActivity}
                    deleteItem={this.deleteItem.bind(this)}
                    addItem={this.addItem.bind(this)}
                />
            </div>
        );
    }
}

class AboutCompanyComponent extends Component<{
    name: string;
    status: string;
    description: string;
    phone: string;
    email: string;
    size: string;
}> {
    state = {
        name: this.props.name,
        status: this.props.status,
        description: this.props.description,
        phone: this.props.phone,
        email: this.props.email,
        size: this.props.size,
    };

    render() {
        return (
            <div key={'about'} className={'columns g-16'}>
                <div key={'employer_name'} className={'col-12'}>
                    <Input
                        id={'employer_name'}
                        type={'text'}
                        placeholder={'Company name'}
                        label={'Название компании'}
                        name={'name'}
                        value={this.state.name}
                        required={true}
                        onBlur={() => {
                            this.state.name =
                                document.querySelector('#employer_name').value;
                        }}
                    />
                </div>
                <div key={'status'} className={'col-12 col-md-8'}>
                    <Input
                        id={'status'}
                        type={'text'}
                        placeholder={'Hello world!'}
                        label={'Статус'}
                        name={'status'}
                        value={this.props.status}
                        required={true}
                    />
                </div>
                <div key={'description'} className={'col-12'}>
                    <Textarea
                        id={'description'}
                        placeholder={'Напишите здесь описание Вашей компании'}
                        label={'Описание'}
                        name={'description'}
                        value={this.props.description}
                    />
                </div>
                <div key={'size'} className={'col-12 col-md-4'}>
                    <Input
                        id={'size'}
                        type={'integer'}
                        placeholder={'10.000'}
                        label={'Размер компании (человек)'}
                        name={'size'}
                        value={this.props.size}
                    />
                </div>
                <div key={'phone'} className={'col-12 col-md-4'}>
                    <Input
                        id={'phone'}
                        type={'text'}
                        placeholder={'+7 (999) 999-99-99'}
                        label={'Телефон'}
                        name={'phone'}
                        value={this.props.phone}
                    />
                </div>
                <div key={'email'} className={'col-12 col-md-4'}>
                    <Input
                        id={'email'}
                        type={'text'}
                        placeholder={'example@mail.ru'}
                        label={'Email'}
                        name={'email'}
                        value={this.props.email}
                    />
                </div>
            </div>
        );
    }
}

const AboutCompany = profileConnect(store => {
    const state = store.getState();

    return {
        name: state.name,
        status: state.status,
        description: state.description,
        phone: state.phone,
        email: state.email,
        size: state.size,
    };
})(AboutCompanyComponent);

// class SocialNetworksComponent extends Component<{
//     vk?: string;
//     facebook?: string;
//     telegram?: string;
//     youtube?: string;
//     twitter?: string;
//     instagram?: string;
// }> {
//     render() {
//         return (
//             <div className={'columns g-16'}>
//                 <div className={'col-12 col-md-4'}>
//                     <IconInput
//                         id={'vk'}
//                         type={'text'}
//                         placeholder={'vk.com/'}
//                         icon={VKLogo}
//                         label={''}
//                         name={'vk'}
//                         value={this.props.vk}
//                     />
//                 </div>
//                 <div className={'col-12 col-md-4'}>
//                     <IconInput
//                         id={'twitter'}
//                         type={'text'}
//                         placeholder={'twitter.com/'}
//                         icon={TwitterLogo}
//                         label={''}
//                         name={'twitter'}
//                         value={this.props.twitter}
//                     />
//                 </div>
//                 <div className={'col-12 col-md-4'}>
//                     <IconInput
//                         id={'facebook'}
//                         type={'text'}
//                         placeholder={'Москва'}
//                         icon={FacebookLogo}
//                         label={''}
//                         name={'facebook'}
//                         value={this.props.facebook}
//                     />
//                 </div>
//                 <div className={'col-12 col-md-4'}>
//                     <IconInput
//                         id={'telegram'}
//                         type={'text'}
//                         placeholder={'telegram.com/'}
//                         icon={TelegramLogo}
//                         label={''}
//                         name={'telegram'}
//                         value={this.props.telegram}
//                     />
//                 </div>
//                 <div className={'col-12 col-md-4'}>
//                     <IconInput
//                         id={'instagram'}
//                         type={'text'}
//                         placeholder={'instagram.com/'}
//                         icon={InstagramLogo}
//                         label={''}
//                         name={'instagram'}
//                         value={this.props.instagram}
//                     />
//                 </div>
//                 <div className={'col-12 col-md-4'}>
//                     <IconInput
//                         id={'youtube'}
//                         type={'text'}
//                         placeholder={'youtube.com/'}
//                         icon={YouTubeLogo}
//                         label={''}
//                         name={'youtube'}
//                         value={this.props.youtube}
//                     />
//                 </div>
//             </div>
//         );
//     }
// }

// const SocialNetworks = profileConnect(store => {
//     const state = store.getState();
//
//     return {
//         vk: state.socialNetworks.vk,
//         facebook: state.socialNetworks.facebook,
//         telegram: state.socialNetworks.telegram,
//         youtube: state.socialNetworks.youtube,
//         twitter: state.socialNetworks.twitter,
//         instagram: state.socialNetworks.instagram,
//     };
// })(SocialNetworksComponent);

class Password extends Component {
    render() {
        return (
            <div key={'password'} className={'columns g-16'}>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'password'}
                        type={'password'}
                        placeholder={'********'}
                        label={'Новый пароль'}
                        name={'password'}
                        onBlur={() => {
                            dispatch(
                                activateError(
                                    'Ошибка в пароле',
                                    'Неверный пароль',
                                ),
                            );
                            setTimeout(() => dispatch(deactivateError()), 3000);
                        }}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'repeat_password'}
                        type={'password'}
                        placeholder={'********'}
                        label={'Повторите новый пароль'}
                        name={'repeat_password'}
                    />
                </div>
            </div>
        );
    }
}

// todo: добавить валидацию на все компоненты
class ProfileSettingsComponent extends Component<
    { errorIsActive: boolean; profile: ProfileState },
    { profile: EmployerProfile; sections: FormSectionType[] }
> {
    state = {
        profile: this.props.profile,
    };

    submitForm = (e: SubmitEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.append('user_type', this.props.profile.profileType);

        if (this.props.errorIsActive) {
            console.log(this.props);
            return;
        }

        // employerProfileService
        //     .updateProfileImg(formData.get('img'))
        //     .then(body => console.log(body))
        //     .catch(err => console.error(err));

        employerProfileService
            .updateProfile(
                this.props.profileID,
                this.props.profileType,
                formData,
            )
            .then(() => {
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
        const sections = [
            {
                header: 'Аватарка',
                content: <AvatarSettings />,
            },
            {
                header: 'О компании',
                content: (
                    <AboutCompanyComponent
                        name={this.state.profile.name}
                        status={this.state.profile.status}
                        description={this.state.profile.description}
                        phone={this.state.profile.phone}
                        email={this.state.profile.email}
                        size={this.state.profile.size}
                    />
                ),
            },
            // {
            //     header: 'Социальные сети',
            //     content: <SocialNetworks />,
            // },
            {
                header: 'Смена пароля',
                content: <Password />,
            },
        ];

        return (
            <div className={'screen-responsive relative hidden'}>
                <Header key={'header'} />
                <ErrorPopup key={'popup'} />
                <div key={'hat'} className={'columns g-24'}>
                    <div key={'hat'} className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={this.state.profile.avatarSrc}
                            name={this.state.profile.name}
                            surname={''}
                            status={this.state.profile.status}
                            submit={this.submitEvent}
                        />
                    </div>
                    <h3 key={'header'} className={'col-12'}>
                        Настройки профиля
                    </h3>
                    <div key={'form'} className={'col-12 col-md-9'}>
                        <Form
                            key={'form'}
                            sections={sections}
                            submitComponent={
                                <CancelSaveButtons
                                    onCancel={() => {
                                        navigator.navigate('/employer/1');
                                    }}
                                />
                            }
                            onSubmit={this.submitForm}
                        />
                    </div>
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}

const ProfileWrapper = profileConnect((store, props) => {
    const state = store.getState();

    return {
        errorIsActive: props.errorIsActive,
        profile: state,
    };
})(ProfileSettingsComponent);

export default errorsConnect(store => ({
    errorIsActive: store.getState().isActive,
}))(ProfileWrapper);
