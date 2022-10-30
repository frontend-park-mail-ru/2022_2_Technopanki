import { Component } from '../../../../Reacts';
import styles from './button.module.scss';
import Arrow from '../../../static/icons/arrow.svg';

export default class ArrowButtonOutline extends Component<{
    onClick?: Function;
}> {
    render() {
        return (
            <div>
                <button
                    className={`background-0 rounded-max border-none ${styles['btn-arrow']} ${styles['btn-arrow__outline']}`}
                    dangerouslySetInnerHTML={{ __html: Arrow }}
                />
            </div>
        );
    }
}
