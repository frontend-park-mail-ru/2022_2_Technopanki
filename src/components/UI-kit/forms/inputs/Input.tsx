import { Component } from '../../../../../Reacts';
import styles from './input.module.scss';

export default class Input extends Component<{
    id: string;
    type: string;
    placeholder: string;
    children: string;
}> {
    render() {
        return (
            <div className={'flex column g-8'}>
                <label
                    key={'label'}
                    className={`${styles.label}`}
                    for={this.props.id}
                >
                    {this.props.children}
                </label>
                <input
                    key={'input'}
                    className={`${styles.input}`}
                    id={this.props.id}
                    type={this.props.type}
                    placeholder={this.props.placeholder}
                />
            </div>
        );
    }
}
