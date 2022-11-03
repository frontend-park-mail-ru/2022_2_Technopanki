import { Component } from '../../../Reacts';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator';

export default class SettingsHat extends Component<{
    imgSrc: string;
    name: string;
    surname: string;
    status: string;
    submit: Function;
}> {
    render() {
        return (
            <Hat
                imgSrc={this.props.imgSrc}
                name={this.props.name}
                surname={this.props.surname}
                status={this.props.status}
                rightSideContent={
                    <CancelSaveButtons
                        onCancel={() => {
                            navigator.navigate('/');
                        }}
                        onSave={this.props.submit}
                    />
                }
            />
        );
    }
}
