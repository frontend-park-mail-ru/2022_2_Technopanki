import { dispatch, errorsConnect } from '../../store';
import CloseIcon from '../../static/icons/x-close.svg';
import Svg from '../Svg';
import { deactivateError } from '../../store/errors/actions';
import styles from './popup.module.scss';
import { ReactsComponent } from '../../../Reacts/reacts/src/Component';

class ErrorPopup extends ReactsComponent<{
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
                    onClick={() => dispatch(deactivateError())}
                    cursor={'pointer'}
                />
            </div>
        );
    }
}

export default errorsConnect((state, props) => ({
    isActive: state.isActive,
    header: state.header,
    text: state.text,
}))(ErrorPopup);
