import { Component } from '../../../Reacts';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator.tsx';
import { userConnect } from '../../store';
import { UserState } from '../../store/user/types';

class SettingsHat extends Component<{
    // Flux
    name: string;
    surname: string;
    // Props
    postedByUserID: string;
    status: string;
    imgSrc: string;
    submit: Function;
}> {
    render() {
        return (
            <Hat
                imgSrc={this.props.imgSrc}
                name={this.props.name}
                linkTo={`/employer/${this.props.postedByUserID}`}
                surname={this.props.surname}
                status={this.props.status}
                rightSideContent={
                    <CancelSaveButtons
                        onCancel={navigator.goBack}
                        onSave={this.props.submit}
                    />
                }
            />
        );
    }
}

export default userConnect((state, props) => {
    return {
        name: state.name,
        surname: state.surname,
        postedByUserID: props.postedByUserID,
        status: props.status,
        imgSrc: props.imgSrc,
        submit: props.submit,
    };
})(SettingsHat);
