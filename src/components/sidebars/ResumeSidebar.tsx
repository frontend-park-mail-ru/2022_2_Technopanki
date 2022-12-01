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
import { applicantConnect, dispatch } from '../../store';
import { applicantActions } from '../../store/applicant/actions';
import { Application } from 'express';
import { ApplicantProfileType } from '../../store/profile/types';
import { ProfileState } from '../../store/applicant/type';

class ResumeSidebar extends ReactsComponent<
    ApplicantProfileType & { creatorID: string }
> {
    async getCreatorData() {
        if (this.props.creatorID) {
            const applicantBody =
                await applicantProfileService.getApplicantData(
                    this.props.creatorID as string,
                );
            dispatch(applicantActions.updateFromServer(applicantBody));
        }
    }

    componentDidMount() {
        this.getCreatorData();
    }

    shouldUpdate(
        nextProps:
            | Readonly<ApplicantProfileType & { creatorID: string }>
            | (ApplicantProfileType & { creatorID: string }),
    ): boolean {
        return (
            this.props.location !== nextProps.location ||
            this.props.dateOfBirth !== nextProps.dateOfBirth
        );
    }

    render() {
        return (
            <SideBar
                content={[
                    {
                        header: 'Город проживания',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                {this.props.location
                                    ? this.props.location + ' '
                                    : 'Не указано'}
                            </p>
                        ),
                    },
                    {
                        header: 'Дата рождения',
                        inside: (
                            <p className={'font-size-24 bold'}>
                                {this.props.dateOfBirth
                                    ? this.props.dateOfBirth ===
                                      '0001-01-01T00:00:00Z'
                                        ? 'Не указано'
                                        : `${this.props.dateOfBirth.slice(
                                              8,
                                              10,
                                          )}.${this.props.dateOfBirth.slice(
                                              5,
                                              7,
                                          )}.${this.props.dateOfBirth.slice(
                                              0,
                                              4,
                                          )} `
                                    : ''}
                            </p>
                        ),
                    },
                ]}
            />
        );
    }
}

export default applicantConnect((state: ProfileState, props) => ({
    ...state,
    creatorID: props.creatorID,
}))(ResumeSidebar);
