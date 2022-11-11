import { Component } from '../../../../Reacts';
import styles from './header.module.scss';
import HeaderProfile from './HeaderProfile';
import JobflowLogo from '../JobflowLogo';
import Link from '../../Link/Link';
import Preloader from '../prelodaer/Preloader';
import { userConnect } from '../../../store';
import RenderWithCondition from '../../RenderWithCondition';
import {
    RESUME_PATHS,
    START_PATH,
    VACANCIES_PATH,
} from '../../../utils/routerConstants';

// TODO: refactor
class Header extends Component<{ userType: string }> {
    setActive = (event: MouseEvent) => {
        let cur = document.querySelector(`.${styles.item__active}`);
        let target = event.target as Element;

        if (cur !== null && target !== cur) {
            cur.classList.remove(`${styles.item__active}`);
            target.classList.add(`${styles.item__active}`);
        }
    };

    render() {
        return (
            <header
                className={`x-0 t-0 border-bottom-light fixed ${styles.header}`}
            >
                <Preloader />
                <div
                    key={'content'}
                    className={`flex h-100 screen-responsive row align-items-center justify-content-space-evenly`}
                >
                    <div className={`flex w-100 align-items-center`}>
                        <Link to={START_PATH} content={<JobflowLogo />} />
                    </div>
                    <div
                        id={'links-group'}
                        className={`flex justify-content-center w-100 g-16 ${styles.items}`}
                    >
                        <Link
                            to={VACANCIES_PATH}
                            content={
                                <p
                                    key={'item1'}
                                    id={'item1'}
                                    className={`${styles.item__def} ${styles.item__active}`}
                                    onClick={this.setActive}
                                >
                                    Вакансии
                                </p>
                            }
                        />
                        <RenderWithCondition
                            condition={this.props.userType === 'applicant'}
                            onSuccess={
                                <Link
                                    to={RESUME_PATHS.NEW}
                                    content={
                                        <p
                                            key={'item3'}
                                            id={'item3'}
                                            className={styles.item__def}
                                            onClick={this.setActive}
                                        >
                                            Создать резюме
                                        </p>
                                    }
                                />
                            }
                        />
                    </div>
                    <HeaderProfile />
                </div>
            </header>
        );
    }
}

export default userConnect(state => ({
    userType: state.userType,
}))(Header);
