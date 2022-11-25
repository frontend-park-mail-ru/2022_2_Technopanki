import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator';
import { userConnect } from '../../store';
import { UserState } from '../../store/user/types';
import { resumeService } from '../../services/resumeService';
import { IMAGE_URL } from '../../utils/networkConstants';
import { APPLICANT_PATHS } from '../../utils/routerConstants';

class SettingsHat extends ReactsComponent<
    {
        // Flux
        name: string;
        surname?: string;
        // Props
        status: string;
        imgSrc: string;
        creatorID: string;
        userID: string;
    },
    {
        // Flux
        name: string;
        surname: string;
        // Props
        status: string;
        imgSrc: string;
    }
> {
    state = {
        imgSrc: this.props.imgSrc,
        name: this.props.name,
        surname: this.props.surname,
        status: this.props.status,
    };

    getCreatorDataFromServer = () => {
        if (this.state.name === '') {
            resumeService.getResumeHatData(this.props.creatorID).then(body => {
                this.setState(() => ({
                    imgSrc: IMAGE_URL + body.image ?? body.imgSrc,
                    name: body.company_name,
                    status: body.status,
                }));
            });
        }
        if (this.state.surname !== '') {
            resumeService.getResumeHatData(this.props.creatorID).then(body => {
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
            <Hat
                imgSrc={this.state.imgSrc}
                name={this.state.name}
                surname={this.props.surname ?? ''}
                status={this.state.status}
                linkTo={APPLICANT_PATHS.PROFILE + this.props.userID}
            />
        );
    }
}

export default userConnect((state, props) => {
    return {
        userID: state.id,
        name: state.name,
        surname: state.surname,
        status: props.status,
        postedByUserID: props.postedByUserID,
        imgSrc: props.imgSrc,
        submit: props.submit,
        linkTo: props.linkTo,
    };
})(SettingsHat);
