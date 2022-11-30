import { ReactsComponent } from '../../../Reacts/reacts/src/Component';
import styles from './profileHeader.module.scss';
import { ReactsComponentNode } from '../../../Reacts/shared/types/node';

export default class ProfileHeader extends ReactsComponent<{
    profileID: string;
    bannerSrc: string;
    avatarSrc: string;
    name: string;
    surname?: string;
    status: string;
    buttons: ReactsComponentNode;
}> {
    componentDidMount() {
        this.forceUpdate();
    }

    render() {
        return (
            <div className={`flex column ${styles.profile}`}>
                <div className={styles.profile_banner}></div>
                <div className={styles.profile_content}>
                    <div className={styles.info}>
                        <img
                            className={styles.info__avatar}
                            src={this.props.avatarSrc}
                            alt={'avatar'}
                        />
                        <div className={`flex column g-4`}>
                            <h3>
                                {this.props.name +
                                    ' ' +
                                    (this.props.surname ?? '')}
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
