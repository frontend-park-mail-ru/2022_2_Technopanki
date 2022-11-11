import { Component } from '../../../Reacts';
import Hat from '../../components/UI-kit/hat/Hat';
import Button from '../../components/UI-kit/buttons/Button';
import Link from '../../components/Link/Link';
import { profileConnect } from '../../store';
import { vacancyService } from '../../services/vacancyService';
import { EMPLOYER_PATHS, VACANCY_PATHS } from '../../utils/routerConstants';
import { IMAGE_URL } from '../../utils/networkConstants';

class VacancyResponsesHat extends Component<{
    name: string;
    status: string;
    // ---
    imgSrc: string;
    postedByUserID: string;
    vacancyID: string;
}> {
    state = {
        creatorImgSrc: this.props.imgSrc,
        imgSrc: this.props.imgSrc,
        name: this.props.name,
        status: this.props.status,
    };

    getCreatorDataFromServer = () => {
        if (this.props.postedByUserID) {
            vacancyService
                .getVacancyHatData(this.props.postedByUserID)
                .then(body => {
                    this.setState(() => ({
                        creatorImgSrc: IMAGE_URL + body.image,
                        name: body.company_name,
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
                name={this.state.name}
                surname={''}
                linkTo={EMPLOYER_PATHS.PROFILE + this.props.postedByUserID}
                status={this.state.status}
                rightSideContent={
                    <div className={'flex row g-16'}>
                        <Link
                            to={VACANCY_PATHS.INDEX + this.props.vacancyID}
                            content={<Button>Вернуться к вакансии</Button>}
                        />
                        <Link
                            to={VACANCY_PATHS.SETTINGS + this.props.vacancyID}
                            content={<Button>Настройки</Button>}
                        />
                    </div>
                }
            />
        );
    }
}

export default profileConnect((state, props) => {
    return {
        vacancyID: props.vacancyID,
        postedByUserID: props.postedByUserID,
        name: state.name,
        status: state.status,
        imgSrc: state.avatarSrc,
    };
})(VacancyResponsesHat);
