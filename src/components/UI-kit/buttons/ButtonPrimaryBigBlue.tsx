import { Component } from '../../../../__Reacts__old_version__';
import styles from './button.module.scss';

export default class ButtonPrimaryBigBlue extends Component<{
    onClick?: Function;
    children: string;
}> {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={`${styles.btn} ${styles['btn-primary-blue__big']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
