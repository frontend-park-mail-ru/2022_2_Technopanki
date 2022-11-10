import { Component } from '../../../Reacts';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator.tsx';
import { userConnect } from '../../store';
import { UserState } from '../../store/user/types';
import { resumeService } from '../../services/resumeService';

class SettingsHat extends Component<
    {
        // Flux
        name: string;
        surname?: string;
        // Props
        status: string;
        imgSrc: string;
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
        imgSrc: this.props.imgSrc,
        name: this.props.name,
        surname: this.props.surname,
        status: this.props.status,
    };

    getCreatorDataFromServer = () => {
        if (this.state.name === '') {
            resumeService.getResumeHatData(this.props.creatorID).then(body => {
                this.setState(() => ({
                    imgSrc: '/image/applicant.png',
                    name: body.company_name,
                    status: body.status,
                }));
            });
        }
        if (this.state.surname !== '') {
            resumeService.getResumeHatData(this.props.creatorID).then(body => {
                this.setState(() => ({
                    imgSrc: '/image/applicant.png',
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
                imgSrc={'/image/applicant.png'}
                name={this.state.name}
                surname={this.props.surname}
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
        status: state.status,
        postedByUserID: props.postedByUserID,
        imgSrc: props.imgSrc,
        submit: props.submit,
    };
})(SettingsHat);
