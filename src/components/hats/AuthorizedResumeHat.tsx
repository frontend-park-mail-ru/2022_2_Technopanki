import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import ButtonIcon from '../UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../static/icons/phone.svg';
import MailIcon from '../../static/icons/mail.svg';
import ResumeIcon from '../../static/icons/resume.svg';
import Hat from '../UI-kit/hat/Hat';
import Button from '../UI-kit/buttons/Button';
import Link from '../Link/Link';

export default class ResumeHat extends ReactsComponent<{
    imgSrc: string;
    name: string;
    surname: string;
    description: string;
}> {
    render() {
        return (
            <Hat
                imgSrc={'./applicant.png'}
                name={this.props.name}
                surname={this.props.surname}
                status={this.props.description}
                rightSideContent={
                    <Link
                        to={'/resume/settings'}
                        content={<Button>Редактировать</Button>}
                    />
                }
            />
        );
    }
}
