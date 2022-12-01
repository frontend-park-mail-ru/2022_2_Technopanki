import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from '../radioButton/radio.module.scss';
import * as fs from 'fs';

export default class CheckBox extends ReactsComponent<{
    checked?: boolean;
    id?: string;
    name: string;
    value?: string;
    inSearch?: boolean;
    children: string;
    onClick?: Function;
}>{
    state ={
        checked: false,
        checkedName: '',
    }

    disableChecked = (e: MouseEvent) => {
        console.log(e.target)
        if (e.target.value === this.state.checkedName && e.target.checked === true) {
            console.log(e.target.value, this.state.checkedName);
            this.setState(state => ({ ...state, checked: false }));
        }
        else {
            console.log('changed');
            this.setState(state => ({ ...state, checked: true, checkedName: e.target.value }));
        }
        console.log('state: ', this.state)
        e.target.checked = this.state.checked
    }

    render() {
        return (
            <div
                onClick={this.disableChecked}
                className={`flex row g-8 align-items-center ${styles.radio}`}
            >
                <label name={this.props.name} className={`flex row g-8 align-items-center ${styles.radio_label_search}`} for={this.props.id} checked={this.state.checked}>
                    {this.props.checked ? (
                        <input
                            className={`rounded-max ${styles.radio_input}`}
                            id={this.props.id}
                            type={'radio'}
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