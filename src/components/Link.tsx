import { Component } from '../../Reacts';
import router from '../router/navigator.tsx';
import { VNodeType } from '../../Reacts/shared/common';

let counter = 0;

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
