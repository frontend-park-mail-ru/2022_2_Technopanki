import { Component } from '../../../../../__Reacts__old_version__';
import styles from './input.module.scss';

export default class IconInput extends Component<{
    id: string;
    icon: any;
    type: string;
    placeholder: string;
    label: string;
    name: string;
    value?: string;
}> {
    render() {
        return (
            <div className={'flex w-100 column g-8'}>
                <label className={`${styles.label}`} for={this.props.id}>
                    {this.props.label}
                </label>
                <div className={'flex row'}>
                    <div
                        className={styles.icon}
                        dangerouslySetInnerHTML={{ __html: this.props.icon }}
                    ></div>
                    <input
                        className={`w-100 ${styles.input} ${styles.icon_cursor}`}
                        id={this.props.id}
                        type={this.props.type}
                        placeholder={this.props.placeholder}
                        name={this.props.name}
                        value={this.props.value}
                    />
                </div>
            </div>
        );
    }
}
