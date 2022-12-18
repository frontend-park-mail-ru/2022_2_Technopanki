import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import styles from './button.module.scss'

export default class LongButton extends ReactsComponent<{
    direction: 'right' | 'left';
    content: ReactsComponentNode | string;
    onClick: Function;
}>{
    setActive = (event: MouseEvent) => {
        let cur = document.querySelector(`.${styles.long_button_selected}`);
        cur.classList.remove(`${styles.long_button_selected}`);
        let target = event.target as Element;

        target.classList.add(`${styles.long_button_selected}`);
        this.props.onClick();
    };

    render() {
        return (
            <div className={'w-100 cursor-pointer'}>
                {this.props.direction === 'right' ? (
                    <div
                        className={`flex row align-items-center justify-content-center w-100 ${styles.long_button_right}`}
                        onClick={this.setActive}
                    >
                        {this.props.content}
                    </div>
                ) : (
                    <div
                        className={`flex row align-items-center justify-content-center w-100 ${styles.long_button_left} ${styles.long_button_selected}`}
                        onClick={this.setActive}
                    >
                        {this.props.content}
                    </div>
                )}
            </div>
        )
    }
}