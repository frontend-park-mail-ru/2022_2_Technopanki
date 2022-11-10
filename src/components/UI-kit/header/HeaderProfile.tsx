import { Component } from '../../../../Reacts';
import styles from './header.module.scss';
import { toggleTheme } from '../../../utils/toggleTheme';
import ThemeIcon from '../../../static/icons/theme.svg';
import Link from '../../Link/Link';
import HeaderModal from './HeaderModal';
import { userConnect } from '../../../store';
import { UserState } from '../../../store/user/types';
import HeaderUserInfo from './HeaderUserInfo';
import { SIGN_IN_PATH, SIGN_UP_PATH } from '../../../utils/routerConstants';

type HeaderProps = {
    id: string;
    name: string;
    surname: string;
    userType: string;
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
                        className={'inner-svg-h-24 cursor-pointer'}
                        dangerouslySetInnerHTML={{
                            __html: ThemeIcon,
                        }}
                    />
                    {this.props.authorized ? (
                        <Link
                            to={`/${
                                this.props.userType === 'applicant'
                                    ? 'applicant'
                                    : 'employer'
                            }/${this.props.id}`}
                            content={
                                <HeaderUserInfo
                                    key={'info'}
                                    imgSrc={'./'}
                                    name={this.props.name}
                                    surname={this.props.surname}
                                />
                            }
                        />
                    ) : (
                        <div
                            key={'login'}
                            className={'flex row g-24 align-items-center'}
                        >
                            <Link
                                to={SIGN_IN_PATH}
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
                                to={SIGN_UP_PATH}
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

export default userConnect((state: UserState): HeaderProps => {
    return {
        id: state.id,
        name: state.name,
        surname: state.surname,
        userType: state.userType,
        authorized: state.authorized,
    };
})(HeaderProfile);
