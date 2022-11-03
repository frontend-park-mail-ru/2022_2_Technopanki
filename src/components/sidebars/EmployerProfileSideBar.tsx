import { Component } from '../../../Reacts';
import SideBar from '../UI-kit/sideBar/SideBar';
import MapIcon from '../../static/icons/map.svg';
import UsersIcon from '../../static/icons/users.svg';
import Chips from '../UI-kit/chips/Chips';
import IconField from './utils/IconField';
import VKIcon from '../../static/icons/logos/VK.svg';
import FacebookIcon from '../../static/icons/logos/Facebook.svg';
import TelegramIcon from '../../static/icons/logos/Telegram.svg';

type EmployerProfileSideBarProps = {
    city: string;
    companySize: string;
    fieldOfActivity: string[];
    socialNetworks: {
        vk: string | null | undefined;
        facebook: string | null | undefined;
        telegram: string | null | undefined;
    };
};

export default class EmployerProfileSideBar extends Component<
    EmployerProfileSideBarProps,
    {
        chipsData: string[];
    }
> {
    state = {
        chipsData: [
            'Информационные технологии',
            'Интернет',
            'Социальные технологии',
            'SMM',
            'Системная интеграция',
        ],
    };
    render() {
        return (
            <SideBar
                content={[
                    {
                        header: 'Информация о компании',
                        inside: (
                            <div className={'flex column g-16'}>
                                <IconField
                                    icon={MapIcon}
                                    content={this.props.city}
                                />
                                <IconField
                                    icon={UsersIcon}
                                    content={
                                        this.props.companySize + ' человек'
                                    }
                                />
                            </div>
                        ),
                    },
                    {
                        header: 'Сфера деятельности',
                        inside: (
                            <div className={'flex row g-8 flex-wrap'}>
                                {this.props.fieldOfActivity.map(item => (
                                    <Chips>{item}</Chips>
                                ))}
                            </div>
                        ),
                    },
                    {
                        header: 'Социальные сети',
                        inside: (
                            <div className={'flex row g-16'}>
                                {this.props.socialNetworks.vk ? (
                                    <a href={this.props.socialNetworks.vk}>
                                        <div
                                            className={
                                                'cursor-pointer inner-svg-h-24 inner-svg-200'
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: VKIcon,
                                            }}
                                        ></div>
                                    </a>
                                ) : (
                                    <p></p>
                                )}
                                {this.props.socialNetworks.facebook ? (
                                    <a
                                        href={
                                            this.props.socialNetworks.facebook
                                        }
                                    >
                                        <div
                                            className={
                                                'cursor-pointer inner-svg-h-24 inner-svg-200'
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: FacebookIcon,
                                            }}
                                        ></div>
                                    </a>
                                ) : (
                                    <p></p>
                                )}
                                {this.props.socialNetworks.telegram ? (
                                    <a
                                        href={
                                            this.props.socialNetworks.telegram
                                        }
                                    >
                                        <div
                                            className={
                                                'cursor-pointer inner-svg-h-24 inner-svg-200'
                                            }
                                            dangerouslySetInnerHTML={{
                                                __html: TelegramIcon,
                                            }}
                                        ></div>
                                    </a>
                                ) : (
                                    <p></p>
                                )}
                            </div>
                        ),
                    },
                ]}
            />
        );
    }
}
