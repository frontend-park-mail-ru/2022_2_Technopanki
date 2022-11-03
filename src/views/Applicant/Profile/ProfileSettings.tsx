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
import ProfileSettings, { AvatarSettings, Password, SocialNetworks } from '../../Employer/Profile/ProfileSettings';
import Form, { FormSectionType } from '../../../components/UI-kit/forms/Form';
import Input from '../../../components/UI-kit/forms/inputs/Input';
import CancelSaveButtons from '../../../components/CancelSaveButtons/CancelSaveButtons';
import IconInput from '../../../components/UI-kit/forms/inputs/IconInput';
import Location from '../../../static/icons/location_input.svg'
import styles from './profileSettings.module.scss'

class AboutApplicant extends Component {
    render() {
        return (
            <div className={'columns g-16'}>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'name'}
                        type={'text'}
                        placeholder={'Имя'}
                        label={'Имя'}
                        name={'name'}
                    />
                </div>
                <div className={'col-12 col-md-4'}>
                    <Input
                        id={'surname'}
                        type={'text'}
                        placeholder={'Фамилия'}
                        label={'Фамилия'}
                        name={'surname'}
                    />
                </div>
                <div className={`col-12 col-md-4 ${styles.birthday}`}>
                    <Input
                        id={'date_of_birth'}
                        type={'date'}
                        label={'Дата рождения'}
                        name={'date_of_birth'}
                    />
                </div>
                <div className={`col-12 col-md-4 ${styles.city}`}>
                    <IconInput
                        id={'city'}
                        icon={Location}
                        type={'text'}
                        placeholder={'Город'}
                        label={'Место жительства'}
                        name={'city'}
                    />
                </div>
            </div>
        )
    }
}

export default class ApplicantSettings extends Component<
    {},
    { section: FormSectionType[] }
    >{
    state = {
        sections: [
            {
                header: 'Аватарка',
                content: <AvatarSettings />
            },
            {
                header: 'О себе',
                content: <AboutApplicant />
            },
            {
                header: 'Социальные сети',
                content: <SocialNetworks />,
            },
            {
                header: 'Смена пароля',
                content: <Password />,
            },
        ]
    };

    submitForm = () => {};

    render() {
        return(
            <div
                className={'screen-responsive relative'}
            >
                <Header />
                <div class={'column g-24'}>
                    <div className={`col-12 mt-header`}>
                        <SettingsHat
                            imgSrc={'./'}
                            name={'Захар'}
                            surname={'Урванцев'}
                            description={'Студент МГТУ, разработчик и просто хороший человек'}
                            to={'/vacancy'}
                        />
                    </div>
                    <h3 className={'col-12'}>Настройки профиля</h3>
                    <div className={'col-12 col-md-8'}>
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
        )
    }
}