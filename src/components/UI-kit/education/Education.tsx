import { Component } from '../../../../__Reacts__old_version__';

export default class Education extends Component<{
    university: string;
    faculty: string;
    status: string;
}> {
    render() {
        return (
            <div className={'flex column g-16'}>
                <h6>Образование</h6>
                <div className={'flex column g-2'}>
                    <p className={'color-900'}>{this.props.university}</p>
                    <p className={'color-500'}>{this.props.faculty}</p>
                </div>
                <p className={'color-500'}>{this.props.status}</p>
            </div>
        );
    }
}
