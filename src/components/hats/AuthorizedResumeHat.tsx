import { Component } from '../../../Reacts';
import ButtonIcon from '../UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../static/icons/phone.svg';
import MailIcon from '../../static/icons/mail.svg';
import ResumeIcon from '../../static/icons/resume.svg';
import Hat from '../UI-kit/hat/Hat';
import Button from '../UI-kit/buttons/Button';
import Link from '../Link/Link';

export default class ResumeHat extends Component<{
    imgSrc: string;
    name: string;
    surname: string;
    description: string;
}> {
    render() {
        return (
            <Hat
                imgSrc={'http://95.163.208.72:8000/image/applicant.png'}
                name={this.props.name}
                surname={this.props.surname}
                description={this.props.description}
                rightSideContent={
                    <Link
                        to={'/resume/settings'}
                        content={<Button>Настройки</Button>}
                    />
                }
            />
        );
    }
}
