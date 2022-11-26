import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Form from '../../components/UI-kit/forms/Form';
import FormInput from '../../components/UI-kit/forms/formInputs/FormInput';
import Button from '../../components/UI-kit/buttons/Button';
import { dispatch, errorsConnect, userConnect } from '../../store';
import { authService } from '../../services/authService';
import navigator from '../../router/navigator';
import { APPLICANT_PATHS, EMPLOYER_PATHS } from '../../utils/routerConstants';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { activateError, deactivateError } from '../../store/errors/actions';
import styles from './signup.module.scss';

class EmailConfirm extends ReactsComponent<{
    id: string;
    userType: string;
    email: string;
}> {
    async onSubmit(e: SubmitEvent) {
        e.preventDefault();
        // @ts-ignore
        const token = new FormData(e.target).get('token');
        try {
            await authService.authConfirm(token, this.props.email);
            this.props.userType === 'applicant'
                ? navigator.navigate(APPLICANT_PATHS.PROFILE + this.props.id)
                : navigator.navigate(EMPLOYER_PATHS.PROFILE + this.props.id);
        } catch (e) {
            dispatch(activateError('Ошибка', 'Пожалуйста, проверьте токен'));
            setTimeout(() => deactivateError(), 3000);
        }
    }

    render() {
        return (
            <div
                className={
                    'l-0 h-100vh text-align-center flex align-items-center justify-items-center column g-24'
                }
            >
                <div className={styles.confirm}>
                    <ErrorPopup />
                    <h3>Подтвердите email</h3>
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <FormInput
                            id={'token'}
                            name={'token'}
                            label={'Код'}
                            type={'text'}
                            size={'12'}
                        />
                        <Button type={'submit'}>Подтвердить</Button>
                    </Form>
                </div>
            </div>
        );
    }
}

export default userConnect(state => ({
    id: state.id,
    userType: state.userType,
    email: state.email,
}))(EmailConfirm);
