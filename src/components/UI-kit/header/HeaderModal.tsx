import styles from './header.module.scss';
import MenuIcon from '../../../static/icons/menu.svg';
import ModalWindow from '../modalWindow/ModalWindow';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import RenderWithCondition from '../../RenderWithCondition';
import Link from '../../Link/Link';
import { toggleTheme } from '../../../utils/toggleTheme';
import { dispatch, userConnect } from '../../../store';
import HeaderProfile from './HeaderProfile';
import { authService } from '../../../services/authService';
import { userActions } from '../../../store/user/actions';
import navigator from '../../../router/navigator';
import { IMAGE_URL } from '../../../utils/networkConstants';
import {
    SIGN_IN_PATH,
    SIGN_UP_PATH,
    SEARCH_PATH,
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
                    <div
                        className={`flex rounded-lg p-4 background-0 ${styles.modal}`}
                    >
                        <div
                            id={'links-group'}
                            className={`flex column justify-content-center w-100 g-8`}
                        >
                            <RenderWithCondition
                                condition={this.props.authorized}
                                onSuccess={
                                    <div className={'flex g-8 column'}>
                                        <div className={styles['modal-item']}>
                                            <Link
                                                to={`/${
                                                    this.props.userType ===
                                                    'applicant'
                                                        ? 'applicant'
                                                        : 'employer'
                                                }/${this.props.id}`}
                                                content={
                                                    <div
                                                        className={
                                                            'flex row g-8 align-items-center'
                                                        }
                                                    >
                                                        <img
                                                            src={
                                                                IMAGE_URL +
                                                                this.props
                                                                    .avatarSrc
                                                            }
                                                            height={24}
                                                            width={24}
                                                            alt={'avatar'}
                                                        />
                                                        <p>
                                                            {this.props.name}{' '}
                                                            {this.props.surname}
                                                        </p>
                                                    </div>
                                                }
                                            />
                                        </div>
                                        <a
                                            onClick={this.logout}
                                            className={styles['modal-item']}
                                        >
                                            Выйти из аккаунта
                                        </a>
                                    </div>
                                }
                            />
                            <a
                                onClick={(e: MouseEvent) => {
                                    e.stopPropagation();
                                    toggleTheme();
                                }}
                                className={`${styles['modal-item']}`}
                            >
                                Переключить тему
                            </a>
                            <a
                                id={'item1'}
                                className={`mt-16 ${styles['modal-item']}`}
                            >
                                <Link to={SEARCH_PATH} content={'Вакансии'} />
                            </a>
                            <RenderWithCondition
                                condition={this.props.userType === 'applicant'}
                                onSuccess={
                                    <a
                                        id={'item3'}
                                        className={styles['modal-item']}
                                    >
                                        Создать резюме
                                    </a>
                                }
                            />
                            <Link
                                to={SIGN_UP_PATH}
                                content={
                                    <a className={styles['modal-item']}>
                                        Зарегистрироваться
                                    </a>
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
