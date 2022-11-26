import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import { ReactsComponentNode } from '../../../../Reacts/shared/types/node';
import styles from './sideBar.module.scss';

export default class SideBar extends ReactsComponent<{
    content: {
        header: string;
        inside: ReactsComponentNode;
    }[];
}> {
    render() {
        return (
            <div
                className={`flex w-100 column align-items-center ${styles.sidebar}`}
            >
                <div className={'flex column g-24'}>
                    {this.props.content.map(value => (
                        <div className={'flex column g-16'}>
                            <h6 className={styles.sidebar_header}>
                                {value.header}
                            </h6>
                            {value.inside}
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}
