import { Component } from '../../__Reacts__old_version__';
import { VNodeType } from '../../__Reacts__old_version__/shared/common';
import { ReactsComponent } from '../../Reacts/reacts/src/Component';
import { ReactsNode } from '../../Reacts/shared/types/node';

export default class RenderWithCondition extends ReactsComponent<{
    condition: boolean;
    onSuccess: ReactsNode;
}> {
    render() {
        if (this.props.condition) {
            return this.props.onSuccess;
        } else {
            return <p className={'none'}></p>;
        }
    }
}
