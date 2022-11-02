import { Component } from '../../../../Reacts';
import styles from './hat.module.scss';
import { VNodeType } from '../../../../Reacts/shared/common';

type HatPropsType = {
    imgSrc: string;
    name: string;
    surname: string;
    description: string;
    rightSideContent: VNodeType;
};

export default class Hat extends Component<HatPropsType> {
    render() {
        return (
            <div
                className={`flex w-100 row align-items-center justify-content-space-between ${styles.hat_content}`}
            >
                <div className={`flex align-items-center row g-16`}>
                    <img
                        className={styles.content_img}
                        src={this.props.imgSrc}
                        alt={'logo'}
                    />
                    <div className={'flex column'}>
                        <div className={'flex row g-4'}>
                            <p className={styles.content_name}>
                                {this.props.name}
                            </p>
                            <p className={styles.content_name}>
                                {this.props.surname}
                            </p>
                        </div>
                        <p>{this.props.description}</p>
                    </div>
                </div>
                {this.props.rightSideContent}
            </div>
        );
    }
}
