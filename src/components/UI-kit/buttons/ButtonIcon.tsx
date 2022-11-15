import { Component } from '../../../../__Reacts__old_version__';
import styles from './button.module.scss';
import { VNodeType } from '../../../../__Reacts__old_version__/shared/common';

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
