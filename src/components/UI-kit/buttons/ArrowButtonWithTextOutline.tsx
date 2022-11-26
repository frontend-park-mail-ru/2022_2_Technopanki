import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import ArrowButton from './ArrowButton';
import ArrowButtonOutline from './ArrowButtonOutline';

export default class ArrowButtonWithTextOutline extends ReactsComponent<{
    children: string;
}> {
    render() {
        return (
            <div className={'flex row g-12 align-items-center cursor-pointer'}>
                <ArrowButtonOutline />
                <p>{this.props.children}</p>
            </div>
        );
    }
}
