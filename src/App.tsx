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
import Input from './components/UI-kit/forms/inputs/Input';
import Header from './components/UI-kit/header/Header';
import ArrowButton from './components/UI-kit/buttons/ArrowButton';
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

class Counter extends Component<{ count: number }> {
    render() {
        return (
            <div className={'main__header'}>
                <p>Number of items: {this.props.count.toString()}</p>
            </div>
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
            <div>
                <h3 key={2}>{this.props.name}</h3>
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
        ],
        str: 'Hello world!',
    };

    render() {
        setTheme();
        return (
            <div className={'main'}>
                <Header key={'header'} />
                <div key={'provider'} className={'provider screen-responsive'}>
                    <MyContext.Provider value={this.state.str}>
                        <h1 key={'h1'}>Example text</h1>
                        <h2 key={'h2'}>Example text</h2>
                        <h3 key={'h3'}>Example text</h3>
                        <h4 key={'h4'}>Example text</h4>
                        <h5 key={'h5'}>Example text</h5>
                        <h6 key={'h6'}>Example text</h6>
                        <p key={'p'}>Example text</p>
                        <Input
                            key={'input'}
                            type={'text'}
                            placeholder={'type smth..'}
                        >
                            <p>Label</p>
                        </Input>
                        <ChipsTemp key={'chips'} />
                        <Counter
                            key={'counter'}
                            count={this.state.data.length}
                        />
                        <div
                            key={'buttons'}
                            style={
                                'display: flex; flex-direction: row; gap: 8px'
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
                                        state.str = `Random number: ${
                                            Math.random() * Date.now()
                                        }`;
                                        return state;
                                    })
                                }
                            >
                                Set provider to random value
                            </ButtonPrimaryBlue>
                            <ButtonPrimary
                                key={'theme_button'}
                                onClick={toggleTheme}
                            >
                                Change background color!
                            </ButtonPrimary>
                        </div>
                        <ArrowButton onClick={() => {}} />
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
