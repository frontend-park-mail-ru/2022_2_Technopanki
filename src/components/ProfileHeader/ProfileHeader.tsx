import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './profileHeader.module.scss';
import { ReactsComponentNode } from '../../../Reacts/shared/types/node';

export default class ProfileHeader extends ReactsComponent<{
    profileID: string;
    bannerSrc: string;
    avatarSrc: string;
    averageColor: string;
    name: string;
    surname?: string;
    status: string;
    buttons: ReactsComponentNode;
}> {
    render() {
        return (
            <div className={`flex column ${styles.profile}`}>
                <div
                    className={styles.profile_banner}
                    style={`background-image: linear-gradient(60deg, rgba(${this.props.averageColor}, 0.4), rgba(${this.props.averageColor}, 0.9))`}
                ></div>
                <div className={styles.profile_content}>
                    <div className={styles.info}>
                        <img
                            className={styles.info__avatar}
                            src={
                                this.props.avatarSrc +
                                `?${Math.random().toString(36).substring(7)}`
                            }
                            alt={'avatar'}
                        />
                        <div className={`flex column g-4`}>
                            <h3>
                                {this.props.name +
                                    (this.props.surname
                                        ? ' ' + this.props.surname
                                        : '')}
                            </h3>
                            <p>{this.props.status}</p>
                        </div>
                    </div>
                    <div>{this.props.buttons}</div>
                </div>
            </div>
        );
    }
}
