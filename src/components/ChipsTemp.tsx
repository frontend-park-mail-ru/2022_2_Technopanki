import { Component } from '../../Reacts';
import Chips from './UI-kit/chips/Chips';
import Dropdown from './UI-kit/dropdown/Dropdown';

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
                        <Dropdown
                            key={item.id}
                            hidden={
                                <div
                                    className={
                                        'padding-4 background-50 rounded-md'
                                    }
                                >
                                    <p>This is chips element</p>
                                </div>
                            }
                            content={<Chips>{item.name}</Chips>}
                        ></Dropdown>
                    ))}
                </div>
            </div>
        );
    }
}
