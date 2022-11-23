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
                        className={`col-12 ${
                            field.size
                                ? `col-md-${field.size.toString()}`
                                : ''
                        }`}
                    >
                        {field.type === 'textarea' ? (
                            <Textarea
                                key={id}
                                id={id}
                                placeholder={field.placeholder}
                                value={field.value}
                                label={field.label}
                                name={field.name}
                                error={field.error}
                                errorMessage={field.errorMessage}
                            />
                        ) : (
                            <Input
                                key={id}
                                id={id}
                                type={field.type}
                                placeholder={field.placeholder}
                                label={field.label}
                                name={field.name}
                                value={field?.value}
                                error={field.error}
                                errorMessage={field.errorMessage}
                            />
                        )}
                    </div>
                ))}
            </div>
        );
    }
}
