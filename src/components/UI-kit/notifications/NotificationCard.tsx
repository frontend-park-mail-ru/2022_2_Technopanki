import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './notifications.module.scss';
import Svg from '../../Svg';
import NewNotification from '../../../static/icons/new_notificantion.svg';
import TextLink from '../../TextLink/TextLink';
import { EMPLOYER_PATHS, RESUME_PATHS, VACANCY_PATHS } from '../../../utils/routerConstants';

export default class NotificationCard extends ReactsComponent<{
    type: 'apply' | 'download resume'
    vacancyID: string;
    vacancyTitle: string;
    resumeID: string;
    resumeTitle: string;
    companyName: string;
    companyID: string;
    isWatched: boolean;
}> {
    state = {
        isWatched: false
    }

    render() {
        return (
            <div className={`flex row align-items-center g-16 p-16 cursor-pointer ${styles.notification_card} ${styles.borderline}`}>
                {this.props.isWatched ? null : (
                    <Svg
                        src={NewNotification}
                        height={6}
                    />
                )}
                {this.props.type === 'download resume' ? (
                    <div>
                        <p>
                            Ваше резюме <TextLink to={RESUME_PATHS.INDEX + this.props.resumeID} content={
                            <span className={'color-blue'}>
                                            {this.props.resumeTitle}
                                        </span>
                        }
                        /> скачал пользователь <TextLink to={EMPLOYER_PATHS.PROFILE + this.props.companyID} content={
                            <span className={'color-blue'}>
                                            {this.props.companyName}
                                        </span>
                        }
                        />
                        </p>
                    </div>
                ) : (
                    <div>
                        <p>
                            На вашу вакансию <TextLink to={VACANCY_PATHS.INDEX + this.props.vacancyID} content={
                            <span className={'color-blue'}>
                                            {this.props.vacancyTitle}
                                        </span>
                        }
                        /> был оставлен новый <TextLink to={VACANCY_PATHS.RESUME_LIST + this.props.vacancyID} content={
                            <span className={'color-blue'}>
                                            отклик
                                        </span>
                        }
                        />
                        </p>
                    </div>
                )}
            </div>
        )
    }
}
