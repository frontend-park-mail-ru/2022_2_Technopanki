import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import SideBar from '../UI-kit/sideBar/SideBar';
import MapIcon from '../../static/icons/map.svg';
import UsersIcon from '../../static/icons/users.svg';
import BriefCase from '../../static/icons/briefcase.svg';
import IconField from './utils/IconField';
import { EmployerSocialNetworks } from '../../store/profile/types';

type EmployerProfileSideBarProps = {
    companySize: string;
    fieldOfActivity: string[];
    socialNetworks: EmployerSocialNetworks;
    businessType: string;
    location: string;
};

// TODO: icons
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
                                    icon={BriefCase}
                                    content={
                                        this.props.businessType
                                            ? this.props.businessType
                                            : 'Не указано'
                                    }
                                />
                                <IconField
                                    icon={MapIcon}
                                    content={
                                        this.props.location
                                            ? this.props.location
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
