import { Component } from '../../../../__Reacts__old_version__';
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
