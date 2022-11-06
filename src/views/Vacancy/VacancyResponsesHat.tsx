import { Component } from '../../../Reacts';
import Hat from '../../components/UI-kit/hat/Hat';
import Button from '../../components/UI-kit/buttons/Button';
import Link from '../../components/Link/Link';
import { ProfileState } from '../../store/profile/types';
import { profileConnect } from '../../store';
import { vacancyService } from '../../services/vacancyService';

class VacancyResponsesHat extends Component<{
    name: string;
    status: string;
    // ---
    imgSrc: string;
    postedByUserID: string;
    vacancyID: string;
}> {
    getCreatorDataFromServer = () => {
        if (this.props.postedByUserID) {
            vacancyService
                .getVacancyHatData(this.props.postedByUserID)
                .then(body => {
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
                imgSrc={this.props.imgSrc}
                name={this.props.name}
                surname={''}
                status={this.props.status}
                rightSideContent={
                    <div className={'flex row g-16'}>
                        <Link
                            to={`/vacancy/${this.props.vacancyID}`}
                            content={<Button>Вернуться к вакансии</Button>}
                        />
                        <Link
                            to={`/vacancy/settings/${this.props.vacancyID}`}
                            content={<Button>Настройки</Button>}
                        />
                    </div>
                }
            />
        );
    }
}

export default profileConnect((store, props) => {
    const state: ProfileState = store.getState();

    return {
        vacancyID: props.vacancyID,
        postedByUserID: props.postedByUserID,
        name: state.name,
        status: state.status,
        imgSrc: state.avatarSrc,
    };
})(VacancyResponsesHat);
