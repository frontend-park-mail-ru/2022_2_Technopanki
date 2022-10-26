import { Component } from '../../../Reacts/index';
import styles from './button.module.scss';

export default class ButtonText extends Component {
    render() {
        return <button className={styles.btn}>{this.props.children}</button>;
    }
}
