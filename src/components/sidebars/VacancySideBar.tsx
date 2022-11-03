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

export default class VacancySideBar extends Component<{
    salary: string;
    experience: string;
    location: string;
    format: string;
    hours: string;
    skills: string[];
}> {
    render() {
        return (
            <SideBar
                content={[
                    {
                        header: 'Заработная плата',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                {this.props.salary}
                            </p>
                        ),
                    },
                    {
                        header: 'Требуемый опыт работы',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                {this.props.experience}
                            </p>
                        ),
                    },
                    {
                        header: 'Информация о вакансии',
                        inside: (
                            <div className={'flex column g-16'}>
                                <IconField
                                    icon={MapIcon}
                                    content={this.props.location}
                                />
                                <IconField
                                    icon={CalendarIcon}
                                    content={this.props.hours}
                                />
                                <IconField
                                    icon={ClockIcon}
                                    content={this.props.format}
                                />
                            </div>
                        ),
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
                    // {
                    //     header: 'Социальные сети',
                    //     inside: (
                    //         <div className={'flex row g-16'}>
                    //             <div
                    //                 className={'inner-svg-h-24 inner-svg-200'}
                    //                 dangerouslySetInnerHTML={{
                    //                     __html: VKIcon,
                    //                 }}
                    //             ></div>
                    //             <div
                    //                 className={'inner-svg-h-24 inner-svg-200'}
                    //                 dangerouslySetInnerHTML={{
                    //                     __html: FacebookIcon,
                    //                 }}
                    //             ></div>
                    //             <div
                    //                 className={'inner-svg-h-24 inner-svg-200'}
                    //                 dangerouslySetInnerHTML={{
                    //                     __html: TelegramIcon,
                    //                 }}
                    //             ></div>
                    //         </div>
                    //     ),
                    // },
                ]}
            />
        );
    }
}
