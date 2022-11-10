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
import { applicantProfileService } from '../../services/applicantService';

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

export default class ResumeSidebar extends Component<
    { creatorID: string },
    ResumeSidebarProps
> {
    state = {
        location: '',
        dateOfBirth: '',
        skills: [''],
        vk: '',
        facebook: '',
        telegram: '',
    };

    getCreatorData() {
        applicantProfileService
            .getApplicantData(this.props.creatorID as string)
            .then(body => {
                this.setState(() => ({
                    location: body.location,
                    dateOfBirth: body.date_of_birth,
                    skills: ['test'],
                }));
            });
    }

    componentDidMount() {
        this.getCreatorData();
    }

    render() {
        return (
            <SideBar
                content={[
                    {
                        header: 'Город проживания',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                {this.state.location}
                            </p>
                        ),
                    },
                    {
                        header: 'Дата рождения',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                {this.state.dateOfBirth
                                    ? `${this.state.dateOfBirth.slice(
                                          8,
                                          10,
                                      )}.${this.state.dateOfBirth.slice(
                                          5,
                                          7,
                                      )}.${this.state.dateOfBirth.slice(0, 4)}`
                                    : ''}
                            </p>
                        ),
                    },
                    {
                        header: 'Профессиональные навыки',
                        inside: (
                            <div className={'flex row g-8 flex-wrap'}>
                                {this.state.skills?.map(item => (
                                    <Chips>{item}</Chips>
                                ))}
                            </div>
                        ),
                    },
                    {
                        header: 'Социальные сети',
                        inside: (
                            <div className={'flex row g-24'}>
                                {this.state.vk ? (
                                    <a href={this.state.vk}>
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
                                {this.state.facebook ? (
                                    <a href={this.state.facebook}>
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
                                {this.state.telegram ? (
                                    <a href={this.state.telegram}>
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
