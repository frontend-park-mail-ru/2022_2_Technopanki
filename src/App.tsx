import { Component } from '../Reacts/index';
import { createRoot } from '../Reacts/index';
import { createContext } from '../Reacts/reacts/context/context';
import ButtonText from './components/UIkit/buttons/ButtonText';

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

// const store = createStore(reducers);
const MyContext = createContext('hello world');

class Header extends Component<{ count: number }> {
    render() {
        return (
            <header className={'main__header'}>
                <p>Number of items: {this.props.count.toString()}</p>
            </header>
        );
    }
}

class Card extends Component<{ name: string }> {
    componentDidMount() {
        console.log('componentDidMount called!');
    }

    componentDidUpdate() {
        console.log('componentDidUpdate called!');
    }

    componentWillUnmount() {
        console.log('componentWillUnmount called!');
    }

    unmount() {
        console.log('unmount called!');
    }

    render() {
        return (
            <div
                style={
                    'padding: 8px, border: 1px solid #000, border-radius: 8px, margin-top: 8px'
                }
            >
                <h1 key={2}>{this.props.name}</h1>
                <MyContext.Consumer key={1}>
                    {(value: string) => <p>{value}</p>}
                </MyContext.Consumer>
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
        return (
            <div className={'main'}>
                <MyContext.Provider value={this.state.str}>
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
                    {this.state.data.map(item => (
                        <Card key={item.id} name={item.name} />
                    ))}
                    <ButtonText
                        onClick={() => {
                            document.documentElement.style.setProperty(
                                '--background-0',
                                '#000',
                            );
                        }}
                    >
                        Change background color!
                    </ButtonText>
                </MyContext.Provider>
            </div>
        );
    }
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
