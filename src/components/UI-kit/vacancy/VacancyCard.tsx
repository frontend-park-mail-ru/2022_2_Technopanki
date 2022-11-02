import { Component } from '../../../../Reacts';
import styles from '../../../views/Vacancies/vacancies.module.scss';
import Location from '../../../static/icons/location.svg';
import Clock from '../../../static/icons/clock.svg';
import Calendar from '../../../static/icons/calendar.svg';
import ArrowDown from '../../../static/icons/small_arrow_down.svg';
import ArrowUp from '../../../static/icons/small_arrow_up.svg';
import Hr from '../../../static/icons/hr.svg';
import ArrowButtonWithTextOutline from '../buttons/ArrowButtonWithTextOutline';
import { VNodeType } from '../../../../Reacts/shared/common';

export type VacancyCardPropsType = {
    name: string;
    icon: string;
    salary: string;
    currency: string;
    location: string;
    format: string;
    hours: string;
    description: string;
};

export default class VacancyCard extends Component<
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
            <div
                className={`grid grid-template-columns g-16 rounded-lg p-24 ${styles.vacancy}`}
            >
                <div
                    key={'vacancy-icon'}
                    className={`cursor-pointer ${styles.icon}`}
                    dangerouslySetInnerHTML={{ __html: this.props.icon }}
                />
                <div
                    key={'vacancy-data'}
                    className={'flex flex-start column g-2'}
                >
                    <h4
                        key={'vacancy-name'}
                        className={`cursor-pointer ${styles.vacancy_name}`}
                    >
                        {this.props.name}
                    </h4>
                    <div
                        key={'vacancy-metadata'}
                        className={'flex flex-start row g-16'}
                    >
                        <div className={'flex row align-items-center g-6'}>
                            <div
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Location }}
                            />
                            <div className={`${styles.metadata}`}>
                                {this.props.location}
                            </div>
                        </div>
                        <div className={'flex row align-items-center g-6'}>
                            <div
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Clock }}
                            />
                            <div className={`${styles.metadata}`}>
                                {this.props.format}
                            </div>
                        </div>
                        <div className={'flex row align-items-center g-6'}>
                            <div
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Calendar }}
                            />
                            <div className={`${styles.metadata}`}>
                                {this.props.hours}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    key={'vacancy-salary'}
                    className={'flex row g-4 mx-0 justify-content-end'}
                >
                    <h4 className={`mx-0 ${styles.salary}`}>
                        {`${this.props.salary}${this.props.currency}`}
                    </h4>
                    <h4 className={`mx-0 ${styles.per_month}`}>в месяц</h4>
                </div>
                <div className={styles.link}>
                    <ArrowButtonWithTextOutline key={'vacancy-link'}>
                        <p>Посмотреть вакансию</p>
                    </ArrowButtonWithTextOutline>
                </div>
                <div
                    className={`flex row g-4 justify-content-end align-items-end ${styles.details}`}
                >
                    <p
                        className={`cursor-pointer ${styles.details_text}`}
                        onClick={this.handleDetails}
                    >
                        Детали
                    </p>
                    <div
                        className={`cursor-pointer ${styles.arrow}`}
                        dangerouslySetInnerHTML={
                            this.state.isOpen
                                ? { __html: ArrowUp }
                                : { __html: ArrowDown }
                        }
                        onClick={this.handleDetails}
                    />
                </div>
                {this.state.isOpen ? (
                    <div className={`flex column g-12 ${styles.description}`}>
                        <div
                            className={'w-100'}
                            dangerouslySetInnerHTML={{ __html: Hr }}
                        />
                        <h5 className={'mx-0'}>Описание вакансии</h5>
                        <p className={styles.description_text}>
                            {this.props.description}
                        </p>
                    </div>
                ) : (
                    <p></p>
                )}
            </div>
        );
    }
}
