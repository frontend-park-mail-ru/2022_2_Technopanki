import { Component } from '../../../../Reacts';
import ResumeListItem, { ResumeListItemPropsType } from './ResumeListItem';

export default class ResumeList extends Component<
    {
        resume: ResumeListItemPropsType[];
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
            <div className={'w-100 g-24 hidden rounded-md border-default'}>
                <div key={'nav'} className={'columns p-16'}>
                    <p className={'col-11 col-sm-6 col-md-4'}>Имя</p>
                    <p className={'col-0 col-md-4'}>Время создания резюме</p>
                    <p className={'col-0 col-sm-5 col-md-3'}>
                        Профессиональные навыки
                    </p>
                </div>
                <div key={'resume'} className={'w-100'}>
                    {this.props.resume
                        .slice(0, this.state.limit)
                        .map(resume => (
                            <ResumeListItem
                                key={resume.id}
                                id={resume.id}
                                imgSrc={resume.imgSrc}
                                name={resume.name}
                                surname={resume.surname}
                                resumeTitle={resume.resumeTitle}
                                timeWhenCreated={resume.timeWhenCreated}
                                chips={resume.chips}
                                resumeSrc={resume.resumeSrc}
                            />
                        ))}
                </div>
                <button
                    key={'button'}
                    onClick={this.increaseLimit}
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