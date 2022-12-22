import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import DataTooltip from '../dataTooltip/DataTooltip';

export default class ButtonIcon extends ReactsComponent<{
    onClick?: Function;
    icon: ReactsComponentNode;
    children?: string;
    type?: string;
    dataTooltip: string;
}> {
    state = {
        isOpen: false,
    }

    toggleTooltip = () => {this.setState(state => ({ ...state, isOpen: !this.state.isOpen }))}

    render() {
        return (
            <div className={'flex column g-4'}>
                <button
                    type={this.props.type}
                    onClick={this.props.onClick}
                    className={`${styles.btn}`}
                    onMouseOver={this.toggleTooltip}
                    onMouseLeave={this.toggleTooltip}
                >
                    <div
                        className={styles['btn-icon']}
                        dangerouslySetInnerHTML={{
                            __html: this.props.icon,
                        }}
                    />
                    <p>{this.props.children ? this.props.children : ''}</p>
                </button>
            </div>
        );
    }
}
