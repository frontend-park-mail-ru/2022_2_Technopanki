import { Component } from '../reacts/index';
import { MapStateToProps } from './index';
import { StoreType } from '../../Fluxs/types/store';

/**
 * Function for creating connect helper function.
 * @param store
 */
export default function createConnect(store: StoreType) {
    return function (mapStateToProps: MapStateToProps) {
        return function (WrappedComponent: Function) {
            return class Wrapper extends Component<any> {
                unsubscribe: Function = () => {};

                render() {
                    return (
                        <WrappedComponent
                            {...mapStateToProps(store, this.props)}
                        ></WrappedComponent>
                    );
                }

                componentDidMount() {
                    this.handleChange();
                    this.unsubscribe = store.subscribe(
                        this.handleChange.bind(this),
                    );
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
