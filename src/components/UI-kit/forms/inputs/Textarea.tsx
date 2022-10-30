import { Component } from '../../../../../Reacts/index';
import styles from './input.module.scss';

export default class Textarea extends Component<{
    type: string
    placeholder: string
    children: string;
}> {
    render() {
        return (
            <div
                className={'flex column g-8'}
            >
                <label
                    className={`${styles.label}`}
                >
                    {this.props.children}
                </label>
                <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                />
            </div>
        )
    }
}