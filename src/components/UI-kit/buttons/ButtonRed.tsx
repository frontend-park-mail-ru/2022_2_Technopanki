import { Component } from '../../../../__Reacts__old_version__';
import styles from './button.module.scss';

export default class ButtonRed extends Component<{
    onClick?: Function;
    children: string;
}> {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={`${styles.btn} ${styles['btn-red']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
