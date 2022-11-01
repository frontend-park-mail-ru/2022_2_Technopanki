import { Component } from '../../../../Reacts';
import styles from './header.module.scss';
import { toggleTheme } from '../../../toggleTheme';
import ThemeIcon from '../../../static/icons/theme.svg';
import Link from '../../Link/Link';
import HeaderModal from './HeaderModal';
import { userConnect } from '../../../store';
import { StoreType } from '../../../../Fluxs/types/store';
import { UserStore } from '../../../store/user/types';

type HeaderProps = {
    name: string;
    surname: string;
    authorized: boolean;
};

class HeaderProfile extends Component<HeaderProps> {
    render() {
        if (this.props.authorized) {
            console.log('Authorized!!!  ');
            console.log(this.props);
        } else {
            console.log('Not Authorized');
        }
        return (
            <div className={'flex-wrap w-100'}>
                <div
                    className={`flex row w-100 align-items-center justify-content-end ${styles.auth}`}
                >
                    {this.props.authorized ? (
                        <div className={'flex row g-24 align-items-center'}>
                            <p>{this.props.name}</p>
                            <p>{this.props.surname}</p>
                        </div>
                    ) : (
                        <div className={'flex row g-24 align-items-center'}>
                            <div
                                key={'theme_toggle'}
                                onClick={toggleTheme}
                                className={'inner-svg-h-24'}
                                dangerouslySetInnerHTML={{
                                    __html: ThemeIcon,
                                }}
                            />
                            <Link
                                to={'/signin'}
                                content={
                                    <p
                                        key={'signin-link'}
                                        className={styles.item__def}
                                    >
                                        Войти
                                    </p>
                                }
                            />
                            <Link
                                to={'/signup'}
                                content={
                                    <p
                                        key={'signup-link'}
                                        className={styles.signup}
                                    >
                                        Зарегистрироваться
                                    </p>
                                }
                            />
                        </div>
                    )}
                </div>
                <HeaderModal />
            </div>
        );
    }
}

export default userConnect(
    (store: StoreType<UserStore>): HeaderProps => ({
        name: store.getState().name,
        surname: store.getState().surname,
        authorized: store.getState().authorized,
    }),
)(HeaderProfile);
