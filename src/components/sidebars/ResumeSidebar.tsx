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

export default class ResumeSidebar extends Component<
    {},
    {
        chipsData: string[];
    }
    > {
    state = {
        chipsData: ['JavaScript', 'Git', 'CSS3', 'HTML5', 'React', 'Redux'],
    };

    render() {
        return (
            <SideBar
                content={[
                    {
                        header: 'Город проживания',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                Москва
                            </p>
                        ),
                    },
                    {
                        header: 'Дата рождения',
                        inside: <p className={'font-size-24 bold'}>22.11.2022</p>,
                    },
                    {
                        header: 'Профессиональные навыки',
                        inside: (
                            <div className={'flex row g-8 flex-wrap'}>
                                {this.state.chipsData.map(item => (
                                    <Chips>{item}</Chips>
                                ))}
                            </div>
                        ),
                    },
                    {
                        header: 'Социальные сети',
                        inside: (
                            <div className={'flex row g-24'}>
                                <div
                                    className={'inner-svg-h-40 inner-svg-200'}
                                    dangerouslySetInnerHTML={{
                                        __html: VKIcon,
                                    }}
                                ></div>
                                <div
                                    className={'inner-svg-h-40 inner-svg-200'}
                                    dangerouslySetInnerHTML={{
                                        __html: FacebookIcon,
                                    }}
                                ></div>
                                <div
                                    className={'inner-svg-h-40 inner-svg-200'}
                                    dangerouslySetInnerHTML={{
                                        __html: TelegramIcon,
                                    }}
                                ></div>
                            </div>
                        ),
                    },
                ]}
            />
        );
    }
}
