import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';

export default class TextBlock extends ReactsComponent<{
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
