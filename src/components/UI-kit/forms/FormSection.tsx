import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import Input, { InputPropsType } from './inputs/Input';
import Textarea from './inputs/Textarea';

export default class FormSection extends ReactsComponent<{
    header: string;
    fields: {
        [key: string]: {
            fieldHeader: string;
            props: InputPropsType;
        };
    };
}> {
    render() {
        return (
            <div className={'columns w-100 g-16'}>
                <h5 key={'header'} className={'col-12'}>
                    {this.props.header}
                </h5>
                {Object.entries(this.props.fields).map(([id, field]) => (
                    <div
                        key={id}
                        className={`col-12 col-md-${field.props.size.toString()}`}
                    >
                        {field.props.type === 'textarea' ? (
                            <Textarea
                                key={id}
                                id={id}
                                placeholder={field.props.placeholder}
                                value={field.props.value}
                                label={field.props.label}
                                name={field.props.name}
                                error={field.props.error}
                                errorMessage={field.props.errorMessage}
                            />
                        ) : (
                            <Input
                                key={id}
                                id={id}
                                type={field.props.type}
                                placeholder={field.props.placeholder}
                                label={field.props.label}
                                name={field.props.name}
                                value={field?.props.value}
                                error={field.props.error}
                                errorMessage={field.props.errorMessage}
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    }
}
