import { ReactsComponent } from '../../Reacts/reacts/src/Component';
import router from '../router/navigator';
import { VNodeType } from '../../__Reacts__old_version__/shared/common';

let counter = 0;

export default class Link extends ReactsComponent<{
    to: string;
    content: VNodeType;
}> {
    onClick = (e: MouseEvent) => {
        e.preventDefault();
        console.log('navigate')
        router.navigate(this.props.to);
    };

    render() {
        return <div onClick={this.onClick}>{this.props.content}</div>;
    }
}
