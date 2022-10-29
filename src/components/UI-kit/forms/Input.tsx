import { Component } from '../../../../Reacts';
import styles from './input.module.scss';

export default class Input extends Component<{
    type: string;
    key: string;
    placeholder: string;
    children: string;
}> {
    render() {
        return (
            <label for={this.props.key}>
                {this.props.children}
                <input
                    className={`${styles.input}`}
                    type={this.props.type}
                    id={this.props.key}
                    placeholder={this.props.placeholder}
                />
            </label>
        );
    }
}
