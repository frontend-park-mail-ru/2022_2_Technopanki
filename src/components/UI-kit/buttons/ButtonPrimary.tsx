import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';

export default class ButtonPrimary extends ReactsComponent<{
    children: string;
    type?: string;
    onClick?: Function;
}> {
    render() {
        return (
            <button
                type={this.props.type || ''}
                onClick={this.props.onClick ? this.props.onClick : () => {}}
                className={`${styles.btn} ${styles['btn-primary']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
