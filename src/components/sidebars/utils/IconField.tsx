import { Component } from '../../../../Reacts';

export default class IconField extends Component<{
    icon: string;
    content: string;
}> {
    render() {
        return (
            <div className={'flex row g-8 align-items-center'}>
                <div
                    className={'inner-svg-h-16 inner-svg-200'}
                    dangerouslySetInnerHTML={{
                        __html: this.props.icon,
                    }}
                ></div>
                <p>{this.props.content}</p>
            </div>
        );
    }
}
