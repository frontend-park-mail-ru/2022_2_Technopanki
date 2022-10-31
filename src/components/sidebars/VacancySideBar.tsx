import { Component } from '../../../Reacts';
import SideBar from '../UI-kit/sideBar/SideBar';
import IconField from './utils/IconField';
import MapIcon from '../../static/icons/map.svg';
import Chips from '../UI-kit/chips/Chips';

export default class VacancySideBar extends Component<
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
                        header: 'Заработная плата',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                240.000 руб/мес
                            </p>
                        ),
                    },
                    {
                        header: 'Требуемый опыт работы',
                        inside: <p className={'font-size-24 bold'}>3-6 лет</p>,
                    },
                    {
                        header: 'Информация о вакансии',
                        inside: (
                            <div className={'flex column g-16'}>
                                <IconField icon={MapIcon} content={'Москва'} />
                                <IconField
                                    icon={MapIcon}
                                    content={'40 часов в неделю'}
                                />
                                <IconField
                                    icon={MapIcon}
                                    content={'Смешанный формат'}
                                />
                            </div>
                        ),
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
                ]}
            />
        );
    }
}
