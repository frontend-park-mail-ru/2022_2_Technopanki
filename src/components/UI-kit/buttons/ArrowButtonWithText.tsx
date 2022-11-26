import ArrowButton from './ArrowButton';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';

export default class ArrowButtonWithText extends ReactsComponent<{
    children: string;
    onClick?: Function;
}> {
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className={'flex row g-12 align-items-center cursor-pointer'}
            >
                <ArrowButton />
                <p className={'color-900'}>{this.props.children}</p>
            </div>
        );
    }
}
