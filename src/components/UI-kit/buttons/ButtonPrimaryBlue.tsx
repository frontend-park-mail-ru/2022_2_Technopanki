import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';

export default class ButtonPrimaryBlue extends ReactsComponent<{
    onClick?: Function;
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
