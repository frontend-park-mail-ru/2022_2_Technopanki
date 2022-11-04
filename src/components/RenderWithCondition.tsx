import { Component } from '../../Reacts';
import { VNodeType } from '../../Reacts/shared/common';

export default class RenderWithCondition extends Component<{
    condition: boolean;
    onSuccess: VNodeType;
}> {
    render() {
        if (this.props.condition) {
            return this.props.onSuccess;
        } else {
            return <div className={'none'}></div>;
        }
    }
}
