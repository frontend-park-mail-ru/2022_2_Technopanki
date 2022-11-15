import { Component } from '../../../__Reacts__old_version__';
import router from '../../router/navigator.tsx';
import { VNodeType } from '../../../__Reacts__old_version__/shared/common';
import styles from './link.module.scss';

export default class Link extends Component<{
    to: string;
    content: VNodeType;
    onClick?: Function;
}> {
    onClick = (e: MouseEvent) => {
        e.preventDefault();
        this.props.onClick && this.props.onClick(e);
        router.navigate(this.props.to);
    };

    render() {
        return (
            <a
                className={`cursor-pointer ${styles.link}`}
                onClick={this.onClick}
            >
                {this.props.content}
            </a>
        );
    }
}
