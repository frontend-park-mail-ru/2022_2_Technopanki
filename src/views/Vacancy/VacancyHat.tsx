import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Button from '../../components/UI-kit/buttons/Button';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';
import Dropdown from '../../components/UI-kit/dropdown/Dropdown';
import VacancyDropdownResume from './VacancyDropdownResume';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';
import { vacancyService } from '../../services/vacancy/vacancyService';
import { profileConnect, userConnect } from '../../store';
import RenderWithCondition from '../../components/RenderWithCondition';
import ButtonNotActive from '../../components/UI-kit/buttons/ButtonNotActive';
import { UserState } from '../../store/user/types';
import Vacancy from './index';
import { EMPLOYER_PATHS, VACANCY_PATHS } from '../../utils/routerConstants';
import { IMAGE_URL } from '../../utils/networkConstants';

export type ProfileHatProps = {
    creatorImgSrc: string;
    companyName: string;
    status: string;
};

class VacancyHat extends ReactsComponent<
    ProfileHatProps & {
        // props
        postedByUserID: string;
        vacancyID: string;
        // user store
        userID: string;
        userType: string | null;
        authorized: boolean;
    }
> {
    render() {
        return (
            <Hat
                imgSrc={this.props.creatorImgSrc}
                name={this.props.companyName}
                surname={''}
                status={this.props.status}
                linkTo={EMPLOYER_PATHS.PROFILE + this.props.postedByUserID}
                rightSideContent={
                    <div className={'flex row flex-wrap g-12'}>
                        <RenderWithCondition
                            condition={
                                this.props.userID === this.props.postedByUserID
                            }
                            onSuccess={
                                <Link
                                    to={
                                        VACANCY_PATHS.RESUME_LIST +
                                        this.props.vacancyID
                                    }
                                    content={
                                        <Button>
                                            Посмотреть отклики на вакансию
                                        </Button>
                                    }
                                />
                            }
                        />
                        <RenderWithCondition
                            condition={
                                this.props.userID === this.props.postedByUserID
                            }
                            onSuccess={
                                <Link
                                    to={
                                        VACANCY_PATHS.SETTINGS +
                                        this.props.vacancyID
                                    }
                                    content={<Button>Настройки</Button>}
                                />
                            }
                        />
                        <RenderWithCondition
                            condition={this.props.userType === 'applicant'}
                            onSuccess={
                                <Dropdown
                                    hidden={
                                        <VacancyDropdownResume
                                            vacancyID={this.props.vacancyID}
                                        />
                                    }
                                    content={
                                        <ButtonPrimary>
                                            Отправить резюме
                                        </ButtonPrimary>
                                    }
                                    direction={'right'}
                                />
                            }
                        />
                        <RenderWithCondition
                            condition={!this.props.authorized}
                            onSuccess={
                                <ButtonNotActive>
                                    Зарегестрируйтесь или войдите чтобы
                                    отправить резюме
                                </ButtonNotActive>
                            }
                        />
                    </div>
                }
            />
        );
    }
}

export default userConnect((state, props) => {
    return {
        vacancyID: props.vacancyID,
        postedByUserID: props.postedByUserID,
        sendRequest: props.sendRequest,
        companyName: props.companyName,
        userID: state.id,
        userType: state.userType,
        authorized: state.authorized,
    };
})(VacancyHat);
