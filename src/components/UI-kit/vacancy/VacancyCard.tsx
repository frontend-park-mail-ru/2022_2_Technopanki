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
import Link from '../../Link/Link';
import { EMPLOYER_PATHS, VACANCY_PATHS } from '../../../utils/routerConstants';
import { IMAGE_URL } from '../../../utils/networkConstants';

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
                <img
                    key={'img'}
                    className={'rounded-md'}
                    height={40}
                    width={40}
                    src={IMAGE_URL + this.props.icon}
                />
                <div
                    key={'vacancy-data'}
                    className={'flex flex-start column g-4'}
                >
                    <Link
                        key={'vacancy-name'}
                        to={VACANCY_PATHS.INDEX + this.props.id}
                        content={
                            <h4
                                key={'vacancy-name'}
                                className={`cursor-pointer ${styles.vacancy_name}`}
                            >
                                {this.props.name}
                            </h4>
                        }
                    />
                    <div
                        key={'vacancy-metadata'}
                        className={'flex flex-start row g-16'}
                    >
                        <div
                            key={'location'}
                            className={'flex row align-items-center g-6'}
                        >
                            <div
                                key={'meta'}
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Location }}
                            />
                            <div
                                key={'location'}
                                className={`${styles.metadata}`}
                            >
                                {this.props.location}
                            </div>
                        </div>
                        <div
                            key={'clock'}
                            className={'flex row align-items-center g-6'}
                        >
                            <div
                                key={'clock'}
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Clock }}
                            />
                            <div
                                key={'format'}
                                className={`${styles.metadata}`}
                            >
                                {this.props.format}
                            </div>
                        </div>
                        <div
                            key={'icon'}
                            className={'flex row align-items-center g-6'}
                        >
                            <div
                                key={'icon'}
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Calendar }}
                            />
                            <div key={'hours'} className={`${styles.metadata}`}>
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
                        {this.props.salary}
                    </h4>
                    <h4 className={`mx-0 ${styles.per_month}`}>руб/мес</h4>
                </div>
                <div key={'vacancy'} className={styles.link}>
                    <div className={'none'}></div>
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
                    key={'details'}
                    className={`flex row g-4 justify-content-end align-items-end ${styles.details}`}
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
