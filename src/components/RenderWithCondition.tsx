import { ReactsComponent } from '../../Reacts/reacts/src/Component';
import { ReactsNode } from '../../Reacts/shared/types/node';

export default class RenderWithCondition extends ReactsComponent<{
    condition: boolean;
    onSuccess: ReactsNode;
}> {
    render() {
        return (
            <div className={this.props.condition ? 'block' : 'none'}>
                {this.props.onSuccess}
            </div>
        );
    }
}
