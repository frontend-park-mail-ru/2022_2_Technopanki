import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Logo from '../../static/assets/JobflowDefault.svg';
import Illustration from '../../static/assets/illustration.svg';
import styles from './description.module.scss';
import Link from '../Link';
import { START_PATH } from '../../utils/routerConstants';

export default class Description extends ReactsComponent {
    render() {
        return (
            <div className={`col-md-6 col-0 ${styles.description} relative`}>
                <div className={`flex column g-24 ${styles.description_text}`}>
                    <Link
                        to={START_PATH}
                        content={
                            <div
                                className={'inner-svg-h-16 cursor-pointer'}
                                dangerouslySetInnerHTML={{ __html: Logo }}
                            ></div>
                        }
                    />
                    <h3 className={styles.description_header}>
                        Создай свою команду. Найди свою миссию
                    </h3>
                    <p className={styles.description_p}>
                        Мы создаем передовые технологии на всех доступных
                        платформах для того, чтобы работодатели могли быстро
                        найти подходящего сотрудника, а соискатели — хорошую
                        работу.
                    </p>
                </div>
                <div
                    className={`absolute l-24 r-0 b-0 ${styles.description_illustration}`}
                    dangerouslySetInnerHTML={{ __html: Illustration }}
                ></div>
            </div>
        );
    }
}
