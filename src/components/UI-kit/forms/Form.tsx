import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';

export type FormSectionType = {
    header: string;
    content: ReactsComponentNode;
};

type FormPropsType = {
    onSubmit: Function;
    children: ReactsComponentNode[];
    id?: string;
};

export default class Form extends ReactsComponent<FormPropsType> {
    render() {
        return (
            <form
                id={this.props.id}
                onSubmit={this.props.onSubmit}
                className={'col-12 flex column g-24'}
            >
                {this.props.children}
            </form>
        );
    }
}
