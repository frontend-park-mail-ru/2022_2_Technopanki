import { Component } from '../../../../__Reacts__old_version__';
import { VNodeType } from '../../../../__Reacts__old_version__/shared/common';
import styles from './modal.module.scss';

export default class ModalWindow extends Component<
    { content: VNodeType; hidden: VNodeType },
    { isOpen: boolean }
> {
    state = {
        isOpen: false,
    };

    toggleModal = () => {
        this.setState(state => ({ ...state, isOpen: !state.isOpen }));
    };

    render() {
        // @ts-ignore IMPORTANT: we set a new event listener to hidden element
        this.props.hidden.props.onClick = (e: MouseEvent) =>
            e.stopPropagation();

        return (
            <div>
                <div className={'cursor-pointer'} onClick={this.toggleModal}>
                    {this.props.content}
                </div>
                <div
                    onClick={this.toggleModal}
                    className={`${
                        this.state.isOpen ? 'flex' : 'none'
                    } column fixed x-0 t-0 h-100vh screen-responsive justify-content-center align-items-center ${
                        styles.modal
                    }`}
                >
                    {this.props.hidden}
                </div>
            </div>
        );
    }
}
