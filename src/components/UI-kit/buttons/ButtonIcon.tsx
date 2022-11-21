import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';

export default class ButtonIcon extends ReactsComponent<{
    onClick?: Function;
    icon: ReactsComponentNode;
    children?: string;
    type?: string;
}> {
    render() {
        return (
            <button
                type={this.props.type}
                onClick={this.props.onClick}
                className={`${styles.btn}`}
            >
                <div
                    className={styles['btn-icon']}
                    dangerouslySetInnerHTML={{
                        __html: this.props.icon,
                    }}
                ></div>
                <p>{this.props.children ? this.props.children : ''}</p>
            </button>
        );
    }
}
