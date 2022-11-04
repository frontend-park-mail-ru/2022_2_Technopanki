import { Component } from '../../../../Reacts';
import ArrowButton from './ArrowButton';

export default class ArrowButtonWithText extends Component<{
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
