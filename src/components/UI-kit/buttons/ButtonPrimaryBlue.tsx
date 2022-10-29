import { Component } from '../../../../Reacts';
import styles from './button.module.scss';

export default class ButtonPrimaryBlue extends Component<{
    onClick: Function;
    children: string;
}> {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={`${styles.btn} ${styles['btn-primary-blue']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
