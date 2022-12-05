import { ReactsComponent } from '../../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../../Reacts/shared/types/node';

export default class DropdownMenu extends ReactsComponent<
    {
        hidden: ReactsComponentNode;
        content: ReactsComponentNode;
        direction: 'left' | 'center' | 'right';
        mt?: string;
        isOpen?: boolean;
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
                {this.props.isOpen ? (
                    <div key={'hidden'} className={'relative cursor-default'}>
                        <div
                            className={`absolute ${
                                this.state.isOpen
                                    ? `flex-${this.props.direction}`
                                    : 'none'
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
                ) : (
                    <div />
                )}
            </div>
        );
    }
}
