import { Component } from '../../../../Reacts';
import Arrow from '../../../static/icons/arrow.svg';
import styles from './button.module.scss';

export default class ArrowButton extends Component<{ onClick?: Function }> {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={`background-900 rounded-max border-none cursor-pointer flex align-items-center justify-content-center ${styles['btn-arrow']}`}
                dangerouslySetInnerHTML={{ __html: Arrow }}
            />
        );
    }
}
