import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from '../inputs/input.module.scss';

type FormInputGroupProps = {
    id: string;
    label: string;
    name: string;
    options: { value: string; children: string }[];
    size: '3' | '4' | '6' | '12';
    [key: string]: any;
};

export default class FormInputGroup extends ReactsComponent<FormInputGroupProps> {
    render() {
        return (
            <div
                className={`flex w-100 column g-8 col-12 col-md-${this.props.size}`}
            >
                <label className={`${styles.label}`} htmlFor={this.props.id}>
                    {this.props.label}
                </label>
                <select
                    className={styles.select}
                    id={this.props.id}
                    name={this.props.name}
                >
                    {this.props.options.map(option => (
                        <option value={option.value}>{option.children}</option>
                    ))}
                </select>
            </div>
        );
    }
}
