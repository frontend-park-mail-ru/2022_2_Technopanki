import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import ResumeListItem, { ResumeListItemPropsType } from './ResumeListItem';
import { IMAGE_URL } from '../../../utils/networkConstants';
import { ResumePreviewResponse } from '../../../services/resume/types';

export default class ResumeList extends ReactsComponent<
    {
        resume: ResumePreviewResponse[];
    },
    { limit: number }
> {
    state = {
        limit: 6,
    };

    limitConstant = 10;

    increaseLimit = () => {
        this.setState(state => ({
            ...state,
            limit: state.limit + this.limitConstant,
        }));
    };

    render() {
        return (
            <div className={`w-100 g-24 hidden rounded-md border-default ${this.props.resume.length === 0 ? 'none': null}`}>
                <div className={'columns p-16'}>
                    <p className={'col-11 col-md-7'}>Имя</p>
                    <p className={'col-0 col-md-4'}>Время создания резюме</p>
                </div>
                <div className={'w-100'}>
                    {this.props.resume
                        .slice(0, this.state.limit)
                        .map(resume => (
                            <ResumeListItem
                                key={resume.id.toString()}
                                id={resume.id.toString()}
                                resume_id={resume.id.toString()}
                                imgSrc={IMAGE_URL + resume.image}
                                name={resume.applicant_name}
                                surname={resume.applicant_surname}
                                title={resume.title}
                                resumeTitle={resume.title}
                                timeWhenCreated={resume.created_date}
                                created_date={resume.created_date}
                            />
                        ))}
                </div>
                <button
                    onClick={this.increaseLimit.bind(this)}
                    className={
                        'cursor-pointer w-100 p-16 border-top-default border-none color-500 background-50'
                    }
                >
                    Загрузить еще
                </button>
            </div>
        );
    }
}
