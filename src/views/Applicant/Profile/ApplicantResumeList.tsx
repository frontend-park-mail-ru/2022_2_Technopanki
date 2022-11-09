import { Component } from '../../../../Reacts';
import { applicantProfileService } from '../../../services/applicantService';
import ResumeList from '../../../components/UI-kit/resumeList/ResumeList';
import { applicantConnect } from '../../../store';

class ApplicantResumeList extends Component<
    { applicantID: string },
    { responses: [] }
> {
    state = {
        responses: [],
    };

    getDataFromServer() {
        if (this.props.applicantID) {
            applicantProfileService
                .getResumeList(this.props.applicantID)
                .then(body => {
                    console.log('here')
                    this.state.responses = JSON.parse(JSON.stringify(body));
                    console.log(this.state.responses)
                    this.setState(state => {
                        return state;
                    });
                })
                .catch(err => console.error(err));
        }
    }

    componentDidMount() {
        this.getDataFromServer();
    }

    render() {
        return (
            <ResumeList
                someNewValue={'text'}
                resume={this.state.responses}
                test={(() => this.state.responses).bind(this)}
            />
        );
    }
}

export default applicantConnect(state => {
    return {
        applicantID: state.id,
    };
})(ApplicantResumeList);
