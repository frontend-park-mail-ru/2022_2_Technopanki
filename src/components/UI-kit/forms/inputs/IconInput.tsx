import { Component } from '../../../../../Reacts';
import styles from './input.module.scss';

export default class IconInput extends Component<{
    id: string
    icon: any
    type: string
    placeholder: string
    children: string;
}> {
    render() {
        return (
            <div
                className={'flex column g-8'}
            >
                <label
                    className={`${styles.label}`}
                    for={this.props.id}
                >
                    {this.props.children}
                </label>
                <form
                    className={'flex row'}
                >
                    <div
                        className={styles.icon}
                        dangerouslySetInnerHTML={{ __html: this.props.icon }}
                    >
                    </div>
                    <input
                        className={`${styles.input} ${styles.icon_cursor}`}
                        id={this.props.id}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                    />
                </form>
            </div>
        )
    }
}