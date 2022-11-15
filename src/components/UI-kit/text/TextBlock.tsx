import { Component } from '../../../../__Reacts__old_version__';

export default class TextBlock extends Component<{
    headline: string;
    content: string;
}> {
    render() {
        return (
            <div className={'flex column g-16'}>
                <h6>{this.props.headline}</h6>
                <p className={'color-700'}>{this.props.content}</p>
            </div>
        );
    }
}
