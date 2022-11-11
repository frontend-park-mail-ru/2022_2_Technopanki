import { Component } from '../../../Reacts';
import styles from './profileHeader.module.scss';
import { VNodeType } from '../../../Reacts/shared/common';

export default class ProfileHeader extends Component<{
    profileID: string;
    bannerSrc: string;
    avatarSrc: string;
    name: string;
    surname?: string;
    status: string;
    buttons: VNodeType;
}> {
    render() {
        return (
            <div className={`flex column ${styles.profile}`}>
                <div key={'banner'} className={styles.profile_banner}></div>
                <div key={'content'} className={styles.profile_content}>
                    <div key={'info'} className={styles.info}>
                        <img
                            className={styles.info__avatar}
                            src={this.props.avatarSrc}
                            alt={'avatar'}
                        />
                        <div className={`flex column g-4`}>
                            <h3 key={'header'}>
                                {this.props.name} {this.props.surname}
                            </h3>
                            <p key={'status'}>{this.props.status}</p>
                        </div>
                    </div>
                    <div key={'buttons'}>{this.props.buttons}</div>
                </div>
            </div>
        );
    }
}
