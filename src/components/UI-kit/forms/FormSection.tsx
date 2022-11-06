import { Component } from '../../../../Reacts';
import Input, { InputPropsType } from './inputs/Input';
import Textarea from './inputs/Textarea';

export default class FormSection extends Component<{
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
            <div className={'w-100'}>
                <h5 key={'header'} className={'col-12'}>
                    {this.props.header}
                </h5>
                {Object.entries(this.props.fields).map(([id, field]) => (
                    <div
                        key={id}
                        className={`col-12 col-md-${field.size.toString()}`}
                    >
                        {field.type === 'textarea' ? (
                            <Textarea
                                key={id}
                                id={id}
                                placeholder={field.placeholder}
                                value={field.value}
                                label={field.label}
                                name={field.name}
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
