import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './button.module.scss';
import Svg from '../../Svg';
import Star from '../../../static/icons/star.svg'

export default class StarButton extends ReactsComponent<{
    onClick?: Function;
    type?: string;
    isStared: boolean;
}> {
    render() {
        return (
            <button
                type={this.props.type || ''}
                onClick={this.props.onClick}
                className={styles.btn}
            >
                <Svg
                    src={Star}
                    height={16}
                    color={'700'}
                />
            </button>
        );
    }
}
