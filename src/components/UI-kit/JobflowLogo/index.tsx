import { Component } from '../../../../__Reacts__old_version__';
import Logo from '../../../static/assets/Jobflow.svg';
import styles from './jobflowLogo.module.scss';

export default class JobflowLogo extends Component {
    render() {
        return (
            <div
                key={'logo'}
                className={`flex w-100 align-items-center justify-content-center ${styles.logo}`}
                dangerouslySetInnerHTML={{ __html: Logo }}
            ></div>
        );
    }
}
