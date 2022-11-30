import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Button from '../../components/UI-kit/buttons/Button';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';
import { resumeService } from '../../services/resume/resumeService';
import { APPLICANT_PATHS, RESUME_PATHS } from '../../utils/routerConstants';
import { IMAGE_URL } from '../../utils/networkConstants';
import { profileConnect, userConnect } from '../../store';
import RenderWithCondition from '../../components/RenderWithCondition';
import { ApplicantProfileType } from '../../store/profile/types';

class ApplicantHat extends ReactsComponent<
    ApplicantProfileType & { userID: string; resumeID: string }
> {
    render() {
        return (
            <Hat
                imgSrc={this.props.avatarSrc}
                name={this.props.name}
                surname={this.props.surname}
                status={this.props.status}
                linkTo={APPLICANT_PATHS.PROFILE + this.props.id}
                rightSideContent={
                    <div className={'flex row flex-wrap g-12'}>
                        <RenderWithCondition
                            condition={this.props.id === this.props.userID}
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
