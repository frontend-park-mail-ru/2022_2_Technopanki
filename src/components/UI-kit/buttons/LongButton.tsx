import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import styles from './button.module.scss'

export default class LongButton extends ReactsComponent<{
    direction: 'right' | 'left';
    content: ReactsComponentNode
}>{
    render() {
        return (
            <div className={`flex row align-items-center justify-content-center ${styles.long_button}-${this.props.direction}`}>
                {this.props.content}
            </div>
        )
    }
}