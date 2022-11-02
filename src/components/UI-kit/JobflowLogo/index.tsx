import { Component } from '../../../../Reacts';
import Logo from '../../../static/assets/Jobflow.svg';
import styles from './jobflowLogo.module.scss';

export default class JobflowLogo extends Component {
    render() {
        return (
            <div
                key={'logo'}
                className={`flex w-100 align-items-center ${styles.logo}`}
                dangerouslySetInnerHTML={{ __html: Logo }}
            ></div>
        );
    }
}
