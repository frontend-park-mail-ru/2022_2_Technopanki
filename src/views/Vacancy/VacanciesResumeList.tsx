import { Component } from '../../../Reacts';
import ResumeList from '../../components/UI-kit/resumeList/ResumeList';
import { vacancyService } from '../../services/vacancyService';
import { vacancyConnect } from '../../store';

class VacanciesResumeList extends Component<
    { vacancyID: string },
    { responses: [] }
> {
    state = {
        responses: [],
    };

    getVacancyResponses() {
        if (this.props.vacancyID) {
            vacancyService
                .getResponses(this.props.vacancyID)
                .then(body => {
                    console.log(body);
                    this.setState(state => ({ ...state, responses: body }));
                })
                .catch(err => console.error(err));
        }
    }

    componentDidMount() {
        this.getVacancyResponses();
    }

    render() {
        return (
            <ResumeList
                someNewValue={'hello world'}
                test={(() => this.state.responses).bind(this)}
                resume={this.state.responses}
            />
        );
    }
}

export default vacancyConnect(store => {
    return {
        vacancyID: store.getState().id,
    };
})(VacanciesResumeList);
