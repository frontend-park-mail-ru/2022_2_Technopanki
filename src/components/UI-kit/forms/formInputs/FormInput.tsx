import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from '../inputs/input.module.scss';
import { ValidationFunc } from '../../../../utils/validation/formValidation';

type FormInputProps = {
    id: string;
    label: string;
    type: string;
    placeholder: string;
    name: string;
    setError: Function;
    size: '3' | '4' | '6' | '12';
    validationMode: 'onblur' | 'onsubmit';
    value?: string;
    required?: boolean;
    validation?: ValidationFunc[];
    getValue?: (value: any) => any;
    [key: string]: any;
};

export default class FormInput extends ReactsComponent<FormInputProps> {
    state = {
        error: this.props.error,
        errorMessage: '',
        value: this.props.value,
    };

    onBlur = (e: Event) => {
        e.preventDefault();
        let error = false;
        let errorMessage = '';

        this.props.getValue && this.props.getValue(e.target.value);

        if (this.props.validation) {
            this.props.validation.forEach(validate => {
                const [ok, message] = validate(e.target.value);
                if (!ok) {
                    error = true;
                    errorMessage = message;
                }
            });
        }

        console.log({
            error,
            errorMessage: errorMessage,
            value: e.target.value,
        });
        this.setState(() => ({
            error,
            errorMessage: errorMessage,
            value: e.target.value,
        }));
    };

    render() {
        return (
            <div
                className={`flex w-100 column g-8 col-12 col-md-${this.props.size}`}
            >
                <label className={`${styles.label}`} for={this.props.id}>
                    {this.props.label}
                </label>
                <input
                    onBlur={this.onBlur}
                    className={`${styles.input} ${
                        this.state.error ? styles.input__error : ''
                    }`}
                    {...{
                        ...this.props,
                        validation: null,
                        validationMode: null,
                        setError: null,
                        getValue: null,
                    }}
                />
                {this.state.error ? (
                    <p className={`input-error-${this.props.name}`}>
                        {this.state.errorMessage}
                    </p>
                ) : (
                    <p></p>
                )}
            </div>
        );
    }
}
