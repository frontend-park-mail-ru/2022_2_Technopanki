import { Component } from '../../../Reacts';
import Button from '../../components/UI-kit/buttons/Button';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';
import { resumeService } from '../../services/resumeService';
import { APPLICANT_PATHS, RESUME_PATHS } from '../../utils/routerConstants';
import { IMAGE_URL } from '../../utils/networkConstants';

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
        id: string;
    }
> {
    state = {
        creatorImgSrc: '',
        name: '',
        surname: '',
        status: '',
        id: '',
    };

    getCreatorDataFromServer = () => {
        resumeService.getResumeHatData(this.props.creatorID).then(body => {
            this.setState(() => ({
                creatorImgSrc: IMAGE_URL + body.image ?? body.imgSrc,
                name: body.applicant_name,
                surname: body.applicant_surname,
                status: body.status,
                id: body.id.toString(),
            }));
        });
    };

    componentDidMount() {
        this.getCreatorDataFromServer();
    }

    render() {
        return (
            <Hat
                imgSrc={this.state.creatorImgSrc}
                name={this.state.name}
                surname={this.state.surname}
                status={this.state.status}
                linkTo={APPLICANT_PATHS.PROFILE + this.state.id}
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
