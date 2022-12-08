import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';

export default class ButtonSearchBlue extends ReactsComponent<{
    onClick?: Function;
    children: string;
}> {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={`${styles['btn-primary__dropdown']}`}
            >
                {this.props.children}
            </button>
        );
    }
}
