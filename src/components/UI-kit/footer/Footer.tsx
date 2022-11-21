import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';
import JobflowLogo from '../JobflowLogo';

export default class Footer extends ReactsComponent {
    render() {
        return (
            <footer
                className={`flex w-100 mt-40 py-24 row align-items-center justify-content-center`}
            >
                <JobflowLogo />
            </footer>
        );
    }
}
