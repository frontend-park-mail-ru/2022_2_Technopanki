import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './radio.module.scss';

export default class RadioButton extends ReactsComponent<{
    checked: boolean;
    id: string;
    name: string;
    value: string;
    children: string;
    onClick?: Function;
}> {
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className={`flex row g-8 align-items-center ${styles.radio}`}
            >
                {this.props.checked ? (
                    <input
                        className={`rounded-max ${styles.radio_input}`}
                        checked
                        id={this.props.id}
                        type={'radio'}
                        name={this.props.name}
                        value={this.props.value}
                    />
                ) : (
                    <input
                        className={`rounded-max ${styles.radio_input}`}
                        id={this.props.id}
                        type={'radio'}
                        name={this.props.name}
                        value={this.props.value}
                    />
                )}
                <label className={`${styles.radio_label}`} for={this.props.id}>
                    {this.props.children}
                </label>
            </div>
        );
    }
}
