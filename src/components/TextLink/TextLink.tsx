import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import router from '../../router/navigator';
import { ReactsTextNode } from '../../../Reacts/shared/types/node';
import styles from './link.module.scss'

export default class TextLink extends ReactsComponent<{
    to: string;
    content: ReactsTextNode;
}> {
    onClick = (e: MouseEvent) => {
        e.preventDefault();
        router.navigate(this.props.to);
    };

    render() {
        return <a onClick={this.onClick} className={styles.default_link}>{this.props.content}</a>;
    }
}
