import { Component } from '../../Reacts';
import router from '../router/navigator';
import { VNodeType } from '../../Reacts/shared/common';

export default class Link extends Component<{
    to: string;
    content: VNodeType;
}> {
    onClick = (e: MouseEvent) => {
        e.preventDefault();
        router.navigate(this.props.to);
    };

    render() {
        return <div onClick={this.onClick}>{this.props.content}</div>;
    }
}
