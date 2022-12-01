import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './searchCards.module.scss';
import Location from '../../../static/icons/location.svg';
import Clock from '../../../static/icons/clock.svg';
import Calendar from '../../../static/icons/calendar.svg';
import ArrowDown from '../../../static/icons/small_arrow_down.svg';
import ArrowUp from '../../../static/icons/small_arrow_up.svg';
import Hr from '../../../static/icons/hr.svg';
import ArrowButtonWithTextOutline from '../buttons/ArrowButtonWithTextOutline';
import Link from '../../Link/Link';
import { VACANCY_PATHS } from '../../../utils/routerConstants';
import { IMAGE_URL } from '../../../utils/networkConstants';
import RenderWithCondition from '../../RenderWithCondition';

export type VacancyCardPropsType = {
    id: string;
    name: string;
    icon: string;
    salary: string;
    currency: string;
    location: string;
    format: string;
    hours: string;
    description: string;
};

export default class VacancyCard extends ReactsComponent<
    VacancyCardPropsType,
    {
        isOpen: boolean;
    }
> {
    state = {
        isOpen: false,
    };

    handleDetails = (e: MouseEvent) => {
        this.setState(state => ({
            ...state,
            isOpen: !this.state.isOpen,
        }));
    };

    render() {
        return (
            <div className={`g-16 rounded-lg p-24 ${styles.card}`}>
                <img
                    key={'img'}
                    className={'rounded-md'}
                    height={40}
                    width={40}
                    src={IMAGE_URL + this.props.icon}
                />
                <div
                    className={`flex flex-wrap flex-start column g-4 ${styles['card-content']}`}
                >
                    <Link
                        to={VACANCY_PATHS.INDEX + this.props.id}
                        content={
                            <h4 className={`${styles.vacancy_name}`}>
                                {this.props.name}
                            </h4>
                        }
                    />
                    <div
                        className={`flex flex-wrap hidden row g-16 ${styles.metadata}`}
                    >
                        <div className={'flex row align-items-center g-6'}>
                            <div
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Location }}
                            />
                            <div className={`${styles['metadata-item']}`}>
                                {this.props.location}
                            </div>
                        </div>
                        <div className={'flex row align-items-center g-6'}>
                            <div
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Clock }}
                            />
                            <div className={`${styles['metadata-item']}`}>
                                {this.props.format}
                            </div>
                        </div>
                        <div className={'flex row align-items-center g-6'}>
                            <div
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Calendar }}
                            />
                            <div className={`${styles['metadata-item']}`}>
                                {this.props.hours}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={`flex row g-4 mx-0 justify-content-end ${styles.salary}`}
                >
                    <h4 className={`mx-0 ${styles['salary-content']}`}>
                        {this.props.salary}
                        <span className={styles.per_month}> руб/мес</span>
                    </h4>
                </div>
                <div className={styles.link}>
                    <Link
                        to={VACANCY_PATHS.INDEX + this.props.id}
                        content={
                            <ArrowButtonWithTextOutline>
                                <p>Посмотреть вакансию</p>
                            </ArrowButtonWithTextOutline>
                        }
                    />
                </div>
                <div
                    className={`flex row g-4 justify-content-end align-items-center ${styles.details}`}
                >
                    <div
                        className={
                            'flex align-items-end g-8 justify-content-center cursor-pointer'
                        }
                        onClick={this.handleDetails}
                    >
                        <p className={`${styles.details_text}`}>Детали</p>
                        <div
                            className={`${
                                this.state.isOpen ? 'pb-2' : 'pb-4'
                            } ${styles.arrow}`}
                            dangerouslySetInnerHTML={
                                this.state.isOpen
                                    ? { __html: ArrowUp }
                                    : { __html: ArrowDown }
                            }
                        />
                    </div>
                </div>
                <RenderWithCondition
                    condition={this.state.isOpen}
                    onSuccess={
                        <div
                            className={`flex column g-12 ${styles.description}`}
                        >
                            <div
                                className={'w-100'}
                                dangerouslySetInnerHTML={{ __html: Hr }}
                            />
                            <h5 className={'mx-0'}>Описание вакансии</h5>
                            <p className={styles.description_text}>
                                {this.props.description}
                            </p>
                        </div>
                    }
                />
            </div>
        );
    }
}
