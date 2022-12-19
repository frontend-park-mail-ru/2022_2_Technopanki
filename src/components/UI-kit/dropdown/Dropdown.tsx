import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import styles from './dropdown.module.scss';

export default class Dropdown extends ReactsComponent<
    {
        hidden: ReactsComponentNode;
        content: ReactsComponentNode;
        direction: 'left' | 'center' | 'right';
        mt?: string;
        onClose?: Function;
    },
    { isOpen: boolean }
> {
    state = {
        isOpen: false,
    };

    handleDropdown = () => {
        this.setState(state => ({
            ...state,
            isOpen: !this.state.isOpen,
        }));

        if (!this.state.isOpen && this.props.onClose) {
            this.props.onClose()
        }
    };

    render() {
        return (
            <div
                className={`relative flex column g-4 ${
                    this.state.isOpen ? 'cursor-default' : ''
                }`}
            >
                <div key={'content'} onClick={this.handleDropdown}>
                    {this.props.content}
                </div>
                <div className={'relative cursor-default'}>
                    <div
                        className={`absolute ${styles.dropdown} ${
                            this.state.isOpen ? `flex` : 'none'
                        } ${
                            this.state.isOpen
                                ? this.props.mt
                                    ? `mt-${this.props.mt}`
                                    : 'mt-8'
                                : 'none'
                        }`}
                    >
                        {this.props.hidden}
                    </div>
                </div>
            </div>
        );
    }
}
