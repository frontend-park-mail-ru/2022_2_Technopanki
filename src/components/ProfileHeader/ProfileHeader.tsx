import { Component } from '../../../Reacts';
import styles from './profileHeader.module.scss';
import { VNodeType } from '../../../Reacts/shared/common';

export default class ProfileHeader extends Component<{
    bannerSrc: string;
    avatarSrc: string;
    name: string;
    status: string;
    buttons: VNodeType;
}> {
    render() {
        return (
            <div className={`flex column ${styles.profile}`}>
                <div className={styles.profile_banner}>
                    <img src={this.props.bannerSrc} alt={'banner'} />
                </div>
                <div className={styles.profile_content}>
                    <div className={styles.info}>
                        <img
                            className={styles.info__avatar}
                            src={this.props.avatarSrc}
                            alt={'avatar'}
                        />
                        <div className={`flex column g-4`}>
                            <h3>{this.props.name}</h3>
                            <p>{this.props.status}</p>
                        </div>
                    </div>
                    {this.props.buttons}
                </div>
            </div>
        );
    }
}
