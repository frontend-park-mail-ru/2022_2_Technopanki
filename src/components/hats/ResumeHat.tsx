import { Component } from '../../../__Reacts__old_version__';
import ButtonIcon from '../UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../static/icons/phone.svg';
import MailIcon from '../../static/icons/mail.svg';
import ResumeIcon from '../../static/icons/resume.svg';
import Hat from '../UI-kit/hat/Hat';

export default class ResumeHat extends Component<{
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
                description={this.props.description}
                rightSideContent={
                    <div className={'flex row flex-wrap g-12'}>
                        <ButtonIcon icon={PhoneIcon} />
                        <ButtonIcon icon={MailIcon} />
                        <ButtonIcon icon={ResumeIcon}>
                            Скачать резюме в PDF
                        </ButtonIcon>
                    </div>
                }
            />
        );
    }
}
