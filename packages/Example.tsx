import { ReactsElement } from './reacts/index';
import { Component } from './reacts/Component';

export default class Example extends Component<{}, { counter: number }> {
    constructor(props: any) {
        super(props);
        this.state = {
            counter: 2,
        };
    }

    render(): ReactsElement<{}> {
        return (
            <div className={'div'}>
                <p key={1} className={'counter'}>{`${this.state.counter}`}</p>
                <p key={2} className={'hello'}>
                    Hello world!
                </p>
                <p key={3} className={'hello'}>
                    Hello world!
                </p>
                <p key={4} className={'hello'}>
                    Hello world!
                </p>
                <p key={5}>Hello world!</p>
                <button
                    key={6}
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
