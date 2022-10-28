import { Component } from '../reacts/index';

export default function connect() {
    return function (WrappedComponent: Function) {
        return class Connect extends Component<any, any> {
            render() {
                return (
                    <WrappedComponent
                        {...state.getState()}
                        {...this.props}
                    ></WrappedComponent>
                );
            }
        };
    };
}
