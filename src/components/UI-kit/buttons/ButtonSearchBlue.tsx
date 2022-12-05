import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';

export default class ButtonSearchBlue extends ReactsComponent<{
    type: string;
    onClick?: Function;
    children: string;
}> {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={`${styles.btn} ${styles['btn-primary-blue__search']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
