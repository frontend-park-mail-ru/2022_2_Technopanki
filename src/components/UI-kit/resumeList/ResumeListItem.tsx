import { Component } from '../../../../Reacts';
import { VNodeType } from '../../../../Reacts/shared/common';
import Link from '../../Link/Link';
import ArrowButton from '../buttons/ArrowButton';

export type ResumeListItemPropsType = {
    id: string;
    imgSrc: string;
    name: string;
    surname: string;
    resumeTitle: string;
    timeThenCreated: string;
    chips: VNodeType;
    resumeSrc: string;
};

export default class ResumeListItem extends Component<ResumeListItemPropsType> {
    render() {
        return (
            <div className={'columns g-24 p-16 border-top-default'}>
                <div
                    className={
                        'col-11 col-sm-6 col-md-4 flex row align-items-center g-16'
                    }
                >
                    <img
                        height={40}
                        width={40}
                        className={'rounded-max'}
                        src={this.props.imgSrc}
                        alt={'Avatar'}
                    />
                    <div className={'flex column g-4'}>
                        <p>
                            {this.props.name} {this.props.surname}
                        </p>
                        <p>{this.props.resumeTitle}</p>
                    </div>
                </div>
                <div className={'col-0 row align-items-center col-md-4'}>
                    <p>{this.props.timeThenCreated}</p>
                </div>
                <div
                    className={'col-0 row align-items-center col-sm-5 col-md-3'}
                >
                    <p>chips</p>
                </div>
                <div
                    className={
                        'col-1 row align-items-center flex h-100 justify-content-end'
                    }
                >
                    <Link to={'/resume'} content={<ArrowButton />} />
                </div>
            </div>
        );
    }
}
