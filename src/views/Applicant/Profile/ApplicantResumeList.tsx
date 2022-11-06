import { Component } from '../../../../Reacts';
import { applicantService } from '../../../services/applicantService';
import Resume from '../Resume/Resume';
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
            applicantService
                .getResumeList(this.props.applicantID)
                .then(body => {
                    this.state.responses = JSON.parse(JSON.stringify(body));
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
                resume={this.state.responses}
                test={() => this.state.responses}
            />
        );
    }
}

export default applicantConnect(store => {
    return {
        applicantID: store.getState().id,
    };
})(ApplicantResumeList);
