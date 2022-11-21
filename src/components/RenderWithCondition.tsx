import { ReactsComponentNode } from '../../Reacts/shared/types/node';
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
