import { Component } from '../../../../Reacts';

export default class HeaderUserInfo extends Component<{
    imgSrc: string;
    name: string;
    surname: string;
}> {
    render() {
        return (
            <div className={'flex row g-16'}>
                <img
                    height={20}
                    width={20}
                    key={'img'}
                    className={'h-24 w-24 rounded-md background-50'}
                    src={'./image/applicant.png'}
                    alt={'profile'}
                />
                <div key={'name'} className={'flex row g-16 text-align-right'}>
                    <p>
                        {this.props.name} {this.props.surname}
                    </p>
                </div>
            </div>
        );
    }
}
