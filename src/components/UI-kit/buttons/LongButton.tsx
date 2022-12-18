import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import styles from './button.module.scss'

export default class LongButton extends ReactsComponent<{
    direction: 'right' | 'left';
    content: ReactsComponentNode | string;
}>{
    render() {
        return (
            <div className={'w-100'}>
                {this.props.direction === 'right' ? (
                    <div className={`flex row align-items-center justify-content-center w-100 ${styles.long_button_right}`}>
                        {this.props.content}
                    </div>
                ) : (
                    <div className={`flex row align-items-center justify-content-center w-100 ${styles.long_button_left}`}>
                        {this.props.content}
                    </div>
                )}
            </div>
        )
    }
}
