import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from './input.module.scss';

export type FilterInputPropsType = {
    id: string;
    type: string;
    placeholder: string;
    label: string;
    name: string;
    size?: number;
    value?: string;
    required?: boolean;
    error?: boolean;
    errorMessage?: string;
    onBlur?: Function;
    onChange: Function;
};

// TODO: перенести вывод сообщений об ошиках в input + добавиьт onBlur
export default class FilterInput extends ReactsComponent<FilterInputPropsType> {
    state = {
        value: '',
    }

    render() {
        return (
            <div className={'flex w-100 column g-8'}>
                <label
                    key={'label'}
                    className={styles.label}
                    for={this.props.id}
                >
                    {this.props.label}
                </label>
                <input
                    className={`${styles.input} ${styles.filter_input} ${
                        this.props.error ? styles.input__error : ''
                    }`}
                    id={this.props.id}
                    type={this.props.type}
                    name={this.props.name}
                    placeholder={this.props.placeholder}
                    required={this.props.required}
                    value={this.props.value}
                />
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
