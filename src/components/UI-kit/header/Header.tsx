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
    SEARCH_PATH,
} from '../../../utils/routerConstants';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Svg from '../../Svg';
import Bell from '../../../static/icons/bell.svg'

class Header extends ReactsComponent<{ userType: string }> {
    setActive = (event: MouseEvent) => {
        let cur = document.querySelector(`.${styles.item__active}`);
        let target = event.target as Element;

        if (cur !== null && target !== cur) {
            cur.classList.remove(`${styles.item__active}`);
            target.classList.add(`${styles.item__active}`);
        }
    };

    

    shouldUpdate(
        nextProps: Readonly<{ userType: string }> | { userType: string },
    ): boolean {
        return this.props.userType !== nextProps.userType;
    }

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
                            to={SEARCH_PATH}
                            content={
                                <p
                                    key={'item1'}
                                    id={'item1'}
                                    className={`${styles.item__def} ${styles.item__active}`}
                                    onClick={this.setActive}
                                >
                                    Поиск
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
