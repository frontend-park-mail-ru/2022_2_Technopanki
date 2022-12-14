import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from '../inputs/input.module.scss';
import { ValidationFunc } from '../../../../utils/validation/formValidation';
import RenderWithCondition from '../../../RenderWithCondition';

type FormInputProps = {
    id: string;
    label?: string;
    type: string;
    placeholder?: string;
    name: string;
    size: '3' | '4' | '6' | '12';
    validationMode?: 'onblur' | 'oninput';
    setError?: Function;
    value?: string;
    required?: boolean;
    validation?: ValidationFunc[];
    getValue?: (value: any) => any;
    [key: string]: any;
};

export default class FormInput extends ReactsComponent<FormInputProps> {
    state = {
        error: false,
        errorMessage: '',
        value: this.props.value,
    };

    validate = (value: any) => {
        let error = false;
        let errorMessage = '';

        this.props.getValue && this.props.getValue(value);

        if (this.props.validation) {
            this.props.validation.forEach(validate => {
                const [ok, message] = validate(value);
                if (!ok) {
                    error = true;
                    errorMessage = message;
                }
            });
        }

        this.props.setError && this.props.setError(error, this.props.name);
        this.setState(() => ({
            error,
            errorMessage: errorMessage,
            value: value,
        }));
    };

    componentDidUpdate() {
        this.validate(this.state.value);
    }

    shouldUpdateState(nextState: {
        value: string;
        error: boolean;
        errorMessage: string;
    }): boolean {
        return (
            this.state.value !== nextState.value ||
            this.state.error !== nextState.error ||
            this.state.errorMessage !== nextState.errorMessage
        );
    }

    shouldUpdate(
        nextProps: FormInputProps | Readonly<FormInputProps>,
    ): boolean {
        return this.props.value !== nextProps.value;
    }

    onBlur = (e: Event) => {
        e.preventDefault();
        this.props.validationMode === 'onblur' && this.validate(e.target.value);
    };

    onInput = (e: Event) => {
        e.preventDefault();
        this.state.value = e.target.value;
        this.props.validationMode === 'oninput' &&
            this.validate(e.target.value);
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
                    onInput={this.onInput}
                    className={`${styles.input} ${
                        this.state.error ? styles.input__error : ''
                    }`}
                    {...{
                        ...this.props,
                        size: null,
                        value: this.state.value,
                        validation: null,
                        validationMode: null,
                        setError: null,
                        getValue: null,
                        label: null,
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
