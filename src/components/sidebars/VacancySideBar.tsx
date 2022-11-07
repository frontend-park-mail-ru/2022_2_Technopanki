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
import RenderWithCondition from '../RenderWithCondition';
import { vacancyConnect } from '../../store';

class VacancySideBar extends Component<{
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
                                {this.props.salary} руб/мес
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
                                <RenderWithCondition
                                    condition={!!this.props.location}
                                    onSuccess={
                                        <IconField
                                            icon={MapIcon}
                                            content={this.props.location}
                                        />
                                    }
                                />
                                <RenderWithCondition
                                    condition={!!this.props.hours}
                                    onSuccess={
                                        <IconField
                                            icon={CalendarIcon}
                                            content={this.props.hours}
                                        />
                                    }
                                />
                                <RenderWithCondition
                                    condition={!!this.props.format}
                                    onSuccess={
                                        <IconField
                                            icon={ClockIcon}
                                            content={this.props.format}
                                        />
                                    }
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

export default vacancyConnect(state => {
    return {
        salary: state.salary,
        experience: state.experience,
        location: state.location,
        format: state.format,
        hours: state.hours,
        skills: state.skills,
    };
})(VacancySideBar);
