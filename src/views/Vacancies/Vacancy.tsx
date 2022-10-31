import { Component } from '../../../Reacts';
import styles from './vacancies.module.scss'
import Location from '../../static/icons/location.svg'
import Clock from '../../static/icons/clock.svg'
import Calendar from '../../static/icons/calendar.svg'
import SmallArrow from '../../static/icons/small_arrow.svg'
import ArrowButtonWithTextOutline from '../../components/UI-kit/buttons/ArrowButtonWithTextOutline';

enum Format {
    Mixed = 'Смешанный формат',
    Remote = 'Удаленный формат'
}

export default class Vacancy extends Component<{
    name: string
    icon: string
    salary: string
    currency: string
    location: string
    format: string
    hours: string

}> {
    render() {
        return (
            <div
                className={`grid grid-template-columns g-16 rounded-lg p-24 ${styles.vacancy}`}
            >
                <div
                    key={'vacancy-icon'}
                    className={`${styles.icon}`}
                    dangerouslySetInnerHTML={{ __html: this.props.icon }}
                />
                <div
                    key={'vacancy-data'}
                    className={'flex flex-start column g-2'}
                >
                    <h4
                        key={'vacancy-name'}
                        className={`${styles.vacancy_name}`}
                    >
                        { this.props.name }
                    </h4>
                    <div
                        key={'vacancy-metadata'}
                        className={'flex flex-start row g-16'}
                    >
                        <div
                            className={'flex row align-items-center g-6'}
                        >
                            <div
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Location }}
                            />
                            <div
                                className={`${styles.metadata}`}
                            >
                                { this.props.location }
                            </div>
                        </div>
                        <div
                            className={'flex row align-items-center g-6'}
                        >
                            <div
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Clock }}
                            />
                            <div
                                className={`${styles.metadata}`}
                            >
                                { this.props.format }
                            </div>
                        </div>
                        <div
                            className={'flex row align-items-center g-6'}
                        >
                            <div
                                className={`${styles.metadata_icon}`}
                                dangerouslySetInnerHTML={{ __html: Calendar }}
                            />
                            <div
                                className={`${styles.metadata}`}
                            >
                                { this.props.hours }
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    key={'vacancy-salary'}
                    className={'flex row g-4 mx-0 justify-content-end'}
                >
                    <h4
                        className={`mx-0 ${styles.salary}`}
                    >
                        { `${this.props.salary}${this.props.currency}` }
                    </h4>
                    <h4
                        className={`mx-0 ${styles.per_month}`}
                    >
                        в месяц
                    </h4>
                </div>
                <div
                    className={styles.link}
                >
                    <ArrowButtonWithTextOutline key={'vacancy-link'}>
                        <p>Посмотреть вакансию</p>
                    </ArrowButtonWithTextOutline>
                </div>
                <div
                    className={`flex row g-4 justify-content-end align-items-end ${styles.details}`}
                >
                    <p
                        className={`cursor-pointer ${styles.details_text}`}
                    >
                        Детали
                    </p>
                    <div
                        className={`cursor-pointer ${styles.arrow}`}
                        dangerouslySetInnerHTML={{ __html: SmallArrow }}
                    />
                </div>
            </div>
        )
    }
}