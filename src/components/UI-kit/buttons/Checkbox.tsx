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
    state = {
        checked: false,
        checkedName: '',
    }

    handleChecked = (e: MouseEvent) => {
        if (e.target.value === this.state.checkedName && e.target.checked === true) {
            this.setState(state => ({ ...state, checked: false }));
        }
        else {
            this.setState(state => ({ ...state, checked: true, checkedName: e.target.value }));
        }
        e.target.checked = this.state.checked;
    }

    componentDidUpdate() {
        console.log('update checkbox')
    }

    render() {
        return (
            <div
                onClick={this.handleChecked}
                className={`flex row g-8 align-items-center ${styles.radio}`}
            >
                <div name={this.props.name} className={`flex row g-8 align-items-center`}>
                    {/*{this.state.checked ? (*/}
                        <input
                            className={`rounded-max ${styles.radio_input}`}
                            id={this.props.id}
                            type={'radio'}
                            name={this.props.name}
                            value={this.props.children}
                            checked={this.props.children === localStorage.getItem(this.props.children)}
                        />
                    {/*) : (*/}
                    {/*    <input*/}
                    {/*        className={`rounded-max ${styles.radio_input}`}*/}
                    {/*        id={this.props.id}*/}
                    {/*        type={'radio'}*/}
                    {/*        name={this.props.name}*/}
                    {/*        value={this.props.children}*/}
                    {/*        checked={this.state.checked}*/}
                    {/*    />*/}
                    {/*)}*/}
                    <label className={`${styles.radio_label_search}`} for={this.props.children} checked={this.state.checked}>
                        {this.props.children}
                    </label>
                </div>
            </div>
        );
    }
}
