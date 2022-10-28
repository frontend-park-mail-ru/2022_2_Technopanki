import { Component } from '../reacts/index';
import { Action } from '../../Fluxs/types/action';
import { createStore } from '../../Fluxs/createStore';
//
// function connect(store: Store, target: Component<any, any>) {
//     return function (...args: any) {
//         // @ts-ignore we pass our custom component here
//         const instance = new target(...args);
//         instance.props.value = store.getState();
//         store.subscribe(() => {
//             instance.render();
//         });
//         return instance;
//     };
// }
//
// export default function createConnect(store: Store) {
//     return function (target: Component<any, any>) {
//         console.log('connect called');
//         return function (...args: any) {
//             // @ts-ignore we pass our custom component here
//             const instance = new target(...args);
//             instance.props.value = store.getState();
//             store.subscribe(() => {
//                 instance.render();
//             });
//             return instance;
//         };
//     };
// }
const reducer = (state: any, action: Action): any => {
    switch (action.type) {
        case 'HELLO':
            return { ...state, value: 'hello world!' };
        case 'RANDOM':
            return {
                ...state,
                value: `Random number: ${Math.random() * Date.now()}`,
            };
        default:
            if (__DEV__) {
                throw new Error('undefined type of action');
            }
    }
};

const state = createStore(reducer, { value: 'hello' });

export function connect() {
    return function (WrappedComponent: Component<any, any>) {
        return class Connect extends Component<any, any> {
            render() {
                return (
                    <WrappedComponent
                        {...state.getState()}
                        {...this.props}
                    ></WrappedComponent>
                );
            }

            componentDidUpdate() {
                super.componentDidUpdate();
            }

            componentWillUnmount() {
                super.componentWillUnmount();
            }

            componentDidMount() {
                super.componentDidMount();
            }

            shouldComponentUpdate(nextProps: any, nextState?: any) {
                super.shouldComponentUpdate(nextProps, nextState);
            }
        };
    };
}
