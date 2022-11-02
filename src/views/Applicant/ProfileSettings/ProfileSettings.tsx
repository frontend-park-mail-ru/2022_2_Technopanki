import { Component } from '../../../../Reacts';
import Header from '../../../components/UI-kit/header/Header';
import ProfileHeader from '../../../components/ProfileHeader/ProfileHeader';
import ButtonIcon from '../../../components/UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../../static/icons/phone.svg';
import MailIcon from '../../../static/icons/mail.svg';
import ButtonPrimary from '../../../components/UI-kit/buttons/ButtonPrimary';
import Link from '../../../components/Link/Link';
import Button from '../../../components/UI-kit/buttons/Button';

export default class ApplicantSettings extends Component{
    render() {
        return(
            <div
                className={'screen-responsive relative'}
            >
                <Header />
                <ProfileHeader
                    bannerSrc={'./'}
                    avatarSrc={'./'}
                    name={'Урванцев Захар'}
                    description={'Студент МГТУ, разработчик и просто хороший человек'}
                    buttons={
                        <div className={'flex flex-wrap row g-16'}>
                            <ButtonIcon icon={PhoneIcon} />
                            <ButtonIcon icon={MailIcon} />
                            <ButtonPrimary>Хочу здесь работать</ButtonPrimary>
                            <Link
                                to={'/employer/settings'}
                                content={<Button>Настройки</Button>}
                            />
                        </div>
                    }
                    />
            </div>
        )
    }
}