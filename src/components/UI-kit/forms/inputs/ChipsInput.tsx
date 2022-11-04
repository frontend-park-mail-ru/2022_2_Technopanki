import { Component } from '../../../../../Reacts';
import Chips from '../../chips/Chips';
import styles from './input.module.scss';

export default class ChipsInput extends Component<
    {
        id: string;
        label: string;
        initialItems: string[];
    },
    {
        items: string[];
    }
> {
    state = {
        items: this.props.initialItems,
    };

    deleteItem = (index: number) => {
        this.setState(state => ({
            ...state,
            items: [
                ...state.items.slice(0, index),
                ...state.items.slice(index + 1, -1),
            ],
        }));
    };

    addItem = (value: string) => {
        this.setState(state => ({
            ...state,
            items: [...state.items, value],
        }));
    };

    render() {
        return (
            <div className={'flex column g-8'}>
                <label key={'label'} className={styles.label}>
                    {this.props.label}
                </label>
                <div key={'chips'} className={'flex row flex-wrap g-8'}>
                    {this.state.items?.map((item, index: number) => (
                        <Chips
                            key={index}
                            onDelete={() => this.deleteItem(index)}
                            withDelete={true}
                        >
                            {item}
                        </Chips>
                    ))}
                    <input
                        id={this.props.id}
                        className={styles.chips_input}
                        key={'input'}
                        items={this.state.items}
                        onChange={(e: Event) => this.addItem(e.target.value)}
                    />
                </div>
            </div>
        );
    }
}
