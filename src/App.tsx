import { Component } from '../Reacts/index';
import { createRoot } from '../Reacts/index';
import { createContext } from '../Reacts/reacts/context/context';
import './styles/globals.scss';
import { setTheme, toggleTheme } from './toggleTheme';
import Button from './components/UI-kit/buttons/Button';
import ButtonPrimaryBlue from './components/UI-kit/buttons/ButtonPrimaryBlue';
import ButtonPrimary from './components/UI-kit/buttons/ButtonPrimary';
import Footer from './components/UI-kit/footer/Footer';
import ChipsTemp from './components/ChipsTemp';
import createConnect from '../Reacts/reacts-flux/connect';
import { createStore } from '../Fluxs/store';
import { Action } from '../Fluxs/types/action';
import Card from './Card';
import { dispatch } from './store/index';

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

export const MyContext = createContext('hello world');

class Header extends Component<{ count: number }> {
    render() {
        return (
            <header className={'main__header'}>
                <p>Number of items: {this.props.count.toString()}</p>
            </header>
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
        ],
        str: 'Hello world!',
    };

    render() {
        setTheme();

        return (
            <div className={'main'}>
                <div key={'provider'} className={'provider screen-responsive'}>
                    <MyContext.Provider value={this.state.str}>
                        <h1 key={'h1'}>Example text</h1>
                        <h2 key={'h2'}>Example text</h2>
                        <h3 key={'h3'}>Example text</h3>
                        <h4 key={'h4'}>Example text</h4>
                        <h5 key={'h5'}>Example text</h5>
                        <h6 key={'h6'}>Example text</h6>
                        <p key={'p'}>Example text</p>
                        <ChipsTemp key={'chips'} />
                        <Header key={'header'} count={this.state.data.length} />
                        <div
                            key={'buttons'}
                            style={
                                'display: flex; flex-direction: row; gap: 8px; flex-wrap: wrap'
                            }
                        >
                            <Button
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
                            </Button>
                            <Button
                                key={'delete'}
                                onClick={() =>
                                    this.setState(state => {
                                        state.data.pop();
                                        return state;
                                    })
                                }
                            >
                                Delete last line
                            </Button>
                            <ButtonPrimaryBlue
                                onClick={() =>
                                    this.setState(state => {
                                        state.str = `${
                                            Math.random() * Date.now()
                                        }`;
                                        return state;
                                    })
                                }
                            >
                                Set provider to random value
                            </ButtonPrimaryBlue>
                            <ButtonPrimaryBlue
                                key={'dispatch'}
                                onClick={() => dispatch({ type: 'RANDOM' })}
                            >
                                Send 'RANDOM' action in store
                            </ButtonPrimaryBlue>
                            <ButtonPrimary
                                key={'theme_button'}
                                onClick={toggleTheme}
                            >
                                Change background color!
                            </ButtonPrimary>
                        </div>
                        {this.state.data.map(item => (
                            <Card key={item.id} name={item.name} />
                        ))}
                    </MyContext.Provider>
                </div>
                <Footer key={'footer'} />
            </div>
        );
    }
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
