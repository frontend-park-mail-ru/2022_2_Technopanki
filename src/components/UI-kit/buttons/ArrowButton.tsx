import { Component } from '../../../../Reacts';
import Arrow from '../../../static/icons/arrow.svg';
import styles from './button.module.scss';

export default class ArrowButton extends Component<{ onClick: Function }> {
    render() {
        console.log(Arrow);
        return (
            <button
                className={`background-900 rounded-max border-none ${styles['btn-arrow']}`}
                dangerouslySetInnerHTML={{ __html: Arrow }}
            ></button>
        );
    }
}
