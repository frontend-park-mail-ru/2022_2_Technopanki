import { Component } from '../../../../__Reacts__old_version__';
import styles from './prelodaer.module.scss';
import { loadingConnect } from '../../../store';

class Preloader extends Component<{ isLoading: boolean }> {
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

export const helloWorld = () => {
    console.log('Hello World!');
};

export const newHelloWorld = () => {
    console.log('new Hello World!');
};
