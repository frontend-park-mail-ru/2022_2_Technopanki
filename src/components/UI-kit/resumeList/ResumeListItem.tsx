import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import Link from '../../Link/Link';
import ArrowButton from '../buttons/ArrowButton';
import Chips from '../chips/Chips';
import { RESUME_PATHS } from '../../../utils/routerConstants';

export type ResumeListItemPropsType = {
    resume_id: string;
    id: string;
    image: string;
    user_name: string;
    user_surname: string;
    title: string;
    created_date: string;
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
                    key={'data'}
                    className={
                        'col-11 col-sm-6 col-md-7 flex row align-items-center g-16'
                    }
                >
                    <img
                        key={'img'}
                        height={40}
                        width={40}
                        className={'rounded-max'}
                        src={this.props.imgSrc}
                        alt={'Avatar'}
                    />
                    <div key={'data'} className={'flex column g-4'}>
                        <Link
                            to={RESUME_PATHS.INDEX + this.props.resume_id}
                            content={
                                <p key={'name'}>
                                    {this.props.user_name}{' '}
                                    {this.props.user_surname}
                                </p>
                            }
                        />
                        <p key={'title'}>{this.props.title}</p>
                    </div>
                </div>
                <div
                    key={'time'}
                    className={'col-0 row align-items-center col-md-4'}
                ></div>
                <div
                    key={'button'}
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
