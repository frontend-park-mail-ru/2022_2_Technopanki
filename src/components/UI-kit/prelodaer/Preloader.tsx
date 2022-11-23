import styles from './prelodaer.module.scss';
import { loadingConnect } from '../../../store';
import { ReactsComponent } from '../../../../Reacts/reacts/src/Component';

class Preloader extends ReactsComponent<{ isLoading: boolean }> {
    render() {
        return (
            <div
                className={`fixed t-0 l-0 w-100 ${
                    this.props.isLoading ? 'block' : 'none'
                } ${styles.preloader}`}
            ></div>
        );
    }
}

export default loadingConnect(state => ({
    isLoading: state.loading,
}))(Preloader);
