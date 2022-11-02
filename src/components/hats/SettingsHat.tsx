import { Component } from '../../../Reacts';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator';

export default class SettingsHat extends Component<{
    imgSrc: string;
    name: string;
    surname: string;
    description: string;
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
                            navigator.goBack();
                        }}
                        onSave={() => {
                            alert('saved');
                            navigator.goBack();
                        }}
                    />
                }
            />
        );
    }
}
