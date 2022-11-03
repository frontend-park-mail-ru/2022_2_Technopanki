import { Component } from '../../../../../Reacts/index';
import styles from './input.module.scss';

export default class Textarea extends Component<{
    type?: string;
    label: string;
    placeholder: string;
}> {
    render() {
        return (
            <div className={'flex w-100 column g-8'}>
                <label className={`${styles.label}`}>
                    {this.props.label}
                </label>
                <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}
