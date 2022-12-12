import styles from './header.module.scss';
import { toggleTheme } from '../../../utils/toggleTheme';
import Link from '../../Link/Link';
import HeaderModal from './HeaderModal';
import { userConnect } from '../../../store';
import { UserState } from '../../../store/user/types';
import HeaderUserInfo from './HeaderUserInfo';
import { SIGN_IN_PATH, SIGN_UP_PATH } from '../../../utils/routerConstants';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import NotificationWindow from '../notifications/NotificationsWindow';

type HeaderProps = {
    id: string;
    name: string;
    surname: string;
    userType: string;
    imgSrc: string;
    authorized: boolean;
};

class HeaderProfile extends ReactsComponent<HeaderProps> {
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
                    <HeaderModal />
                </div>
            </div>
        );
    }
}

export default userConnect((state: UserState): HeaderProps => {
    return {
        id: state.id,
        name: state.name,
        surname: state.surname,
        imgSrc: state.avatarSrc,
        userType: state.userType as string,
        authorized: state.authorized,
    };
})(HeaderProfile);
