import { Component } from '../../../Reacts';
import SideBar from '../UI-kit/sideBar/SideBar';
import MapIcon from '../../static/icons/map.svg';
import UsersIcon from '../../static/icons/users.svg';

export default class EmployerProfileSideBar extends Component {
    render() {
        return (
            <SideBar
                content={[
                    {
                        header: 'Информация о компании',
                        inside: (
                            <div className={'flex column g-16'}>
                                <div
                                    className={
                                        'flex row g-8 align-items-center'
                                    }
                                >
                                    <div
                                        className={
                                            'inner-svg-h-16 inner-svg-200'
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: MapIcon,
                                        }}
                                    ></div>
                                    <p>Москва, Санкт-Петербург</p>
                                </div>
                                <div
                                    className={
                                        'flex row g-8 align-items-center'
                                    }
                                >
                                    <div
                                        className={
                                            'inner-svg-h-16 inner-svg-200'
                                        }
                                        dangerouslySetInnerHTML={{
                                            __html: UsersIcon,
                                        }}
                                    ></div>
                                    <p>10.000 человек</p>
                                </div>
                            </div>
                        ),
                    },
                    {
                        header: 'Информация о компании',
                        inside: <p>Some info</p>,
                    },
                ]}
            />
        );
    }
}
