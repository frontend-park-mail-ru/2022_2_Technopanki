import { Component } from '../../../Reacts';
import router from '../../router/navigator';
import { VNodeType } from '../../../Reacts/shared/common';
import styles from './link.module.scss';

export default class Link extends Component<{
    to: string;
    content: VNodeType;
}> {
    onClick = (e: MouseEvent) => {
        e.preventDefault();
        router.navigate(this.props.to);
    };

    render() {
        return (
            <a className={styles.link} onClick={this.onClick}>
                {this.props.content}
            </a>
        );
    }
}
