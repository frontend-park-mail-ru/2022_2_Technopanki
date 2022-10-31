import { Component } from '../../../../Reacts';
import { VNodeType } from '../../../../Reacts/shared/common';
import styles from './sideBar.module.scss';

export default class SideBar extends Component<{
    content: {
        header: string;
        inside: VNodeType;
    }[];
}> {
    render() {
        return (
            <div className={'flex column g-24 w-100 align-items-center'}>
                {this.props.content.map(value => (
                    <div className={'flex column g-16'}>
                        <h6 className={styles.sidebar_header}>
                            {value.header}
                        </h6>
                        {value.inside}
                    </div>
                ))}
            </div>
        );
    }
}
