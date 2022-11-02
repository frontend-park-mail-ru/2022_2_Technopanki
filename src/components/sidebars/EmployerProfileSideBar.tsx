import { Component } from '../../../Reacts';
import SideBar from '../UI-kit/sideBar/SideBar';
import MapIcon from '../../static/icons/map.svg';
import UsersIcon from '../../static/icons/users.svg';
import Chips from '../UI-kit/chips/Chips';
import IconField from './utils/IconField';
import VKIcon from '../../static/icons/logos/VK.svg';
import FacebookIcon from '../../static/icons/logos/Facebook.svg';
import TelegramIcon from '../../static/icons/logos/Telegram.svg';

export default class EmployerProfileSideBar extends Component<
    {},
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
                                    content={'Москва, Санкт-Петербург'}
                                />
                                <IconField
                                    icon={UsersIcon}
                                    content={'10.000 человек'}
                                />
                            </div>
                        ),
                    },
                    {
                        header: 'Сфера деятельности',
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
                            <div className={'flex row g-16'}>
                                <div
                                    className={'inner-svg-h-24 inner-svg-200'}
                                    dangerouslySetInnerHTML={{
                                        __html: VKIcon,
                                    }}
                                ></div>
                                <div
                                    className={'inner-svg-h-24 inner-svg-200'}
                                    dangerouslySetInnerHTML={{
                                        __html: FacebookIcon,
                                    }}
                                ></div>
                                <div
                                    className={'inner-svg-h-24 inner-svg-200'}
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
