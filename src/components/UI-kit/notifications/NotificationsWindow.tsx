import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Bell from '../../../static/icons/bell.svg'
import Svg from '../../Svg';
import Dropdown from '../dropdown/Dropdown';
import styles from './notifications.module.scss'
import NewNotification from '../../../static/icons/new_notificantion.svg'
import Link from '../../Link';
import TextLink from '../../TextLink/TextLink'
import NotificationCard from './NotificationCard';

type NotificationType = {
    userID: string;
    aboutUserID: string;
    userType: string;
    resumeTitle: string;
    applicantName: string;
    vacancyTitle: string;
    type: string;
}

export default class NotificationWindow extends ReactsComponent<NotificationType> {
    state = {
        isOpen: false,
    }


    render() {
        return (
            <Dropdown
                content={
                    <div className={'pt-5'}>
                        <Svg
                            src={Bell}
                            height={16}
                            cursor={'pointer'}
                        />
                    </div>
                }
                hidden={
                    <div className={`flex column g-0 background-0 rounded-md shadow-md mt-16 ${styles.notification_window}`}>
                        <h6 className={`w-border-box p-8 color-900 ${styles.borderline}`}>Последние уведомления</h6>
                        <NotificationCard
                            type={this.props.type}
                            applicantName={this.props.applicantName}
                            vacancyTitle={this.props.vacancyTitle}
                        />
                        {/*<NotificationCard*/}
                        {/*    type={'download resume'}*/}
                        {/*/>*/}
                    </div>
                }
                direction={'left'}
            />
        )
    }
}