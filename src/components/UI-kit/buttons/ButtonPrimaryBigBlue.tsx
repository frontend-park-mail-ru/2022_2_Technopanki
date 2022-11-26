import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';

export default class ButtonPrimaryBigBlue extends ReactsComponent<{
    type?: string;
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
