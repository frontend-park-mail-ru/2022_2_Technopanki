import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from '../radioButton/radio.module.scss';

export default class CheckBox extends ReactsComponent<
    {
        checked?: boolean;
        id?: string;
        name: string;
        value?: string;
        inSearch?: boolean;
        children: string;
        onClick?: Function;
    },
    { checked: boolean; checkedName: string }
> {
    state = {
        checked: false,
        checkedName: '',
    };

    disableChecked = (e: MouseEvent) => {
        this.setState(state => ({
            ...state,
            checked: !state.checked,
            checkedName: (e.target as EventTarget).value,
        }));
        (e.target as EventTarget).checked = this.state.checked;
    };

    render() {
        return (
            <div
                onClick={this.disableChecked}
                className={`flex row g-8 align-items-center ${styles.radio}`}
            >
                <label
                    name={this.props.name}
                    className={`flex row g-8 align-items-center ${styles.radio_label_search}`}
                    for={this.props.id}
                    checked={this.state.checked}
                >
                    {this.props.checked ? (
                        <input
                            className={`rounded-max ${styles.radio_input}`}
                            id={this.props.id}
                            type={'radio'}
                            checked={true}
                            name={this.props.name}
                            value={this.props.children}
                        />
                    ) : (
                        <input
                            className={`rounded-max ${styles.radio_input}`}
                            id={this.props.id}
                            type={'radio'}
                            name={this.props.name}
                            value={this.props.children}
                        />
                    )}
                    {this.props.children}
                </label>
            </div>
        );
    }
}
