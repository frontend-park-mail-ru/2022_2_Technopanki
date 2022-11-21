import Logo from '../../../static/assets/Jobflow.svg';
import styles from './jobflowLogo.module.scss';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';

export default class JobflowLogo extends ReactsComponent {
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
