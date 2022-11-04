import { Component } from '../../../../../Reacts';
import Chips from '../../chips/Chips';
import styles from './input.module.scss';

export default class ChipsInput extends Component<{
    id: string;
    label: string;
    items: string[];
    deleteItem: (index: number) => void;
    addItem: (item: string) => void;
}> {
    render() {
        return (
            <div className={'flex column g-8'}>
                <label key={'label'} className={styles.label}>
                    {this.props.label}
                </label>
                <div key={'chips'} className={'flex row flex-wrap g-8'}>
                    {this.props.items?.map((item, index: number) => (
                        <Chips
                            key={index}
                            onDelete={() => this.props.deleteItem(index)}
                            withDelete={true}
                        >
                            {item}
                        </Chips>
                    ))}
                    <input
                        id={this.props.id}
                        className={styles.chips_input}
                        key={'input'}
                        placeholder={'Type here...'}
                        onChange={(e: Event) =>
                            this.props.addItem(e.target.value)
                        }
                    />
                </div>
            </div>
        );
    }
}
