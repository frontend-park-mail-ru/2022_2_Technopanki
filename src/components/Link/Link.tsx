import router from '../../router/navigator';
import styles from './link.module.scss';
import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import { ReactsNode } from '../../../Reacts/shared/types/node';

export default class Link extends ReactsComponent<{
    to: string;
    content: ReactsNode;
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
