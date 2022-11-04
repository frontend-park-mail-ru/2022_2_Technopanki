import { Component } from '../../../../Reacts';
import styles from './chips.module.scss';
import Svg from '../../Svg';
import CloseIcon from '../../../static/icons/x-close.svg';

/**
 * Chips component.
 * IMPORTANT: Don’t use chip text longer than 20 characters. Don’t display a single chip by itself. Chips should appear in a set.
 */
/*TODO condition render component*/
export default class Chips extends Component<
    { children: string; withDelete?: boolean; onDelete?: Function },
    any
> {
    render() {
        return (
            <div
                key={'item'}
                className={`flex row align-items-center g-8 justify-content-center ${styles.chips}`}
            >
                <p key={'children'}>{this.props.children}</p>
                {this.props.withDelete ? (
                    <Svg
                        key={'svg'}
                        src={CloseIcon}
                        height={16}
                        padding={4}
                        cursor={'pointer'}
                        onClick={this.props.onDelete}
                    />
                ) : (
                    <div key={'none'} className={'none'}></div>
                )}
            </div>
        );
    }
}
