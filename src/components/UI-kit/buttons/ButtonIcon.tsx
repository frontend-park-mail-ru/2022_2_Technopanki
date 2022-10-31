import { Component } from '../../../../Reacts';
import styles from './button.module.scss';
import { VNodeType } from '../../../../Reacts/shared/common';

export default class ButtonIcon extends Component<{
    onClick?: Function;
    icon: VNodeType;
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
