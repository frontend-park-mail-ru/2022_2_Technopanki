import { Component } from '../../../../Reacts';
import { VNodeType } from '../../../../Reacts/shared/common';
import styles from './dropdown.module.scss';

export default class Dropdown extends Component<
    {
        hidden: VNodeType;
        content: VNodeType;
        direction: 'left' | 'center' | 'right';
    },
    { isOpen: boolean }
> {
    state = {
        isOpen: false,
    };

    render() {
        return (
            <div
                className={`relative flex column g-4 ${
                    this.state.isOpen ? 'cursor-default' : 'cursor-help'
                }`}
            >
                <div
                    key={'content'}
                    onClick={() =>
                        this.setState(state => ({ isOpen: !state.isOpen }))
                    }
                >
                    {this.props.content}
                </div>
                <div key={'hidden'} className={'relative cursor-default'}>
                    <div
                        className={`absolute ${
                            this.state.isOpen
                                ? `flex-${this.props.direction}`
                                : 'none'
                        } ${styles.hidden}`}
                    >
                        {this.props.hidden}
                    </div>
                </div>
            </div>
        );
    }
}
