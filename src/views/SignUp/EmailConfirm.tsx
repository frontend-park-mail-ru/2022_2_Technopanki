import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Form from '../../components/UI-kit/forms/Form';
import FormInput from '../../components/UI-kit/forms/formInputs/FormInput';
import Button from '../../components/UI-kit/buttons/Button';
import { dispatch, errorsConnect, userConnect } from '../../store';
import { authService, USER_TYPE } from '../../services/auth/authService';
import navigator from '../../router/navigator';
import { APPLICANT_PATHS, EMPLOYER_PATHS } from '../../utils/routerConstants';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { activateError, deactivateError } from '../../store/errors/actions';
import JobflowLogo from '../../components/UI-kit/JobflowLogo';
import styles from './signup.module.scss';
import { userActions } from '../../store/user/actions';

class EmailConfirm extends ReactsComponent<{
    email: string;
}> {
    async onSubmit(e: SubmitEvent) {
        e.preventDefault();
        // @ts-ignore
        const token = new FormData(e.target).get('token') as string;
        try {
            const typeOfOperation = location.pathname.split('/').at(-1);

            const response = await authService.authConfirm(
                token,
                this.props.email,
            );

            switch (typeOfOperation) {
                case 'signin':
                    dispatch(
                        userActions.SIGN_IN(
                            response.id.toString(),
                            response.applicant_name ?? response.company_name,
                            response.applicant_surname,
                            response.email,
                            response.image,
                            response.two_factor_sign_in,
                            response.user_type,
                        ),
                    );
                    break;
                case 'signup':
                    dispatch(
                        userActions.SIGN_UP(
                            response.id.toString(),
                            response.applicant_name ?? response.company_name,
                            response.applicant_surname,
                            response.email,
                            response.image,
                            response.user_type,
                        ),
                    );
                    break;
            }

            navigator.navigate(
                (response.user_type === USER_TYPE.APPLICANT
                    ? APPLICANT_PATHS.PROFILE
                    : EMPLOYER_PATHS.PROFILE) + response.id.toString(),
            );
        } catch (e) {
            dispatch(activateError('Ошибка', 'Пожалуйста, проверьте токен'));
            setTimeout(() => dispatch(deactivateError()), 3000);
        }
    }

    render() {
        return (
            <div
                className={
                    'l-0 h-100vh text-align-center flex align-items-center justify-content-center column g-24'
                }
            >
                <div className={`flex column g-24 ${styles.confirm}`}>
                    <ErrorPopup />
                    <JobflowLogo />
                    <h3>Подтвердите email</h3>
                    <Form onSubmit={this.onSubmit.bind(this)}>
                        <FormInput
                            id={'token'}
                            name={'token'}
                            type={'text'}
                            placeholder={'Введите код в это поле'}
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
    email: state.email,
}))(EmailConfirm);
