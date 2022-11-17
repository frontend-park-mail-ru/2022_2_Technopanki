import { Component } from '../../../../__Reacts__old_version__';
import Arrow from '../../../static/icons/arrow.svg';
import styles from './button.module.scss';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';

export default class ArrowButton extends ReactsComponent<{
    onClick?: Function;
}> {
    render() {
        return (
            <button
                onClick={this.props.onClick}
                className={`background-900 rounded-max border-none cursor-pointer flex align-items-center justify-content-center ${styles['btn-arrow']}`}
                dangerouslySetInnerHTML={{ __html: Arrow }}
            />
        );
    }
}
