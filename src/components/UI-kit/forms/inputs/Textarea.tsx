import { Component } from '../../../../../Reacts/index';
import styles from './input.module.scss';

export default class Textarea extends Component<{
    type?: string;
    placeholder: string;
    id: string;
    label: string;
    name: string;
    value?: string;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
}> {
    render() {
        return (
            <div className={'flex w-100 column g-8'}>
                <label className={`${styles.label}`}>{this.props.label}</label>
                <textarea
                    id={this.props.id}
                    name={this.props.name}
                    className={`${styles.input} ${styles.textarea}`}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                >
                    {this.props.value}
                </textarea>
            </div>
        );
    }
}
