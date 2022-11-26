import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
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

export default class ResumeSidebar extends ReactsComponent<
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
        if (this.props.creatorID) {
            applicantProfileService
                .getApplicantData(this.props.creatorID as string)
                .then(body => {
                    this.setState(() => ({
                        location: body.location,
                        dateOfBirth: body.date_of_birth,
                        skills: [''],
                    }));
                });
        }
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
                                {this.state.location
                                    ? this.state.location
                                    : 'Не указано'}
                            </p>
                        ),
                    },
                    {
                        header: 'Дата рождения',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                {this.state.dateOfBirth
                                    ? this.state.dateOfBirth ===
                                      '0001-01-01T00:00:00Z'
                                        ? 'Не указано'
                                        : `${this.state.dateOfBirth.slice(
                                              8,
                                              10,
                                          )}.${this.state.dateOfBirth.slice(
                                              5,
                                              7,
                                          )}.${this.state.dateOfBirth.slice(
                                              0,
                                              4,
                                          )}`
                                    : ''}
                            </p>
                        ),
                    },
                    {
                        header: 'Профессиональные навыки',
                        inside: (
                            <div className={'flex row g-8 flex-wrap'}>
                                {this.state.skills.length === 0 ? (
                                    this.state.skills?.map(item => (
                                        <Chips>{item}</Chips>
                                    ))
                                ) : (
                                    <p className={'mx-0 font-size-24 bold'}>
                                        Не указано
                                    </p>
                                )}
                            </div>
                        ),
                    },
                ]}
            />
        );
    }
}
