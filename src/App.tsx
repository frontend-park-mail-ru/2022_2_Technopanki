import { Component } from '../Reacts/index';
import { createRoot } from '../Reacts/index';
import { createContext } from '../Reacts/reacts/context/context';
import { Context } from '../Reacts/reacts/context';

// Router.addRoutePath('/', Main);
// Router.addRoutePath('/signup', SignUp);
// Router.addRoutePath('/signin', SignIn);
// Router.addRoutePath('/vacancies', Vacancies);
//
// window.addEventListener('popstate', () => {
//     Router.render(location.pathname, true);
// });
//
// authenticateUser().then(() => Router.render(location.pathname));

class Header extends Component<{ count: number }> {
    constructor(props: { count: number }) {
        super(props);
    }
    render() {
        return (
            <header className={'main__header'}>
                <p>Number of items: {this.props.count.toString()}</p>
            </header>
        );
    }
}

class Card extends Component<{ name: string; context: Context<any> }> {
    render() {
        return (
            <div
                style={
                    'padding: 8px, border: 1px solid #000, border-radius: 8px, margin-top: 8px'
                }
            >
                <this.props.context.Consumer>
                    {(value: string) => <p key={'text'}>{value}</p>}
                </this.props.context.Consumer>
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}

class App extends Component<
    {},
    { data: { id: number; name: string }[]; str: string }
> {
    state = {
        data: [
            {
                id: 1,
                name: 'hello world',
            },
            {
                id: 2,
                name: 'hello world',
            },
            {
                id: 3,
                name: 'hello world',
            },
            {
                id: 4,
                name: 'hello world',
            },
        ],
        str: 'Hello world!',
    };

    render() {
        const Context = createContext('hello world');
        return (
            <div className={'main'}>
                <Context.Provider value={this.state.str}>
                    <Header key={'header'} count={this.state.data.length} />
                    <button
                        key={'button'}
                        onClick={() =>
                            this.setState(state => {
                                state.data.push({
                                    id: state.data.length + 1,
                                    name: 'New item',
                                });
                                return state;
                            })
                        }
                    >
                        Add item to list
                    </button>
                    <button
                        key={'delete'}
                        onClick={() =>
                            this.setState(state => {
                                state.data.pop();
                                return state;
                            })
                        }
                    >
                        Delete last line
                    </button>
                    <button
                        onClick={() =>
                            this.setState(state => {
                                state.str = `Random number: ${
                                    Math.random() * Date.now()
                                }`;
                                return state;
                            })
                        }
                    >
                        Set provider to random value
                    </button>
                    {this.state.data.map((item, index) => (
                        <Card
                            context={Context}
                            key={item.id}
                            name={item.name}
                        />
                    ))}
                </Context.Provider>
            </div>
        );
    }
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
