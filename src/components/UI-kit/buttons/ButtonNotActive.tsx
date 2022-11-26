import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';

export default class ButtonNotActive extends ReactsComponent<{
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
