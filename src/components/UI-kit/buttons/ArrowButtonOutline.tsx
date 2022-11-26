import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';
import Arrow from '../../../static/icons/arrow.svg';

export default class ArrowButtonOutline extends ReactsComponent<{
    onClick?: Function;
}> {
    render() {
        return (
            <button
                className={`background-0 rounded-max cursor-pointer border-none flex align-items-center justify-content-center ${styles['btn-arrow']} ${styles['btn-arrow__outline']}`}
                dangerouslySetInnerHTML={{ __html: Arrow }}
            />
        );
    }
}
