import { Component } from '../../../../Reacts/index';
import styles from './chips.module.scss';

export default class Chips extends Component<{ children: string }, any> {
    render() {
        return (
            <div
                className={`flex row align-items-center justify-content-center ${styles.chips}`}
            >
                <p>{this.props.children}</p>
            </div>
        );
    }
}
