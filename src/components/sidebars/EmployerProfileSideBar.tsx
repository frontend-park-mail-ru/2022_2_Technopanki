import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
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
    businessType: string;
};

export default class EmployerProfileSideBar extends ReactsComponent<EmployerProfileSideBarProps> {
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
                                <IconField
                                    icon={UsersIcon}
                                    content={
                                        this.props.businessType
                                            ? this.props.businessType
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
