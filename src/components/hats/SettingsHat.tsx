import { Component } from '../../../Reacts';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator';
import { userConnect } from '../../store';
import { UserState } from '../../store/user/types';
import { resumeService } from '../../services/resumeService';

class SettingsHat extends Component<
    {
        creatorID: string;
        submit: Function;
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
        imgSrc: '',
        name: '',
        surname: '',
        status: '',
    };

    getCreatorDataFromServer = () => {
        resumeService.getResumeHatData(this.props.creatorID).then(body => {
            this.setState(() => ({
                imgSrc: body.creator_img_src,
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
                imgSrc={this.state.imgSrc}
                name={this.state.name}
                surname={this.state.surname}
                status={this.state.status}
                rightSideContent={
                    <CancelSaveButtons
                        onCancel={navigator.goBack}
                        onSave={this.props.submit}
                    />
                }
            />
        );
    }
}

export default userConnect((state, props) => {
    return {
        name: state.name,
        surname: state.surname,
        postedByUserID: props.postedByUserID,
        status: props.status,
        imgSrc: props.imgSrc,
        submit: props.submit,
    };
})(SettingsHat);
