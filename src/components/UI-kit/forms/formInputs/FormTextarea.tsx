import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from '../inputs/input.module.scss';

type FormInputProps = {
    id: string;
    label: string;
    value: string;
    type: string;
    placeholder: string;
    name: string;
    error: boolean;
    errorMessage: string;
    size: '3' | '4' | '6' | '12';
    setError?: Function;
    required?: boolean;
    validation?: (param: any) => boolean;
    validationMode?: 'onblur' | 'onsubmit';
    [key: string]: any;
};

export default class FormTextarea extends ReactsComponent<FormInputProps> {
    state = {
        error: this.props.error,
        value: this.props.value,
    };

    onBlur = (e: Event) => {
        e.preventDefault();
        if (this.props.validation && !this.props.validation(e.target.value)) {
            this.setState(() => ({ error: true, value: e.target.value }));
            this.props.setError(true);
        } else {
            this.setState(() => ({ error: false, value: e.target.value }));
            this.props.setError(false);
        }
    };

    render() {
        return (
            <div
                className={`flex w-100 column g-8 col-12 col-md-${this.props.size}`}
            >
                <label className={`${styles.label}`} for={this.props.id}>
                    {this.props.label}
                </label>
                <textarea
                    onBlur={this.onBlur}
                    className={`${styles.input} ${
                        this.state.error ? styles.input__error : ''
                    }`}
                    {...{
                        ...this.props,
                        validation: null,
                        validationMode: null,
                    }}
                >
                    {this.props.value}
                </textarea>
                {this.state.error ? (
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
