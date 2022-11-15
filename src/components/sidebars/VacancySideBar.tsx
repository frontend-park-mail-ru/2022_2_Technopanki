import { Component } from '../../../__Reacts__old_version__';
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
                                {this.props.salary
                                    ? this.props.salary + ' руб/мес'
                                    : 'Не указано'}
                            </p>
                        ),
                    },
                    {
                        header: 'Требуемый опыт работы',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                {this.props.experience
                                    ? this.props.experience
                                    : 'Не указано'}
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
