import { Component } from '../../../../../Reacts';
import styles from './input.module.scss';

export default class Input extends Component<{
    type: string;
    placeholder: string;
    children: string;
}> {
    render() {
        return (
            <label className={`${styles.label}`} for={this.props.key}>
                {this.props.children}
                <input
                    className={`${styles.input}`}
                    id={this.props.key}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                />
            </label>
        );
    }
}
