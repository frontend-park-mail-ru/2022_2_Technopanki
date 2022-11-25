import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import ResumeList from '../../../components/UI-kit/resumeList/ResumeList';

export default class ApplicantResumeList extends ReactsComponent<{
    resume: [];
}> {
    render() {
        return (
            <ResumeList
                someNewValue={'text'}
                resume={this.props.resume}
                test={(() => this.props.resume).bind(this)}
            />
        );
    }
}
