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
        resume: JSON.parse(JSON.stringify(this.props.resume)),
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
                <div key={'asd'} className={'columns p-16'}>
                    <p className={'col-11 col-md-7'}>Имя</p>
                    <p className={'col-0 col-md-4'}>Время создания резюме</p>
                </div>
                <div key={'sdf'} className={'w-100'}>
                    {this.props
                        ?.test()
                        ?.slice(0, this.state.limit)
                        .map(resume => (
                            <ResumeListItem
                                key={resume.id}
                                id={resume.id}
                                imgSrc={resume.imgSrc}
                                name={resume.name}
                                surname={resume.surname}
                                resumeTitle={resume.resumeTitle}
                                timeWhenCreated={resume.timeWhenCreated}
                                resumeSrc={resume.resumeSrc}
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
