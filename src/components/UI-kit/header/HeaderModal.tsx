import styles from './header.module.scss';
import MenuIcon from '../../../static/icons/menu.svg';
import ModalWindow from '../modalWindow/ModalWindow';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import RenderWithCondition from '../../RenderWithCondition';
import Link from '../../Link/Link';
import { toggleTheme } from '../../../utils/toggleTheme';
import { dispatch, userConnect } from '../../../store';
import { authService, USER_TYPE } from '../../../services/auth/authService';
import { userActions } from '../../../store/user/actions';
import navigator from '../../../router/navigator';
import {
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    SEARCH_PATHS,
} from '../../../utils/routerConstants';

class HeaderModal extends ReactsComponent<{
    authorized: boolean;
    name: string;
    surname: string;
    avatarSrc: string;
    userType: string;
    id: string;
}> {
    logout() {
        authService
            .logout()
            .then(() => {
                dispatch(userActions.LOGOUT());
                navigator.navigate('/');
            })
            .catch(err => console.error(err));
    }

    render() {
        return (
            <ModalWindow
                content={
                    <div
                        className={`flex g-24 w-100 justify-content-end ${styles.menu_icon}`}
                        dangerouslySetInnerHTML={{
                            __html: MenuIcon,
                        }}
                    ></div>
                }
                hidden={
                    <div className={`flex rounded-lg p-4 ${styles.modal}`}>
                        <div
                            id={'links-group'}
                          className={`flex column justify-content-center w-100 g-32`}
                       >
                            <RenderWithCondition
                                condition={this.props.authorized}
                                onSuccess={
                                    <div className={'flex g-16 column'}>
                                        <Link
                                            to={`/${
                                                this.props.userType ===
                                                'applicant'
                                                    ? 'applicant'
                                                    : 'employer'
                                            }/${this.props.id}`}
                                            content={
                                                <div
                                                    className={`flex row g-8 align-items-center justify-content-start ${styles['modal-item']}`}
                                                >
                                                    <img
                                                        src={
                                                            this.props.avatarSrc
                                                        }
                                                        height={24}
                                                        width={24}
                                                        className={
                                                            'rounded-max'
                                                        }
                                                    />
                                                    <p>
                                                        {`${this.props.name}
                                                            ${
                                                                this.props
                                                                    .surname
                                                                    ? this.props
                                                                          .surname
                                                                    : ''
                                                            }`}
                                                    </p>
                                                </div>
                                            }
                                        />
                                        <a
                                            onClick={this.logout}
                                            className={`${styles['modal-item']} cursor-pointer`}
                                        >
                                            Выйти из аккаунта
                                        </a>
                                    </div>
                                }
                            />
                            <div className={'flex g-16 column'}>
                                <a
                                    className={`cursor-pointer`}
                                    onClick={(e: MouseEvent) => {
                                        e.stopPropagation();
                                        toggleTheme();
                                    }}
                                >
                                    <p className={styles['modal-item']}>
                                        Переключить тему
                                    </p>
                                </a>
                                <Link
                                    to={SEARCH_PATHS.VACANCIES}
                                    content={
                                        <p className={styles['modal-item']}>
                                            Поиск
                                        </p>
                                    }
                                />
                            </div>
                            <RenderWithCondition
                                condition={!this.props.authorized}
                                onSuccess={
                                    <div className={'flex g-16 column'}>
                                        <Link
                                            to={SIGN_IN_PATH}
                                            content={
                                                <p
                                                    className={
                                                        styles['modal-item']
                                                    }
                                                >
                                                    Войти
                                                </p>
                                            }
                                        />
                                        <Link
                                            to={SIGN_UP_PATH}
                                            content={
                                                <p
                                                    className={
                                                        styles['modal-item']
                                                    }
                                                >
                                                    Зарегистрироваться
                                                </p>
                                            }
                                        />
                                    </div>
                                }
                            />
                        </div>
                    </div>
                }
            />
        );
    }
}

export default userConnect(state => ({
    ...state,
    name: state.name,
    surname: state.surname,
}))(HeaderModal);
