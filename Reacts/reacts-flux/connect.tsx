import { MapStateToProps } from './index';
import { StoreType } from '../../Fluxs/types/store';
import { ReactsComponent } from '../reacts/src/Component';

// TODO: из-за того что мы создаем инстанс дочерних элементов каждый раз когда обновляем компонент
//  возникают проблемы при вложенности connect-ов. 2-й и следующие коннекты потеряют unsubscribe функции.
//  Из-за этого сторы хранят лишние функции для обработки, что конечно приводит к проблемам
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
                    this.unsubscribe = store
                        .subscribe(this.handleChange.bind(this))
                        .bind(this);
                }

                componentDidUpdate() {
                    this.unsubscribe();
                    this.unsubscribe = store
                        .subscribe(this.handleChange.bind(this))
                        .bind(this);
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
