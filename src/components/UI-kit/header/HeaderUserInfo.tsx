import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './header.module.scss';
import { toggleTheme } from '../../../utils/toggleTheme';
import Link from '../../Link/Link';
import { authService } from '../../../services/authService';
import { dispatch } from '../../../store';
import { userActions } from '../../../store/user/actions';
import navigator from '../../../router/navigator';

export default class HeaderUserInfo extends ReactsComponent<
    {
        id: string;
        imgSrc: string;
        name: string;
        surname: string;
        userType: string;
    },
    { isOpen: boolean }
> {
    state = {
        isOpen: false,
    };

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
            <div
                // onClick={() =>
                //     this.setState(state => ({
                //         ...state,
                //         isOpen: !state.isOpen,
                //     }))
                // }
                onMouseOver={() => this.setState(() => ({ isOpen: true }))}
                className={'flex row g-16 cursor-pointer justify-content-end'}
            >
                <img
                    height={20}
                    width={20}
                    className={'h-24 w-24 rounded-md background-50'}
                    src={this.props.imgSrc}
                    alt={'profile'}
                />
                <div className={'flex row g-16 text-align-right'}>
                    <p>
                        {this.props.name} {this.props.surname}
                    </p>
                </div>
                <div
                    onMouseOut={() => this.setState(() => ({ isOpen: false }))}
                    className={`absolute transition-fast p-4 rounded-md background-0 border-light shadow-md ${
                        this.state.isOpen ? 'flex' : 'none'
                    } column g-8 ${styles.account}`}
                >
                    <div className={styles['account-link']}>
                        <Link
                            to={`/${
                                this.props.userType === 'applicant'
                                    ? 'applicant'
                                    : 'employer'
                            }/${this.props.id}`}
                            content={`${this.props.name} ${this.props.surname}`}
                        />
                    </div>
                    <a
                        onClick={(e: MouseEvent) => {
                            e.stopPropagation();
                            toggleTheme();
                        }}
                        className={styles['account-link']}
                    >
                        Переключить тему
                    </a>
                    <a onClick={this.logout} className={styles['account-link']}>
                        Выйти из аккаунта
                    </a>
                </div>
            </div>
        );
    }
}
