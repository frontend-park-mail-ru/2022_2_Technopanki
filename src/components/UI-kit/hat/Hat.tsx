import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import styles from './hat.module.scss';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import Link from '../../Link/Link';

type HatPropsType = {
    imgSrc: string;
    name: string;
    surname: string;
    status: string;
    rightSideContent?: ReactsComponentNode;
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
                        <div className={`flex align-items-center row g-16`}>
                            <img
                                className={styles.content_img}
                                src={this.props.imgSrc}
                                alt={'logo'}
                            />
                            <div className={'flex column'}>
                                <p className={styles.content_name}>
                                    {`${this.props.name} ${this.props.surname}`}
                                </p>
                                <p>{this.props.status}</p>
                            </div>
                        </div>
                    }
                />
                <div>{this.props.rightSideContent}</div>
            </div>
        );
    }
}
