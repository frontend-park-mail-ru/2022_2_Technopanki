import { Component } from '../../../../../Reacts';
import styles from './input.module.scss';

// TODO: перенести вывод сообщений об ошиках в input
export default class Input extends Component<{
    id: string;
    type: string;
    placeholder: string;
    children: string;
    name: string;
    required?: boolean;
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
                {this.props.required ? (
                    <input
                        key={'input'}
                        className={`${styles.input}`}
                        id={this.props.id}
                        type={this.props.type}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                        required
                    />
                ) : (
                    <input
                        key={'input'}
                        className={`${styles.input}`}
                        id={this.props.id}
                        type={this.props.type}
                        name={this.props.name}
                        placeholder={this.props.placeholder}
                    />
                )}
                <p className={`form__input-error-${this.props.name}`}></p>
            </div>
        );
    }
}
