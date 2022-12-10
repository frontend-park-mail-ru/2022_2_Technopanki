import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import styles from './formInputs.module.scss';

export default class FormCheckbox extends ReactsComponent<{
    checked?: boolean;
    id: string;
    name: string;
    value?: string;
    children: string;
    onClick?: Function;
}> {
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className={`flex row g-8 align-items-center ${styles.checkbox}`}
            >
                <input
                    className={`rounded-max ${styles['checkbox-input']}`}
                    id={this.props.id}
                    checked={this.props.checked}
                    type={'checkbox'}
                    name={this.props.name}
                    value={this.props.value}
                />
                <label
                    className={`${styles['checkbox-label']}`}
                    for={this.props.id}
                >
                    {this.props.children}
                </label>
            </div>
        );
    }
}
