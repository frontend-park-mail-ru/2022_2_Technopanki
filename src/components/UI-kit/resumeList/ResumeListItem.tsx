import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import Link from '../../Link/Link';
import ArrowButton from '../buttons/ArrowButton';
import Chips from '../chips/Chips';
import { RESUME_PATHS } from '../../../utils/routerConstants';

export type ResumeListItemPropsType = {
    resume_id: string;
    id: string;
    applicant_name: string;
    applicant_surname: string;
    title: string;
    timeWhenCreated: string;
    imgSrc: string;
    skills: string[];
};

export default class ResumeListItem extends ReactsComponent<ResumeListItemPropsType> {
    months = [
        {
            date: '01',
            name: 'января',
        },
        {
            date: '02',
            name: 'февраля',
        },
        {
            date: '03',
            name: 'марта',
        },
        {
            date: '04',
            name: 'апреля',
        },
        {
            date: '05',
            name: 'мая',
        },
        {
            date: '06',
            name: 'июня',
        },
        {
            date: '07',
            name: 'июля',
        },
        {
            date: '08',
            name: 'августа',
        },
        {
            date: '09',
            name: 'сентября',
        },
        {
            date: '10',
            name: 'октября',
        },
        {
            date: '11',
            name: 'ноября',
        },
        {
            date: '12',
            name: 'декабря',
        },
    ];

    render() {
        return (
            <div className={'columns g-24 p-16 border-top-default'}>
                <div
                    className={
                        'col-11 col-sm-6 col-md-7 flex row align-items-center g-16'
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
                        <Link
                            to={RESUME_PATHS.INDEX + this.props.resume_id}
                            content={
                                <p key={'name'}>
                                    {this.props.applicant_name}{' '}
                                    {this.props.applicant_surname}
                                </p>
                            }
                        />
                        <p key={'title'}>{this.props.title}</p>
                    </div>
                </div>
                <div className={'col-0 row align-items-center col-md-4'}></div>
                <p>
                    {`${
                        this.props.timeWhenCreated[8] === '0'
                            ? this.props.timeWhenCreated.slice(9, 10)
                            : this.props.timeWhenCreated.slice(8, 10)
                    } ${
                        this.months.find(
                            m =>
                                m.date ===
                                this.props.timeWhenCreated.slice(5, 7),
                        ).name
                    } ${this.props.timeWhenCreated.slice(
                        0,
                        4,
                    )} • ${this.props.timeWhenCreated.slice(11, 16)}`}
                </p>
                <div
                    className={
                        'col-1 row align-items-center flex h-100 justify-content-end'
                    }
                >
                    <Link
                        to={RESUME_PATHS.INDEX + this.props.resume_id}
                        content={<ArrowButton />}
                    />
                </div>
            </div>
        );
    }
}
