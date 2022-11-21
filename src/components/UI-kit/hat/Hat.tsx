import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './hat.module.scss';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import Link from '../../Link/Link';

type HatPropsType = {
    imgSrc: string;
    name: string;
    surname: string;
    status: string;
    rightSideContent: ReactsComponentNode;
    linkTo?: string;
};

export default class Hat extends ReactsComponent<HatPropsType> {
    render() {
        return (
            <div
                className={`flex w-100 row align-items-center justify-content-space-between ${styles.hat_content}`}
            >
                <Link
                    to={this.props.linkTo}
                    content={
                        <div
                            key={'content'}
                            className={`flex align-items-center row g-16`}
                        >
                            <img
                                key={'img'}
                                className={styles.content_img}
                                src={this.props.imgSrc}
                                alt={'logo'}
                            />
                            <div key={'content'} className={'flex column'}>
                                <p key={'name'} className={styles.content_name}>
                                    {this.props.name} {this.props.surname}
                                </p>
                                <p key={'status'}>{this.props.status}</p>
                            </div>
                        </div>
                    }
                />
                <div>{this.props.rightSideContent}</div>
            </div>
        );
    }
}
