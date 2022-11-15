import { Component } from '../../../../__Reacts__old_version__';
import styles from './button.module.scss';

export default class Button extends Component<{
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
