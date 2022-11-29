import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Button from '../../components/UI-kit/buttons/Button';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';
import { resumeService } from '../../services/resumeService';
import { APPLICANT_PATHS, RESUME_PATHS } from '../../utils/routerConstants';
import { IMAGE_URL } from '../../utils/networkConstants';
import { dispatch, profileConnect, userConnect } from '../../store';
import RenderWithCondition from '../../components/RenderWithCondition';
import { profileActions } from '../../store/profile/actions';

class ApplicantHat extends ReactsComponent<
    {
        userID: string;
        creatorID: string;
        resumeID: string;
        creatorImgSrc: string;
        name: string;
        surname: string;
        status: string;
        id: string;
    },
    {
        creatorImgSrc: string;
        name: string;
        surname: string;
        status: string;
        id: string;
    }
> {
    state = {
        creatorImgSrc: '',
        name: '',
        surname: '',
        status: '',
        id: '',
    };

    getCreatorDataFromServer = () => {
        if (this.props.creatorID) {
            resumeService.getResumeHatData(this.props.creatorID).then(body => {
                dispatch(profileActions.update(body));
            });
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
                surname={this.state.surname}
                status={this.state.status}
                linkTo={APPLICANT_PATHS.PROFILE + this.state.id}
                rightSideContent={
                    <div className={'flex row flex-wrap g-12'}>
                        <RenderWithCondition
                            condition={
                                this.props.userID === this.props.creatorID
                            }
                            onSuccess={
                                <Link
                                    to={
                                        RESUME_PATHS.SETTINGS +
                                        this.props.resumeID
                                    }
                                    content={<Button>Настройки</Button>}
                                />
                            }
                        />
                    </div>
                }
            />
        );
    }
}

const profileWrapper = profileConnect((state, props) => ({
    ...state,
    ...props,
}))(ApplicantHat);

export default userConnect((state, props) => ({
    ...props,
    userID: state.id,
}))(profileWrapper);
