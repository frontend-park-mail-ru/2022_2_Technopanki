import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Button from '../UI-kit/buttons/Button';
import ButtonPrimary from '../UI-kit/buttons/ButtonPrimary';

export default class CancelSaveButtons extends ReactsComponent<{
    onCancel?: Function;
    onSave?: Function;
}> {
    render() {
        return (
            <div className={'flex row g-12'}>
                <Button onClick={this.props.onCancel}>Пропустить</Button>
                <ButtonPrimary onClick={this.props.onSave}>
                    Сохранить
                </ButtonPrimary>
            </div>
        );
    }
}
