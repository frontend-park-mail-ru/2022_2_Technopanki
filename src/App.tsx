import { Component } from '../Reacts/index';
import { createRoot } from '../Reacts/index';
import { createContext } from '../Reacts/reacts/context/context';

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

class Card extends Component<{ name: string }> {
    render() {
        return (
            <div
                style={
                    'padding: 8px, border: 1px solid #000, border-radius: 8px, margin-top: 8px'
                }
            >
                <h1>{this.props.name}</h1>
            </div>
        );
    }
}

class App extends Component<{}, { data: { id: number; name: string }[] }> {
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
    };

    render() {
        const Context = createContext('hello world');
        return (
            <div className={'main'}>
                <Context.Provider value={'provider value'}>
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
                    {this.state.data.map((item, index) => (
                        <Card key={item.id} name={item.name} />
                    ))}
                    <Context.Consumer>
                        {(value: string) => <p key={'text'}>{value}</p>}
                    </Context.Consumer>
                </Context.Provider>
            </div>
        );
    }
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
