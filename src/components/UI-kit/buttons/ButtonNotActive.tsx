import { Component } from '../../../../Reacts';
import styles from './button.module.scss';

export default class ButtonNotActive extends Component<{
    children: string;
    type?: string;
}> {
    render() {
        return (
            <button
                type={this.props.type || ''}
                className={`${styles.btn} ${styles['btn__not-active']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
