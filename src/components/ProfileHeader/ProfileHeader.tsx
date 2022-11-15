import { Component } from '../../../__Reacts__old_version__';
import styles from './profileHeader.module.scss';
import { VNodeType } from '../../../__Reacts__old_version__/shared/common';

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
                    <div className={styles.info}>
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
                    <div>{this.props.buttons}</div>
                </div>
            </div>
        );
    }
}
