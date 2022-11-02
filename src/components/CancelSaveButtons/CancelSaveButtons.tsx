import { Component } from '../../../Reacts';
import Button from '../UI-kit/buttons/Button';
import ButtonPrimary from '../UI-kit/buttons/ButtonPrimary';

export default class CancelSaveButtons extends Component<{
    onCancel: Function;
    onSave: Function;
}> {
    render() {
        return (
            <div className={'flex row g-12'}>
                <Button onClick={this.props.onCancel}>Пропустить</Button>
                <ButtonPrimary type={'submit'} onClick={this.props.onSave}>
                    Сохранить
                </ButtonPrimary>
            </div>
        );
    }
}
