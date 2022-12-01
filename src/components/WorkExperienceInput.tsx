import { ReactsComponent } from '../../Reacts/reacts/src/Component';
import FormInputGroup from './UI-kit/forms/formInputs/FormInputGroup';

export default class WorkExperienceInput extends ReactsComponent<{
    size: '3' | '4' | '6' | '12';
}> {
    render() {
        return (
            <FormInputGroup
                id={'experience'}
                size={'4'}
                label={'Опыт работы'}
                name={'experience'}
                options={[
                    {
                        value: 'Не имеет значения',
                        children: 'Не имеет значения',
                    },
                    {
                        value: 'Нет опыта',
                        children: 'Нет опыта',
                    },
                    {
                        value: 'От 1 года до 3 лет',
                        children: 'От 1 года до 3 лет',
                    },
                    {
                        value: 'От 3 до 6 лет',
                        children: 'От 3 до 6 лет',
                    },
                    {
                        value: 'Более 6 лет',
                        children: 'Более 6 лет',
                    },
                ]}
            />
        );
    }
}
