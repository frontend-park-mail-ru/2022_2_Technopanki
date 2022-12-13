import styles from './header.module.scss';
import { toggleTheme } from '../../../utils/toggleTheme';
import Link from '../../Link/Link';
import HeaderModal from './HeaderModal';
import { notificationConnect, userConnect } from '../../../store';
import { UserState } from '../../../store/user/types';
import HeaderUserInfo from './HeaderUserInfo';
import { SIGN_IN_PATH, SIGN_UP_PATH } from '../../../utils/routerConstants';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { notificationService } from '../../../services/notificationService';
import { notificationActions, NOTIFICATION_TYPES } from '../../../store/notification/action';
import { Notification } from '../../../store/notification/type';
import RenderWithCondition from '../../RenderWithCondition';

type HeaderProps = {
    id: string;
    name: string;
    surname: string;
    userType: string;
    imgSrc: string;
    authorized: boolean;
} & Notification;

class HeaderProfile extends ReactsComponent<HeaderProps> {
    componentDidMount(): void {
        notificationService.subscribe((message: string) => {
            try {
                const messageJson: Notification = JSON.parse(message)
                switch (messageJson.type) {
                    case NOTIFICATION_TYPES.APPLY:
                        notificationActions.notifyApply(
                            messageJson.notificationAuthor, messageJson.notificationAuthorID,
                            messageJson.resumeID, messageJson.resumeTitle
                        )
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
            <div className={'flex-wrap w-100'}>
                <div
                    className={`flex row w-100 g-40 align-items-center justify-content-end ${styles.auth}`}
                >
                    <NotificationWindow

                    />
                    {this.props.authorized ? (
                        <div>
                            <HeaderUserInfo
                                id={this.props.id}
                                imgSrc={this.props.imgSrc}
                                name={this.props.name}
                                surname={this.props.surname}
                                userType={this.props.userType}
                            />
                        </div>
                    ) : (
                        <div className={'flex row g-24 align-items-center'}>
                            <p className={'none'}></p>
                            <a
                                className={'cursor-pointer'}
                                onClick={toggleTheme}
                            >
                                Сменить тему
                            </a>
                            <Link
                                to={SIGN_IN_PATH}
                                content={
                                    <p className={styles.item__def}>Войти</p>
                                }
                            />
                            <Link
                                to={SIGN_UP_PATH}
                                content={
                                    <p className={styles.signup}>
                                        Зарегистрироваться
                                    </p>
                                }
                            />
                        </div>
                    )}
                </div>
                <div className={'w-100 flex row justify-content-end'}>
                    <RenderWithCondition condition={this.props.type === NOTIFICATION_TYPES.APPLY} onSuccess={<p>{this.props.vacancyTitle}</p>} />
                    <RenderWithCondition condition={this.props.type === NOTIFICATION_TYPES.RESUME_DOWNLOAD} onSuccess={<p>{this.props.resumeTitle}</p>} />
                    <HeaderModal />
                </div>
                <div>
                    <p>{this.props.notificationAuthor}</p>
                </div>
            </div>
        );
    }
}

const NotificationWrapper = notificationConnect((state: Notification, props): HeaderProps => ({
    ...state,
    ...props,
} as HeaderProps))(HeaderProfile)

export default userConnect((state: UserState) => {
    return {
        id: state.id,
        name: state.name,
        surname: state.surname,
        imgSrc: state.avatarSrc,
        userType: state.userType as string,
        authorized: state.authorized,
    };
})(NotificationWrapper);
