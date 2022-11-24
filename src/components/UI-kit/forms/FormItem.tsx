import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';

export default class FormItem extends ReactsComponent<{
    header: string;
    children: any[];
}> {
    render() {
        console.log(this.props.children);
        return (
            <div className={'columns g-24 w-100'}>
                <h5 className={'col-12'}>{this.props.header}</h5>
                {this.props.children}
            </div>
        );
    }
}
