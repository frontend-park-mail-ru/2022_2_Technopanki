import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';

export default class ButtonRed extends ReactsComponent<{
    onClick?: Function;
    type?: string;
    children: string;
}> {
    render() {
        return (
            <button
                type={this.props.type}
                onClick={this.props.onClick}
                className={`${styles.btn} ${styles['btn-red']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
