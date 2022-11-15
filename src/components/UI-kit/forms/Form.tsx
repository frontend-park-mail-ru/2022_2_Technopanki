import { Component } from '../../../../__Reacts__old_version__';
import { VNodeType } from '../../../../__Reacts__old_version__/shared/common';

export type FormSectionType = {
    header: string;
    content: VNodeType;
};

type FormPropsType = {
    sections: FormSectionType[];
    submitComponent: VNodeType;
    onSubmit: Function;
    id?: string;
};

export default class Form extends Component<FormPropsType> {
    render() {
        return (
            <form
                id={this.props.id}
                onSubmit={this.props.onSubmit}
                className={'flex w-100 column g-24'}
            >
                {this.props.sections?.map(section => (
                    <div key={section.header} className={'flex column g-16'}>
                        <h5 key={'header'}>{section.header}</h5>
                        <div key={'content'}>{section.content}</div>
                    </div>
                ))}
                {this.props.submitComponent}
            </form>
        );
    }
}
