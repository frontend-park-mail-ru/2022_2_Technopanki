import { ComponentClass, ReactsElement } from './reacts/index';
import { Component } from './reacts/Component';

export default class Example extends Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            counter: 2,
        };
    }

    render(): ReactsElement {
        return (
            <div className={'div'}>
                <p className={'counter'}>{`${this.state.counter}`}</p>
                <p className={'hello'}>Hello world!</p>
                <p className={'hello'}>Hello world!</p>
                <p className={'hello'}>Hello world!</p>
                <p>Hello world!</p>
                <button
                    onclick={() =>
                        this.setState(state => ({
                            ...state,
                            counter: state.counter + 1,
                        }))
                    }
                >
                    Increment
                </button>
            </div>
        );
    }
}

// export default class Example {
//     render() {
//         return <div>Hello world!</div>;
//     }
// }
