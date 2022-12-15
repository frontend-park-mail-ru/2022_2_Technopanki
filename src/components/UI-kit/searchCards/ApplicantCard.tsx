import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './searchCards.module.scss';
import Link from '../../Link/Link';
import {
    APPLICANT_PATHS,
    EMPLOYER_PATHS,
    RESUME_PATHS,
} from '../../../utils/routerConstants';
import Button from '../buttons/Button';

export default class ApplicantCard extends ReactsComponent<{
    id: string;
    imgSrc: string;
    name: string;
    surname: string;
    description: string;
}> {
    render() {
        return (
            <div
                className={`flex column g-24 rounded-lg p-24 col-md-4 ${styles.card}`}
            >
                <div className={'flex row g-16'}>
                    <img
                        className={styles.resume_img}
                        src={this.props.imgSrc}
                        alt={'avatar'}
                    />
                    <p>
                        {this.props.name} {this.props.surname}
                    </p>
                </div>
                <div className={`mx-0 ${styles.description_text}`}>
                    {this.props.description}
                </div>
                <Link
                    to={APPLICANT_PATHS.PROFILE + this.props.id}
                    content={
                        <div className={`${styles.details_button}`}>
                            <Button>Подробнее</Button>
                        </div>
                    }
                />
            </div>
        );
    }
}
