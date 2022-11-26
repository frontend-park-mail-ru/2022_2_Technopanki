import styles from './modal.module.scss';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';

export default class ModalWindow extends ReactsComponent<
    { content: ReactsComponentNode; hidden: ReactsComponentNode },
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
