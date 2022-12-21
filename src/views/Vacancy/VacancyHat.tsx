import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Button from '../../components/UI-kit/buttons/Button';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';
import Dropdown from '../../components/UI-kit/dropdown/Dropdown';
import VacancyDropdownResume from './VacancyDropdownResume';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';
import { vacancyService } from '../../services/vacancy/vacancyService';
import { dispatch, profileConnect, userConnect, vacancyConnect } from '../../store';
import RenderWithCondition from '../../components/RenderWithCondition';
import ButtonNotActive from '../../components/UI-kit/buttons/ButtonNotActive';
import { UserState } from '../../store/user/types';
import Vacancy from './index';
import {
    EMPLOYER_PATHS,
    SIGN_UP_PATH,
    VACANCY_PATHS,
} from '../../utils/routerConstants';
import { IMAGE_URL } from '../../utils/networkConstants';
import StarButton from '../../components/UI-kit/buttons/StarButton';
import { vacancyActions } from '../../store/vacancy/actions';

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
        isFavorite: boolean;
        // user store
        userID: string;
        userType: string | null;
        authorized: boolean;
    }
> {
    //TODO вынести во flux
    state = {
        isFavorite: false,
    }

    toggleFavorites = async () => {
        console.log(3, this.state.isFavorite);

        if (this.props.isFavorite) {
            await vacancyService.removeFromFavorites(
                this.props.vacancyID,
            )
                .catch(err => console.error(err));
        } else {
            await vacancyService.addFavoriteVacancy(
                this.props.vacancyID
            )
                .catch(err => console.error(err));
        }

        dispatch(vacancyActions.setFavorite(!this.props.isFavorite))

        console.log(this.state.isFavorite);
    }

    async checkIfFavorite() {
        const vacancyID = location.pathname.split('/').at(-1);

        const check = await vacancyService.checkIfFavorite(
            vacancyID as string
        );

        console.log('FROM SERVER', vacancyID, check)

        return check
    }

    componentDidMount() {
        this.checkIfFavorite()
            .then(check => {
                dispatch(vacancyActions.setFavorite(check))
        });
    }

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
                                    content={<Button>Редактировать</Button>}
                                />
                            }
                        />
                        <RenderWithCondition
                            condition={this.props.userType === 'applicant'}
                            onSuccess={
                                <div className={'flex row g-24'}>
                                    <Button
                                        onClick={this.toggleFavorites}
                                    >
                                        {this.props.isFavorite ?
                                            'Удалить из избранного'
                                            :
                                            'Добавить в избранное'
                                        }
                                    </Button>
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
                                </div>
                            }
                        />
                        <RenderWithCondition
                            condition={!this.props.authorized}
                            onSuccess={
                                <Link
                                    to={SIGN_UP_PATH}
                                    content={
                                        <ButtonNotActive>
                                            Зарегестрируйтесь или войдите чтобы
                                            отправить резюме
                                        </ButtonNotActive>
                                    }
                                />
                            }
                        />
                    </div>
                }
            />
        );
    }
}

const VacancyWrapper = vacancyConnect((state, props) => {
    return {
        isFavorite: state.isFavorite
    }
})(VacancyHat)

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
})(VacancyWrapper);
