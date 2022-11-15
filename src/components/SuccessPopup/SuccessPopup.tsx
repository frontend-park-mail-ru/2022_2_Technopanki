import { Component } from '../../../__Reacts__old_version__';
import { dispatch, errorsConnect, successConnect } from '../../store';
import CloseIcon from '../../static/icons/x-close.svg';
import Svg from '../Svg';
import styles from './popup.module.scss';
import { deactivateSuccess } from '../../store/succeses/actions';

class SuccessPopup extends Component<{
    isActive: boolean;
    header: string;
    text: string;
}> {
    render() {
        return (
            <div
                className={`${
                    this.props.isActive ? 'opacity-100' : 'opacity-0'
                } fixed background-100 rounded-lg flex row g-40 align-items-center justify-content-space-between ${
                    styles.popup
                }`}
            >
                <div className={'flex column'}>
                    <h5 className={styles.popup_header}>{this.props.header}</h5>
                    <p className={styles.popup_text}>{this.props.text}</p>
                </div>
                <Svg
                    src={CloseIcon}
                    height={24}
                    onClick={() => dispatch(deactivateSuccess())}
                    cursor={'pointer'}
                />
            </div>
        );
    }
}

export default successConnect((state, props) => ({
    isActive: state.isActive,
    header: state.header,
    text: state.text,
}))(SuccessPopup);
