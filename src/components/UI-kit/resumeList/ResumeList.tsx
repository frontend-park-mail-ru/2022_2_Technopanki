import { Component } from '../../../../Reacts';
import ResumeListItem, { ResumeListItemPropsType } from './ResumeListItem';

export default class ResumeList extends Component<
    {
        someNewValue: string;
        resume: ResumeListItemPropsType[];
        test: Function;
    },
    { resume: ResumeListItemPropsType[]; limit: number }
> {
    state = {
        resume: this.props.test(),
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
                    {this.state?.resume
                        ?.slice(0, this.state.limit)
                        .map(resume => (
                            <ResumeListItem
                                key={resume.resume_id}
                                id={resume.resume_id}
                                imgSrc={resume.imgSrc}
                                name={resume.user_name}
                                surname={resume.user_surname}
                                resumeTitle={resume.resume_title}
                                timeWhenCreated={resume.apply_date}
                            />
                        ))}
                </div>
                <button
                    key={'sdfw'}
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
