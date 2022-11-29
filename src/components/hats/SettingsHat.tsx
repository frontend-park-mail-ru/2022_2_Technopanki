import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Hat from '../UI-kit/hat/Hat';
import CancelSaveButtons from '../CancelSaveButtons/CancelSaveButtons';
import navigator from '../../router/navigator';
import { userConnect } from '../../store';
import { UserState } from '../../store/user/types';
import { resumeService } from '../../services/resume/resumeService';
import { IMAGE_URL } from '../../utils/networkConstants';
import { APPLICANT_PATHS, EMPLOYER_PATHS } from '../../utils/routerConstants';
import { USER_TYPE } from '../../services/auth/authService';
import { vacancyService } from '../../services/vacancy/vacancyService';

class SettingsHat extends ReactsComponent<
    {
        // Flux
        name: string;
        surname?: string;
        userType: string;
        // Props
        status: string;
        imgSrc: string;
        creatorID: string;
        userID: string;
    },
    {
        // Flux
        name: string;
        surname: string;
        // Props
        status: string;
        imgSrc: string;
    }
> {
    state = {
        imgSrc: this.props.imgSrc,
        name: this.props.name,
        surname: this.props.surname,
        status: this.props.status,
    };

    getCreatorDataFromServer = () => {
        switch (this.props.userType) {
            case USER_TYPE.APPLICANT:
                return resumeService
                    .getResumeHatData(this.props.creatorID)
                    .then(body => {
                        this.setState(() => ({
                            imgSrc: IMAGE_URL + body.image,
                            name: body.applicant_name,
                            surname: body.applicant_surname,
                            status: body.status,
                        }));
                    });
            case USER_TYPE.EMPLOYER:
                return vacancyService
                    .getVacancyHatData(this.props.creatorID)
                    .then(body => {
                        this.setState(() => ({
                            imgSrc: IMAGE_URL + body.image,
                            name: body.company_name,
                            status: body.status,
                        }));
                    });
        }
    };

    shouldUpdate(
        nextProps:
            | Readonly<{
                  name: string;
                  surname?: string;
                  status: string;
                  imgSrc: string;
                  creatorID: string;
                  userID: string;
              }>
            | {
                  name: string;
                  surname?: string;
                  status: string;
                  imgSrc: string;
                  creatorID: string;
                  userID: string;
              },
    ): boolean {
        return this.props.userID !== nextProps.userID;
    }

    componentDidMount() {
        this.getCreatorDataFromServer();
    }

    render() {
        return (
            <Hat
                imgSrc={this.state.imgSrc}
                name={this.state.name}
                surname={this.props.surname ?? ''}
                status={this.state.status}
                linkTo={
                    (this.props.userType === USER_TYPE.APPLICANT
                        ? APPLICANT_PATHS.PROFILE
                        : EMPLOYER_PATHS.PROFILE) + this.props.userID
                }
            />
        );
    }
}

export default userConnect((state, props) => {
    return {
        userID: state.id,
        name: state.name,
        userType: state.userType,
        surname: state.surname,
        status: props.status,
        postedByUserID: props.postedByUserID,
        imgSrc: props.imgSrc,
        submit: props.submit,
        linkTo: props.linkTo,
    };
})(SettingsHat);
