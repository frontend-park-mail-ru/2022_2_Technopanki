import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Bell from '../../../static/icons/bell.svg'
import Svg from '../../Svg';
import Dropdown from '../dropdown/Dropdown';
import styles from './notifications.module.scss'
import NewNotification from '../../../static/icons/new_notificantion.svg'
import Link from '../../Link';
import TextLink from '../../TextLink/TextLink'
import NotificationCard from './NotificationCard';
import { Notification } from '../../../store/notification/type';
import { notificationService } from '../../../services/notificationService';
import { NOTIFICATION_TYPES, notificationActions } from '../../../store/notification/action';
import { dispatch } from '../../../store';

export default class NotificationWindow extends ReactsComponent<Notification> {
    state = {
        isOpen: false,
        notifications: [],
        limit: 5,
    }

    componentDidMount(): void {
        notificationService
            .getAllNotifications()
            .then(body => {
                this.setState(state => ({
                    ...state,
                    notifications: [...body.data],
                }));
            })
            .catch(err => console.error(err));

        notificationService.subscribe((message: string) => {
            try {
                const messageJson = JSON.parse(message)
                switch (messageJson.type) {
                    case NOTIFICATION_TYPES.APPLY:
                        this.setState(state => ({
                            ...state,
                            notifications: [...state.notifications, messageJson],
                        }))

                        console.log(this.state.notifications)
                        break;
                    case NOTIFICATION_TYPES.RESUME_DOWNLOAD:

                        break;
                }
            } catch (e) {
                console.error(e)
            }
        })
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
                        {this.state.notifications.length === 0 ? (
                            <p className={`g-16 p-16`}>Новых уведомлений нет</p>
                        ) : (
                            <div>
                                {this.state.notifications
                                    .reverse()
                                    ?.slice(0, this.state.limit)
                                    .map(n => (
                                        <NotificationCard
                                            type={n.type}
                                            vacancyTitle={n.title}
                                            vacancyID={n.object_id}
                                        />
                                ))}
                            </div>
                        )}
                    </div>
                }
                direction={'left'}
            />
        )
    }
}