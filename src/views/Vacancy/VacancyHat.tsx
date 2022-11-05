import { Component } from '../../../Reacts';
import Button from '../../components/UI-kit/buttons/Button';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';
import Dropdown from '../../components/UI-kit/dropdown/Dropdown';
import VacancyDropdownResume from './VacancyDropdownResume';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';
import { vacancyService } from '../../services/vacancyService';
import { profileConnect, userConnect } from '../../store';
import RenderWithCondition from '../../components/RenderWithCondition';
import ButtonNotActive from '../../components/UI-kit/buttons/ButtonNotActive';
import { UserState } from '../../store/user/types';
import Vacancy from './index';

class VacancyHat extends Component<
    {
        postedByUserID: string;
        userID: string;
        userType: string;
        authorized: boolean;
    },
    {
        creatorImgSrc: string;
        companyName: string;
        status: string;
    }
> {
    state = {
        creatorImgSrc: '',
        companyName: '',
        status: '',
    };

    getCreatorDataFromServer = () => {
        if (this.props.postedByUserID) {
            console.log('postedByUserID: ', this.props.postedByUserID);
            vacancyService
                .getVacancyHatData(this.props.postedByUserID)
                .then(body => {
                    console.log('VACANCY HAT');
                    console.log(body);
                    this.setState(() => ({
                        creatorImgSrc: body.creator_img_src,
                        companyName: body.company_name,
                        status: body.status,
                    }));
                })
                .catch(err => console.error(err));
        }
    };

    componentDidMount() {
        this.getCreatorDataFromServer();
    }

    render() {
        return (
            <Hat
                imgSrc={this.state.creatorImgSrc}
                name={this.state.companyName}
                surname={''}
                status={this.state.status}
                rightSideContent={
                    <div className={'flex row flex-wrap g-12'}>
                        <RenderWithCondition
                            condition={
                                this.props.userID === this.props.postedByUserID
                            }
                            onSuccess={
                                <Link
                                    to={'/vacancy/responses'}
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
                                    to={'/vacancy/settings'}
                                    content={<Button>Настройки</Button>}
                                />
                            }
                        />
                        <RenderWithCondition
                            condition={this.props.userType === 'applicant'}
                            onSuccess={
                                <Dropdown
                                    hidden={
                                        <VacancyDropdownResume resume={[]} />
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

// const ProfileWrapper = profileConnect((store, props) => {
//     const state = store.getState()
//
//     return {
//         postedByUserID: state.postedByUserID,
//         authorized: props.authorized,
//         userID: props.id,
//         userType: props.userType,
//     }
// })(VacancyHat)

export default userConnect((store, props) => {
    const state: UserState = store.getState();
    console.log('user connect vacancy: ', state);

    return {
        postedByUserID: props.postedByUserID,
        userID: state.id,
        userType: state.userType,
        authorized: state.authorized,
    };
})(VacancyHat);
