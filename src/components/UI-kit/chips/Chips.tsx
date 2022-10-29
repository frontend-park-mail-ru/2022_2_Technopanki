import { Component } from '../../../../Reacts';
import styles from './chips.module.scss';

/**
 * Chips component.
 * IMPORTANT: Don’t use chip text longer than 20 characters. Don’t display a single chip by itself. Chips should appear in a set.
 */
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
