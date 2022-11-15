import { Component } from '../../__Reacts__old_version__';
import { VNodeType } from '../../__Reacts__old_version__/shared/common';

export default class RenderWithCondition extends Component<{
    condition: boolean;
    onSuccess: VNodeType;
}> {
    render() {
        if (this.props.condition) {
            return this.props.onSuccess;
        } else {
            return <p className={'none'}></p>;
        }
    }
}
