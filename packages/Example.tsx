import { ReactsElement } from './reacts/index';
import { Component } from './reacts/Component';

class NewExample extends Component<{ counter: number; setState: Function }> {
    constructor(
        props:
            | { counter: number; setState: Function }
            | Readonly<{ counter: number; setState: Function }>,
    ) {
        super(props);
    }

    render() {
        return (
            <div className={'div'}>
                <p key={1} className={'counter'}>{`${this.props.counter}`}</p>
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
                <button key={6} onclick={this.props.setState}>
                    Increment
                </button>
            </div>
        );
    }
}

export default class Example extends Component<{}, { counter: number }> {
    constructor(props: any) {
        super(props);
        this.state = {
            counter: 2,
        };
    }

    render(): ReactsElement<{}> {
        return (
            <div>
                <h1 key={'hi'}>Hellllllo world from my app!</h1>
                <NewExample
                    counter={this.state.counter}
                    setState={() => {
                        console.log('set state called');
                        this.setState(state => ({
                            ...state,
                            counter: state.counter + 1,
                        }));
                    }}
                />
                <div key={3} style={'padding: 40px'}>
                    <p>Some text with padding</p>
                </div>
            </div>
        );
    }
}

// export default class Example {
//     render() {
//         return <div>Hello world!</div>;
//     }
// }
