import { Component } from '../../../../Reacts/index';
import styles from './button.module.scss';

export default class ButtonPrimary extends Component<{
    onClick: Function;
    children: string;
}> {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={`${styles.btn} ${styles['btn-primary']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
