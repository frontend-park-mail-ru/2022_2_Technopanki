import { Component } from '../../Reacts/index';
import Chips from './UI-kit/chips/Chips';

export default class ChipsTemp extends Component<
    any,
    { data: { id: number; name: string }[] }
> {
    state = {
        data: [
            {
                id: 1,
                name: 'Vlad',
            },
            {
                id: 2,
                name: 'Sonya',
            },
            {
                id: 3,
                name: 'Zahar',
            },
            {
                id: 4,
                name: 'Akim',
            },
            {
                id: 5,
                name: 'Vlad',
            },
            {
                id: 6,
                name: 'Sonya',
            },
            {
                id: 7,
                name: 'Zahar',
            },
            {
                id: 8,
                name: 'Akim',
            },
        ],
    };

    render() {
        return (
            <div className={'flex column g-4'}>
                <h3 key={'header'}>Chips component</h3>
                <div key={'div'} className={'flex row g-8'}>
                    {this.state.data.map(item => (
                        <Chips key={item.id}>{item.name}</Chips>
                    ))}
                </div>
            </div>
        );
    }
}
