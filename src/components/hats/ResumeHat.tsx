import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import ButtonIcon from '../UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../static/icons/phone.svg';
import MailIcon from '../../static/icons/mail.svg';
import ResumeIcon from '../../static/icons/resume.svg';
import Hat from '../UI-kit/hat/Hat';
import { resumeService } from '../../services/resume/resumeService';

export default class ResumeHat extends ReactsComponent<{
    id: string;
    imgSrc: string;
    name: string;
    surname: string;
    description: string;
}> {
    render() {
        return (
            <Hat
                imgSrc={'../image/applicant.png'}
                name={this.props.name}
                surname={this.props.surname}
                status={this.props.description}
                rightSideContent={
                    <div className={'flex row flex-wrap g-12'}>
                        <ButtonIcon icon={PhoneIcon} />
                        <ButtonIcon icon={MailIcon} />
                        <ButtonIcon onClick={() => resumeService.downloadResume(this.props.id)} icon={ResumeIcon}>
                            Скачать резюме в PDF
                        </ButtonIcon>
                    </div>
                }
            />
        );
    }
}
