import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from './input.module.scss';

export default class Textarea extends ReactsComponent<{
    type?: string;
    placeholder: string;
    id: string;
    label: string;
    name: string;
    value?: string;
    required?: boolean;
}> {
    render() {
        return (
            <div className={'flex w-100 column g-8'}>
                <label className={`${styles.label}`}>{this.props.label}</label>
                <textarea
                    id={this.props.id}
                    name={this.props.name}
                    className={`${styles.input} ${
                        this.props.error ? styles.input__error : ''
                    } ${styles.textarea}`}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                >
                    {this.props.value}
                </textarea>
                {this.props.error ? (
                    <p className={`input-error-${this.props.name}`}>
                        {this.props.errorMessage}
                    </p>
                ) : (
                    <p></p>
                )}
            </div>
        );
    }
}
