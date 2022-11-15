import { Component } from '../../../__Reacts__old_version__';
import SideBar from '../UI-kit/sideBar/SideBar';
import MapIcon from '../../static/icons/map.svg';
import UsersIcon from '../../static/icons/users.svg';
import Chips from '../UI-kit/chips/Chips';
import IconField from './utils/IconField';
import VKIcon from '../../static/icons/logos/VK.svg';
import FacebookIcon from '../../static/icons/logos/Facebook.svg';
import TelegramIcon from '../../static/icons/logos/Telegram.svg';
import { EmployerSocialNetworks } from '../../store/profile/types';

type EmployerProfileSideBarProps = {
    companySize: string;
    fieldOfActivity: string[];
    socialNetworks: EmployerSocialNetworks;
};

export default class EmployerProfileSideBar extends Component<EmployerProfileSideBarProps> {
    render() {
        return (
            <SideBar
                content={[
                    {
                        header: 'Информация о компании',
                        inside: (
                            <div className={'flex column g-16'}>
                                <IconField
                                    icon={UsersIcon}
                                    content={
                                        this.props.companySize
                                            ? this.props.companySize +
                                              ' человек'
                                            : 'Не указано'
                                    }
                                />
                            </div>
                        ),
                    },
                ]}
            />
        );
    }
}
