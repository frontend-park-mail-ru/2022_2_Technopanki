import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './signup.module.scss';
import Link from '../../components/Link/Link';
import ButtonPrimaryBigBlue from '../../components/UI-kit/buttons/ButtonPrimaryBigBlue';
import RadioButton from '../../components/UI-kit/radioButton/radioButton';
import Description from '../../components/auth/Description';
import navigator from '../../router/navigator';
import { dispatch } from '../../store';
import { userActions } from '../../store/user/actions';
import { authService, USER_TYPE } from '../../services/auth/authService';
import { SIGN_IN_PATH, START_PATH } from '../../utils/routerConstants';
import Form from '../../components/UI-kit/forms/Form';
import FormInput from '../../components/UI-kit/forms/formInputs/FormInput';
import FormItem from '../../components/UI-kit/forms/FormItem';
import { useValidation } from '../../utils/validation/formValidation';
import {
    applicantNameLengthValidator,
    applicantNameSymbolsValidator,
    applicantSurnameLengthValidator,
    applicantSurnameSymbolsValidator,
    emailValidator,
    employerNameLengthValidator,
    employerNameSymbolsValidator,
    passwordLengthValidator,
    passwordSymbolsValidator,
    repeatPasswordValidator,
} from '../../utils/validation/commonValidators';
import { USER_URLS } from '../../utils/networkConstants';
import ErrorPopup from '../../components/ErrorPopup/ErrorPopup';
import { activateError, deactivateError } from '../../store/errors/actions';
import { AuthError } from '../../services/auth/types';

export type ResponseBody = {
    descriptors: string[];
    error: string;
};

export default class SignUp extends ReactsComponent<
    {},
    {
        toggleType: string;
    }
