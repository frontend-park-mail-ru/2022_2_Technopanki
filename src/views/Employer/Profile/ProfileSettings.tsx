import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import VacancySettingsHat from '../../../components/hats/VacancySettingsHat';
import Input from '../../../components/UI-kit/forms/inputs/Input';
import Form, { FormSectionType } from '../../../components/UI-kit/forms/Form';
import CancelSaveButtons from '../../../components/CancelSaveButtons/CancelSaveButtons';
import IconInput from '../../../components/UI-kit/forms/inputs/IconInput';
import VKLogo from '../../../static/icons/logos/VKColor.svg';
import TwitterLogo from '../../../static/icons/logos/TwitterColor.svg';
import FacebookLogo from '../../../static/icons/logos/FacebookColor.svg';
import TelegramLogo from '../../../static/icons/logos/TelegramColor.svg';
import YouTubeLogo from '../../../static/icons/logos/YouTubeColor.svg';
import InstagramLogo from '../../../static/icons/logos/InstagramColor.svg';

class AvatarSettings extends Component {
    render() {
        return (
            <div>
                <p>Test</p>
            </div>
        );
    }
}

class AboutCompany extends Component {
    render() {
        return (
            <div className={'columns g-24'}>
                <div className={'col-12'}>
                    <Input
                        id={'company_name'}
                        type={'text'}
                        placeholder={'Company name'}
                        label={'Название компании'}
                        name={'company_name'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'sity'}
                        type={'text'}
                        placeholder={'Москва'}
                        label={'Слоган'}
                        name={'sity'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'sity'}
                        type={'text'}
                        placeholder={'Москва'}
                        label={'Местоположение компании'}
                        name={'sity'}
                    />
                </div>
            </div>
        );
    }
}

class SocialNetworks extends Component {
    render() {
        return (
            <div className={'columns g-24'}>
                <div className={'col-12 col-md-4'}>
                    <IconInput
                        id={'vk'}
                        type={'text'}
                        placeholder={'vk.com/'}
                        icon={VKLogo}
                        label={''}
                        name={'vk'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <IconInput
                        id={'twitter'}
                        type={'text'}
                        placeholder={'twitter.com/'}
                        icon={TwitterLogo}
                        label={''}
                        name={'twitter'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <IconInput
                        id={'facebook'}
                        type={'text'}
                        placeholder={'Москва'}
                        icon={FacebookLogo}
                        label={''}
                        name={'facebook'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <IconInput
                        id={'telegram'}
                        type={'text'}
                        placeholder={'telegram.com/'}
                        icon={TelegramLogo}
                        label={''}
                        name={'telegram'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <IconInput
                        id={'instagram'}
                        type={'text'}
                        placeholder={'instagram.com/'}
                        icon={InstagramLogo}
                        label={''}
                        name={'instagram'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <IconInput
                        id={'youtube'}
                        type={'text'}
                        placeholder={'youtube.com/'}
                        icon={YouTubeLogo}
                        label={''}
                        name={'youtube'}
                    />
                </div>
            </div>
        );
    }
}

class Password extends Component {
    render() {
        return (
            <div className={'columns g-24'}>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'company_name'}
                        type={'password'}
                        placeholder={'Company name'}
                        label={'Новый пароль'}
                        name={'company_name'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'sity'}
                        type={'password'}
                        placeholder={'Москва'}
                        label={'Повторите пароль'}
                        name={'sity'}
                    />
                </div>
            </div>
        );
    }
}

export default class ProfileSettings extends Component<
    {},
    { sections: FormSectionType[] }
> {
    state = {
        sections: [
            {
                header: 'Аватарка',
                content: <AvatarSettings />,
            },
            {
                header: 'О компании',
                content: <AboutCompany />,
            },
            {
                header: 'Социальные сети',
                content: <SocialNetworks />,
            },
            {
                header: 'Смена пароля',
                content: <Password />,
            },
        ],
    };

    submitForm = () => {};

    render() {
        return (
            <div className={'screen-responsive relative hidden'}>
                <Header />
                <div className={'columns g-24'}>
                    <div className={`col-12 mt-header`}>
                        <VacancySettingsHat
                            imgSrc={'./'}
                            companyName={'VK'}
                            description={'Место встречи профессионалов'}
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки профиля</h3>
                    <div className={'col-12 col-md-9'}>
                        <Form
                            sections={this.state.sections}
                            submitComponent={
                                <CancelSaveButtons
                                    onCancel={() => {}}
                                    onSave={() => {}}
                                />
                            }
                            onSubmit={this.submitForm}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
