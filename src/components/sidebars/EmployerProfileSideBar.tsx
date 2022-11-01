import { Component } from '../../../Reacts';
import SideBar from '../UI-kit/sideBar/SideBar';
import MapIcon from '../../static/icons/map.svg';
import UsersIcon from '../../static/icons/users.svg';
import Chips from '../UI-kit/chips/Chips';
import IconField from './utils/IconField';

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
                ]}
            />
        );
    }
}
