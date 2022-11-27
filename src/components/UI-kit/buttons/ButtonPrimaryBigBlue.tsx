import { Component } from '../../../../Reacts';
import styles from './button.module.scss';

export default class ButtonPrimaryBigBlue extends Component<{
    onClick?: Function;
    children: string;
}> {
    render() {
        return (
            <button
                type={this.props.type}
                onClick={this.props.onClick}
                className={`${styles.btn} ${styles['btn-primary-blue__big']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
