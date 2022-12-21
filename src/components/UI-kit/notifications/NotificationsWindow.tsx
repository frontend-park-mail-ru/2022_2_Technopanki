import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Bell from '../../../static/icons/bell.svg'
import Svg from '../../Svg';
import Dropdown from '../dropdown/Dropdown';
import styles from './notifications.module.scss'
import NewNotification from '../../../static/icons/new_notificantion.svg'
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
                    notifications: [...body.data].reverse(),
                }));
            })
            .catch(err => console.error(err));

        notificationService.subscribe((message: string) => {
            try {
                const messageJson = JSON.parse(message)
                console.log(messageJson)
                switch (messageJson.type) {
                    case NOTIFICATION_TYPES.APPLY:
                        this.setState(state => ({
                            ...state,
                            notifications: [messageJson, ...state.notifications],
                        }))
                        break;
                    case NOTIFICATION_TYPES.RESUME_DOWNLOAD:
                        this.setState(state => ({
                            ...state,
                            notifications: [messageJson, ...state.notifications],
                        }))
                        break;
                }
            } catch (e) {
                console.error(e);
            }
        })
    }

    onClose = () => {
        const items = [...this.state.notifications];
        items.forEach(n => {
            n.is_viewed = true;
        });

        this.setState(state => ({
            ...state,
            notifications: items,
        }));
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
                                    ?.slice(0, this.state.limit)
                                    .map(n => (
                                        n.type === 'apply' ? (
                                            <NotificationCard
                                                type={n.type}
                                                vacancyTitle={n.title}
                                                vacancyID={n.object_id}
                                                isWatched={n.is_viewed}
                                            />
                                        ) : (
                                            <NotificationCard
                                                type={n.type}
                                                resumeTitle={n.title}
                                                resumeID={n.object_id}
                                                companyName={n.company_name}
                                                companyID={n.company_id}
                                                isWatched={n.is_viewed}
                                            />
                                        )
                                    ))}
                            </div>
                        )}
                    </div>
                }
                direction={'left'}
                onClose={this.onClose.bind(this)}
            />
        )
    }
}
