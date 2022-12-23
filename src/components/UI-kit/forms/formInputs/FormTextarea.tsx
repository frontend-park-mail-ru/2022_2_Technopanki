import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from '../inputs/input.module.scss';

type FormInputProps = {
    id: string;
    label: string;
    value?: string;
    name: string;
    required: boolean;
    size: '3' | '4' | '6' | '12';
    [key: string]: any;
};

export default class FormTextarea extends ReactsComponent<FormInputProps> {
    state = {
        value: this.props.value,
    };

    render() {
        return (
            <div
                className={`flex w-100 column g-8 col-12 col-md-${this.props.size}`}
            >
                <label className={`${styles.label}`} for={this.props.id}>
                    {this.props.label}
                </label>
                <p className={`font-size-12 color-400 ${this.props.required ? 'block' : 'none'}`}>Обязательное поле</p>
                <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    {...{
                        ...this.props,
                        validation: null,
                        validationMode: null,
                    }}
                >
                    {this.props.value}
                </textarea>
            </div>
        );
    }
}
