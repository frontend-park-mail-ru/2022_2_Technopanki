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
    state = {
        creatorImgSrc: '',
        imgSrc: './',
        companyName: '',
        status: '',
    };

    getCreatorDataFromServer = () => {
        // if (this.props.postedByUserID) {
        //     vacancyService
        //         .getVacancyHatData(this.props.postedByUserID)
        //         .then(body => {
        //             this.setState(() => ({
        //                 creatorImgSrc: body.creator_img_src,
        //                 companyName: body.company_name,
        //                 status: body.status,
        //             }));
        //         })
        //         .catch(err => console.error(err));
        // }
    };

    componentDidMount() {
        this.getCreatorDataFromServer();
    }

    render() {
        return (
            <Hat
                imgSrc={this.state.imgSrc}
                name={this.state.companyName}
                surname={''}
                linkTo={`/employer/${this.props.postedByUserID}`}
                status={this.state.status}
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

export default profileConnect((state, props) => {
    return {
        vacancyID: props.vacancyID,
        postedByUserID: props.postedByUserID,
        name: state.name,
        status: state.status,
        imgSrc: state.avatarSrc,
    };
})(VacancyResponsesHat);
