import { Component } from '../../Reacts';
import router from '../router/navigator';
import { VNodeType } from '../../Reacts/shared/common';

let counter = 0;

export default class Link extends Component<{
    to: string;
    content: VNodeType;
}> {
    onClick = (e: MouseEvent) => {
        e.preventDefault();
        counter += 1;
        console.log(counter);
        router.navigate(this.props.to);
    };

    render() {
        return <div onClick={this.onClick}>{this.props.content}</div>;
    }
}
