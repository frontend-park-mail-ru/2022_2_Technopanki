import { Component } from '../../../../Reacts';

export default class RadioButton extends Component {
    render() {
        return (
            <div>
                <input
                    checked={this.props.checked}
                    id={this.props.id}
                    type={'radio'}
                    name={this.props.name}
                    value={this.props.value}
                />
                <label htmlFor={this.props.id}>{this.props.children}</label>
            </div>
        );
    }
}
