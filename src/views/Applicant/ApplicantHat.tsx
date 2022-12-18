import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import Button from '../../components/UI-kit/buttons/Button';
import Hat from '../../components/UI-kit/hat/Hat';
import Link from '../../components/Link/Link';
import { APPLICANT_PATHS, RESUME_PATHS } from '../../utils/routerConstants';
import { applicantConnect, userConnect } from '../../store';

import RenderWithCondition from '../../components/RenderWithCondition';
import { ApplicantProfileType } from '../../store/profile/types';
import ResumeIcon from '../../static/icons/resume.svg';
import ButtonIcon from '../../components/UI-kit/buttons/ButtonIcon';

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
                        <Link
                            to={'/'}
                            content={
                                <ButtonIcon icon={ResumeIcon}>
                                    Скачать резюме в PDF
                                </ButtonIcon>
                            }
                        />
                    </div>
                }
            />
        );
    }
}

const profileWrapper = applicantConnect((state, props) => ({
    ...state,
    ...props,
}))(ApplicantHat);

export default userConnect((state, props) => ({
    ...props,
    userID: state.id,
}))(profileWrapper);
