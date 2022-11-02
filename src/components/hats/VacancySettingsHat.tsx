import { Component } from '../../../Reacts';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator';

export default class VacancySettingsHat extends Component<{
    imgSrc: string;
    companyName: string;
    description: string;
}> {
    render() {
        return (
            <Hat
                imgSrc={this.props.imgSrc}
                name={this.props.companyName}
                surname={''}
                description={this.props.description}
                rightSideContent={
                    <CancelSaveButtons
                        onCancel={() => {
                            navigator.navigate('/vacancy');
                        }}
                        onSave={() => {
                            alert('saved');
                            navigator.navigate('/vacancy');
                        }}
                    />
                }
            />
        );
    }
}
