import { ReactsComponent } from '../../Reacts/reacts/src/Component';
import FormInputGroup from './UI-kit/forms/formInputs/FormInputGroup';

export default class WorkExperienceInput extends ReactsComponent<{
    size: '3' | '4' | '6' | '12';
}> {
    render() {
        return (
            <FormInputGroup
                id={'experience'}
                size={this.props.size}
                label={'Опыт работы'}
                name={'experience'}
                options={[
                    {
                        value: 'Нет опыта работы',
                        children: 'Нет опыта работы',
                    },
                    {
                        value: 'От 1 года до 3 лет',
                        children: 'От 1 года до 3 лет',
                    },
                    {
                        value: 'От 3 до 5 лет',
                        children: 'От 3 до 5 лет',
                    },
                    {
                        value: 'От 5 до 10 лет',
                        children: 'От 5 до 10 лет',
                    },
                    {
                        value: 'Больше 10 лет',
                        children: 'Больше 10 лет',
                    },
                ]}
            />
        );
    }
}
