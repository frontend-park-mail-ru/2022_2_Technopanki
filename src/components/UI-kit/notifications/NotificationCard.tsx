import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './notifications.module.scss';
import Svg from '../../Svg';
import NewNotification from '../../../static/icons/new_notificantion.svg';
import TextLink from '../../TextLink/TextLink';

export default class NotificationCard extends ReactsComponent<{
    type: 'apply' | 'download resume'
}> {
    state = {
        isWatched: false
    }

    render() {
        return (
            <div className={`flex row align-items-center g-16 p-16 cursor-pointer ${styles.notification_card} ${styles.borderline}`}>
                {this.state.isWatched ? (
                    <div />
                ) : (
                    <Svg
                        src={NewNotification}
                        height={6}
                    />
                )}
                {this.props.type === 'download resume' ? (
                    <div>
                        <p>
                            Ваше резюме <TextLink to={'/'} content={
                            <span className={'color-blue'}>
                                            Фронтенд-разработчик
                                        </span>
                        }
                        /> скачал пользователь <TextLink to={'/'} content={
                            <span className={'color-blue'}>
                                            VK
                                        </span>
                        }
                        />
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>
                            Пользователь <TextLink to={'/'} content={
                            <span className={'color-blue'}>
                                            Захар Урванцев
                                        </span>
                        }
                        /> оставил отклик на вашу вакансию <TextLink to={'/'} content={
                            <span className={'color-blue'}>
                                            Фронтенд-разработчик
                                        </span>
                        }
                        />
                        </p>
                    </div>
                )}
            </div>
        )
    }
}