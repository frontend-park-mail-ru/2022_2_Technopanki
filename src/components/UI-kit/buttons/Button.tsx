import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';

export default class Button extends ReactsComponent<{
    onClick?: Function;
    children: string;
    type?: string;
}> {
    render() {
        return (
            <button
                type={this.props.type || ''}
                onClick={this.props.onClick}
                className={`${styles.btn}`}
            >
                {this.props.children}
            </button>
        );
    }
}
