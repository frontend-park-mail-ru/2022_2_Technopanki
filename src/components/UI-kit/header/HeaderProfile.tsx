import { Component } from '../../../../Reacts';
import styles from './header.module.scss';
import { toggleTheme } from '../../../toggleTheme';
import ThemeIcon from '../../../static/icons/theme.svg';
import Link from '../../Link/Link';
import HeaderModal from './HeaderModal';
import { userConnect } from '../../../store';
import { StoreType } from '../../../../Fluxs/types/store';
import { UserStore } from '../../../store/user/types';
import HeaderUserInfo from './HeaderUserInfo';

type HeaderProps = {
    name: string;
    surname: string;
    authorized: boolean;
};

class HeaderProfile extends Component<HeaderProps> {
    render() {
        return (
            <div className={'flex-wrap w-100'}>
                <div
                    key={'data'}
                    className={`flex row w-100 g-40 align-items-center justify-content-end ${styles.auth}`}
                >
                    <div
                        key={'theme_toggle'}
                        onClick={toggleTheme}
                        className={'inner-svg-h-24'}
                        dangerouslySetInnerHTML={{
                            __html: ThemeIcon,
                        }}
                    />
                    {this.props.authorized ? (
                        <HeaderUserInfo
                            key={'info'}
                            imgSrc={'./'}
                            name={this.props.name}
                            surname={this.props.surname}
                        />
                    ) : (
                        <div
                            key={'login'}
                            className={'flex row g-24 align-items-center'}
                        >
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
                <div
                    key={'modal'}
                    className={'w-100 flex row justify-content-end'}
                >
                    <HeaderModal />
                </div>
            </div>
        );
    }
}

export default userConnect((store: StoreType<UserStore>): HeaderProps => {
    return {
        name: store.getState().name,
        surname: store.getState().surname,
        authorized: store.getState().authorized,
    };
})(HeaderProfile);
