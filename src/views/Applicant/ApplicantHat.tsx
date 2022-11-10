import { Component } from '../../../Reacts';
import Button from '../../components/UI-kit/buttons/Button';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';
import Dropdown from '../../components/UI-kit/dropdown/Dropdown';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';
import { vacancyService } from '../../services/vacancyService';
import { resumeService } from '../../services/resumeService';
import ButtonIcon from '../../components/UI-kit/buttons/ButtonIcon';
import PhoneIcon from '../../static/icons/phone.svg';
import MailIcon from '../../static/icons/mail.svg';
import ResumeIcon from '../../static/icons/resume.svg';
import { RESUME_PATHS } from '../../utils/routerConstants';

export default class ApplicantHat extends Component<
    {
        creatorID: string;
        resumeID: string;
    },
    {
        creatorImgSrc: string;
        name: string;
        surname: string;
        status: string;
    }
> {
    state = {
        creatorImgSrc: '',
        name: '',
        surname: '',
        status: '',
    };

    getCreatorDataFromServer = () => {
        resumeService.getResumeHatData(this.props.creatorID).then(body => {
            this.setState(() => ({
                creatorImgSrc: 'image/applicant.png',
                name: body.applicant_name,
                surname: body.applicant_surname,
                status: body.status,
            }));
        });
    };

    componentDidMount() {
        this.getCreatorDataFromServer();
    }

    render() {
        return (
            <Hat
                imgSrc={'./image/applicant.png'}
                name={this.state.name}
                surname={this.state.surname}
                status={this.state.status}
                rightSideContent={
                    <div className={'flex row flex-wrap g-12'}>
                        <Link
                            to={RESUME_PATHS.SETTINGS + this.props.resumeID}
                            content={<Button>Настройки</Button>}
                        />
                    </div>
                }
            />
        );
    }
}
