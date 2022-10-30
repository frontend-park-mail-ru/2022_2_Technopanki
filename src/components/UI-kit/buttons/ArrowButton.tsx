import { Component } from '../../../../Reacts';
import Arrow from '../../../static/icons/arrow.svg';
import styles from './button.module.scss';

export default class ArrowButton extends Component<{ onClick?: Function }> {
    render() {
        return (
            <button
                className={`background-900 rounded-max border-none cursor-pointer ${styles['btn-arrow']}`}
                dangerouslySetInnerHTML={{ __html: Arrow }}
            />
        );
    }
}
