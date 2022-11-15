import { Component } from '../../../../__Reacts__old_version__';
import styles from './button.module.scss';

export default class ButtonPrimary extends Component<{
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
