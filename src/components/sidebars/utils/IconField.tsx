import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';

export default class IconField extends ReactsComponent<{
    icon: string;
    content: string;
}> {
    render() {
        return (
            <div className={'flex row g-8 align-items-center'}>
                <div
                    className={'inner-svg-h-16 pt-3'}
                    dangerouslySetInnerHTML={{
                        __html: this.props.icon,
                    }}
                ></div>
                <p>{this.props.content}</p>
            </div>
        );
    }
}
