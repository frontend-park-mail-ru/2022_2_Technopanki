import { ReactsComponent } from '../../Reacts/reacts/src/Component';

export default class Svg extends ReactsComponent<{
    src: string;
    height: number | string;
    padding?: number | string;
    onClick?: Function;
    cursor?: string;
}> {
    render() {
        return (
            <div
                onClick={this.props.onClick}
                className={`inner-svg-h-${this.props.height.toString()} ${
                    this.props.padding ? `pt-${this.props.padding}` : ''
                } ${this.props.cursor ? `cursor-${this.props.cursor}` : ''}`}
                dangerouslySetInnerHTML={{
                    __html: this.props.src,
                }}
            ></div>
        );
    }
}
