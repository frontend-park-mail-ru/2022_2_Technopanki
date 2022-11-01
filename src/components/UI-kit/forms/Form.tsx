import { Component } from '../../../../Reacts';
import { VNodeType } from '../../../../Reacts/shared/common';

export type FormSectionType = {
    header: string;
    content: VNodeType;
};

type FormPropsType = {
    sections: FormSectionType[];
    submitComponent: VNodeType;
    onSubmit: Function;
};

export default class Form extends Component<FormPropsType> {
    render() {
        return (
            <form
                onSubmit={this.props.onSubmit}
                className={'flex w-100 column g-24'}
            >
                {this.props.sections.map(section => (
                    <div className={'flex column g-16'}>
                        <h5>{section.header}</h5>
                        {section.content}
                    </div>
                ))}
                {this.props.submitComponent}
            </form>
        );
    }
}
