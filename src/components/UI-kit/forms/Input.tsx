import { Component } from '../../../../Reacts/index';
import './styles/globals.scss';
import styles from './button.module.scss';
export default class Input extends Component<{
    type: string;
    id: string;
    placeholder: string;
}> {
    render() {
        return (
            <label for={this.props.id}>

        )
    }
}