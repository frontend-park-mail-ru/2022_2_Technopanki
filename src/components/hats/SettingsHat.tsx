import { Component } from '../../../Reacts';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator';

export default class SettingsHat extends Component<{
    imgSrc: string;
    name: string;
    surname?: string;
    description: string;
    to: string
}> {
    render() {
        return (
            <Hat
                imgSrc={this.props.imgSrc}
                name={this.props.name}
                surname={this.props.surname}
                description={this.props.description}
                rightSideContent={
                    <CancelSaveButtons
                        onCancel={() => {
                            navigator.navigate(this.props.to);
                        }}
                        onSave={() => {
                            alert('saved');
                            navigator.navigate(this.props.to);
                        }}
                    />
                }
            />
        );
    }
}
