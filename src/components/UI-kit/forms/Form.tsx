import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';

export type FormSectionType = {
    header: string;
    content: ReactsComponentNode;
};

type FormPropsType = {
    sections: FormSectionType[];
    submitComponent: ReactsComponentNode;
    onSubmit: Function;
    id?: string;
};

export default class Form extends ReactsComponent<FormPropsType> {
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
