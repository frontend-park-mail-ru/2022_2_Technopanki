import { MapStateToProps } from './index';
import { StoreType } from '../../Fluxs/types/store';
import { ReactsComponent } from '../reacts/src/Component';

/**
 * Function for creating connect helper function.
 * @param store
 */
export default function createConnect(store: StoreType) {
    return function (mapStateToProps: MapStateToProps) {
        return function (WrappedComponent: Function) {
            return class Wrapper extends ReactsComponent<any> {
                unsubscribe: Function = () => {};

                render() {
                    return (
                        <WrappedComponent
                            {...this.props}
                            {...mapStateToProps(store.getState(), this.props)}
                        ></WrappedComponent>
                    );
                }

                componentDidMount() {
                    this.unsubscribe = store.subscribe(
                        this.handleChange.bind(this),
                    );
                    console.log('mount');
                }

                componentWillUnmount() {
                    this.unsubscribe();
                }

                handleChange() {
                    this.forceUpdate();
                }
            };
        };
    };
}
