import { Component } from '../Reacts/index';
import { createRoot } from '../Reacts/index';
import { createContext } from '../Reacts/reacts/context/context';
import Test from './components/test';
import { createStore } from '../Fluxs/createStore';
import { Reducer } from '../Fluxs/types/reducer';
import Card from './Card';
import createConnect from '../Reacts/reacts-flux/connect';

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
    render() {
        return (
            <header className={'main__header'}>
                <p>Number of items: {this.props.count.toString()}</p>
            </header>
        );
    }
}

const reducer: Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_RANDOM':
            return { ...state, value: `${Math.random() * Date.now()}` };
        case 'HELLO_WORLD':
            return { ...state, value: 'Hello world!' };
    }
};

const store = createStore(reducer, { value: 'Initial store value' });
export const connect = createConnect(store);

export const MyContext = createContext('hello world');

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
                    <Test key={'test'} />
                </MyContext.Provider>
            </div>
        );
    }
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
