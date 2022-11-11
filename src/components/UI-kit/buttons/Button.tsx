import { Component } from '../../../../Reacts';
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
