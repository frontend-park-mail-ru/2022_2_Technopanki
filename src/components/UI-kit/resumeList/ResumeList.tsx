import { Component } from '../../../../Reacts';
import ResumeListItem, { ResumeListItemPropsType } from './ResumeListItem';
import { IMAGE_URL } from '../../../utils/networkConstants';

export default class ResumeList extends Component<
    {
        someNewValue: string;
        resume: ResumeListItemPropsType[];
        test: Function;
    },
    { resume: ResumeListItemPropsType[]; limit: number }
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
            <div className={'w-100 g-24 hidden rounded-md border-default'}>
                <div className={'columns p-16'}>
                    <p className={'col-11 col-md-7'}>Имя</p>
                    <p className={'col-0 col-md-4'}>Время создания резюме</p>
                </div>
                <div className={'w-100'}>
                    {this.props.resume
                        .slice(0, this.state.limit)
                        .map(resume => (
                            <ResumeListItem
                                key={
                                    resume.resume_id.toString() ??
                                    resume.id.toString()
                                }
                                id={
                                    resume.resume_id.toString() ??
                                    resume.id.toString()
                                }
                                resume_id={
                                    typeof resume.resume_id === 'string'
                                        ? resume.resume_id
                                        : resume.resume_id.toString()
                                }
                                imgSrc={
                                    IMAGE_URL + resume.imgSrc ?? resume.image
                                }
                                name={resume.user_name}
                                surname={resume.user_surname}
                                resumeTitle={resume.title}
                                timeWhenCreated={resume.created_date}
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
