import { Component } from '../../../Reacts';
import SideBar from '../UI-kit/sideBar/SideBar';
import IconField from './utils/IconField';
import MapIcon from '../../static/icons/map.svg';
import ClockIcon from '../../static/icons/clock.svg';
import CalendarIcon from '../../static/icons/calendar.svg';
import Chips from '../UI-kit/chips/Chips';
import VKIcon from '../../static/icons/logos/VK.svg';
import FacebookIcon from '../../static/icons/logos/Facebook.svg';
import TelegramIcon from '../../static/icons/logos/Telegram.svg';

type ResumeSidebarProps = {
    location: string;
    dateOfBirth: string;
    skills: string[];
    socialNetworks: {
        vk: string | null | undefined;
        facebook: string | null | undefined;
        telegram: string | null | undefined;
    };
};

export default class ResumeSidebar extends Component<ResumeSidebarProps> {
    render() {
        return (
            <SideBar
                content={[
                    {
                        header: 'Город проживания',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                {this.props.location}
                            </p>
                        ),
                    },
                    {
                        header: 'Дата рождения',
                        inside: <p className={'font-size-24 bold'}>{this.props.dateOfBirth}</p>,
                    },
                    {
                        header: 'Профессиональные навыки',
                        inside: (
                            <div className={'flex row g-8 flex-wrap'}>
                                {this.props.skills?.map(item => (
                                    <Chips>{item}</Chips>
                                ))}
                            </div>
                        ),
                    },
                    {
                        header: 'Социальные сети',
                        inside: (
                            <div className={'flex row g-24'}>
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
