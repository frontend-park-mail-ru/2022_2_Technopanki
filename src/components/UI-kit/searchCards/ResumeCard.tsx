import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { resumeService } from '../../../services/resume/resumeService';
import { IMAGE_URL } from '../../../utils/networkConstants';
import styles from './searchCards.module.scss';
import Button from '../buttons/Button';
import Link from '../../Link/Link';
import { RESUME_PATHS } from '../../../utils/routerConstants';

export default class ResumeCard extends ReactsComponent<{
    id: string;
    imgSrc: string;
    name: string;
    surname: string;
    title: string;
    postedByUserID: string;
    description: string;
}> {
    state = {
        imgSrc: this.props.imgSrc,
        name: this.props.name,
        surname: this.props.surname,
    };

    getCreatorDataFromServer = () => {
        if (this.state.surname !== '') {
            resumeService
                .getResumeHatData(this.props.postedByUserID)
                .then(body => {
                    this.setState(() => ({
                        imgSrc: IMAGE_URL + body.image ?? body.imgSrc,
                        name: body.applicant_name,
                        surname: body.applicant_surname,
                        status: body.status,
                    }));
                });
        }
    };

    componentDidMount() {
        this.getCreatorDataFromServer();
    }

    render() {
        return (
            <div className={`flex column g-24 rounded-lg p-24 ${styles.card}`}>
                <div className={'flex row g-16'}>
                    <img
                        className={styles.resume_img}
                        src={this.state.imgSrc}
                        alt={'avatar'}
                    />
                    <p>
                        {this.state.name} {this.state.surname}
                    </p>
                </div>
                <div className={`flex column g-4`}>
                    <p className={`mx-0`}>{this.props.title}</p>
                    <div className={`mx-0 ${styles.description_text}`}>
                        {this.props.description}
                    </div>
                </div>
                <Link
                    to={RESUME_PATHS.INDEX + this.props.id}
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
