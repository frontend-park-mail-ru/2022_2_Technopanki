import { Component } from '../../../Reacts';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator';
import { userConnect } from '../../store';
import { UserState } from '../../store/user/types';

class SettingsHat extends Component<{
    // Flux
    name: string;
    surname: string;
    // Props
    status: string;
    imgSrc: string;
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

export default userConnect((store, props) => {
    const state: UserState = store.getState();

    return {
        name: state.name,
        surname: state.surname,
        status: props.status,
        imgSrc: props.imgSrc,
        submit: props.submit,
    };
})(SettingsHat);