> {
    state = {
        toggleType: USER_TYPE.APPLICANT,
        fieldsValues: {
            email: '',
            password: '',
            repeatPassword: '',
            applicantName: '',
            applicantSurname: '',
            companyName: '',
        },
    };
    password = '';

    validation = useValidation({
        email: [emailValidator],
        password: [passwordSymbolsValidator, passwordLengthValidator],
        repeatPassword: [
            passwordSymbolsValidator,
            passwordLengthValidator,
            repeatPasswordValidator.isPasswordsEqualValidators.bind(this),
        ],
        name: [applicantNameLengthValidator, applicantNameSymbolsValidator],
        surname: [
            applicantSurnameLengthValidator,
            applicantSurnameSymbolsValidator,
        ],
        companyName: [
            employerNameLengthValidator,
            employerNameSymbolsValidator,
        ],
    });

    onSubmit = async (e: SubmitEvent) => {
        e.preventDefault();
        if (!this.validation.ok()) {
            return;
        }

        const formData = new FormData(e.target as HTMLFormElement);

        try {
            await authService.signUp(formData);
            dispatch(userActions.updateEmail(formData.get('email') as string));
            navigator.navigate(USER_URLS.CONFIRM + '/signup');
        } catch (e) {
            console.error(e);
            dispatch(activateError((e as AuthError).error));
            setTimeout(() => dispatch(deactivateError()), 3000);
        }
    };

    switchUserType = (e: Event) => {
        this.setState(state => ({
            toggleType:
                state.toggleType === USER_TYPE.APPLICANT
                    ? USER_TYPE.EMPLOYER
                    : USER_TYPE.APPLICANT,
        }));
    };

    shouldUpdateState(nextState: { toggleType: string }): boolean {
        return this.state.toggleType !== nextState.toggleType;
    }

    render() {
        return (
            <div className={'grid h-100vh columns'}>
                <ErrorPopup />
                <div
                    className={`col-md-6 col-12 h-100vh p-24 flex align-items-center justify-content-center screen-responsive ${styles.form_block}`}
                >
                    <Form onSubmit={this.onSubmit}>
                        <FormItem header={'????????????????????????????????????'}>
                            <FormInput
                                key={'email'}
                                id={'email'}
                                label={'Email'}
                                type={'email'}
                                placeholder={'example@mail.ru'}
                                name={'email'}
                                setError={this.validation.setError}
                                size={'12'}
                                validationMode={'oninput'}
                                validation={this.validation.getValidation(
                                    'email',
                                )}
                            />
                            <FormInput
                                key={'password'}
                                id={'password'}
                                label={'????????????'}
                                type={'password'}
                                placeholder={'********'}
                                name={'password'}
                                setError={this.validation.setError}
                                size={'12'}
                                validationMode={'oninput'}
                                getValue={repeatPasswordValidator.setPassword.bind(
                                    this,
                                )}
                                validation={this.validation.getValidation(
                                    'password',
                                )}
                            />
                            <FormInput
                                key={'repeatPassword'}
                                id={'repeatPassword'}
                                label={'?????????????????? ????????????'}
                                type={'password'}
                                placeholder={'********'}
                                name={'repeatPassword'}
                                setError={this.validation.setError}
                                size={'12'}
                                validationMode={'oninput'}
                                validation={this.validation.getValidation(
                                    'repeatPassword',
                                )}
                            />
                            {this.state.toggleType === 'applicant' ? (
                                <div className={'col-12 column g-24'}>
                                    <FormInput
                                        key={'applicantName'}
                                        id={'applicantName'}
                                        label={'??????'}
                                        type={'text'}
                                        placeholder={'????????'}
                                        name={'applicant_name'}
                                        setError={this.validation.setError}
                                        size={'12'}
                                        validationMode={'oninput'}
                                        validation={this.validation.getValidation(
                                            'name',
                                        )}
                                    />
                                    <FormInput
                                        key={'applicantSurname'}
                                        id={'surname'}
                                        label={'??????????????'}
                                        type={'text'}
                                        placeholder={'????????????'}
                                        name={'applicant_surname'}
                                        setError={this.validation.setError}
                                        size={'12'}
                                        validationMode={'oninput'}
                                        validation={this.validation.getValidation(
                                            'surname',
                                        )}
                                    />
                                </div>
                            ) : (
                                <FormInput
                                    key={'companyName'}
                                    id={'companyName'}
                                    label={'???????????????? ????????????????'}
                                    type={'text'}
                                    name={'company_name'}
                                    setError={this.validation.setError}
                                    size={'12'}
                                    validationMode={'oninput'}
                                    validation={this.validation.getValidation(
                                        'companyName',
                                    )}
                                />
                            )}
                        </FormItem>
                        <div className={'flex column g-8'}>
                            <RadioButton
                                checked={
                                    this.state.toggleType ===
                                    USER_TYPE.APPLICANT
                                }
                                id={USER_TYPE.APPLICANT}
                                name={'toggle'}
                                value={USER_TYPE.APPLICANT}
                                onClick={() =>
                                    this.setState(state => ({
                                        ...state,
                                        toggleType: 'applicant',
                                    }))
                                }
                            >
                                ?? ????????????????????
                            </RadioButton>
                            <RadioButton
                                checked={
                                    this.state.toggleType === USER_TYPE.EMPLOYER
                                }
                                id={USER_TYPE.EMPLOYER}
                                name={'toggle'}
                                value={USER_TYPE.EMPLOYER}
                                onClick={() =>
                                    this.setState(state => ({
                                        ...state,
                                        toggleType: 'employer',
                                    }))
                                }
                            >
                                ?? ????????????????????????
                            </RadioButton>
                        </div>
                        <ButtonPrimaryBigBlue type={'submit'}>
                            ?????????????? ??????????????
                        </ButtonPrimaryBigBlue>
                        <Link
                            to={SIGN_IN_PATH}
                            content={
                                <p className={styles.form_link}>
                                    ?????? ???????? ??????????????? ??????????
                                </p>
                            }
                        />
                        <Link
                            to={START_PATH}
                            content={
                                <p
                                    className={
                                        'font-size-12 color-300 text-align-center'
                                    }
                                >
                                    ?????????????? ???? ?????????????? ????????????????
                                </p>
                            }
                        />
                    </Form>
                </div>
                <Description />
            </div>
        );
    }
}
