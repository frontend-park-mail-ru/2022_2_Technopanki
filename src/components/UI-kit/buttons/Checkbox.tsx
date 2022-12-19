import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from '../radioButton/radio.module.scss';

export default class CheckBox extends ReactsComponent<{
    checked?: boolean;
    id?: string;
    name: string;
    value?: string;
    inSearch?: boolean;
    children: string;
    onClick?: Function;
}>{
    state = {
        checked: false,
        checkedName: '',
    }

    handleChecked = (e: MouseEvent) => {
        if (e.target.value === this.state.checkedName && e.target.checked === true) {
            this.setState(state => ({ ...state, checked: false }));
        } else {
            this.setState(state => ({ ...state, checked: true, checkedName: e.target.value }));
        }
        e.target.checked = this.state.checked;
    }

    render() {
        return (
            <div
                onClick={this.handleChecked}
                className={`flex row g-8 align-items-center ${styles.radio}`}
            >
                <div name={this.props.name} className={`flex row g-8 align-items-center`}>
                        <input
                            className={`rounded-max ${styles.radio_input}`}
                            id={this.props.id}
                            type={'radio'}
                            name={this.props.name}
                            value={this.props.children}
                        />
                    <label className={styles.radio_label_search} for={this.props.children} checked={this.state.checked}>
                        {this.props.children}
                    </label>
                </div>
            </div>
        );
    }
}
