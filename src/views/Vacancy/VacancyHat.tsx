import { Component } from '../../../Reacts';
import Button from '../../components/UI-kit/buttons/Button';
import ButtonPrimary from '../../components/UI-kit/buttons/ButtonPrimary';
import Dropdown from '../../components/UI-kit/dropdown/Dropdown';
import VacancyDropdownResume from './VacancyDropdownResume';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';
import { vacancyService } from '../../services/vacancyService';

export default class VacancyHat extends Component<
    {
        creatorID: string;
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
        vacancyService.getVacancyHatData(this.props.creatorID).then(body => {
            this.setState(state => ({
                ...state,
                creatorImgSrc: body.creator_img_src,
                companyName: body.company_name,
                status: body.status,
            }));
        });
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
                        {/*TODO: добавить уловие по типу пользователя рендер кнопок*/}
                        <Link
                            to={'/vacancy/responses'}
                            content={
                                <Button>Посмотреть отклики на вакансию</Button>
                            }
                        />
                        <Link
                            to={'/vacancy/settings'}
                            content={<Button>Настройки</Button>}
                        />
                        <Dropdown
                            hidden={<VacancyDropdownResume resume={[]} />}
                            content={
                                <ButtonPrimary>Отправить резюме</ButtonPrimary>
                            }
                            direction={'right'}
                        />
                    </div>
                }
            />
        );
    }
}
