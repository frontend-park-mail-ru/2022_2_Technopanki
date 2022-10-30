import { Component } from '../Reacts';
import { createRoot } from '../Reacts';
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
import TextBlock from './components/UI-kit/text/TextBlock';
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

export default class Test extends Component<
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
                        <TextBlock
                            headline={'This is example of default text block'}
                            content={`Мы помогаем людям объединяться для того, что для них действительно важно. С нами ты будешь создавать и развивать сервисы для миллионов пользователей, которые помогают общаться, работать, учиться, решать бытовые задачи и развлекаться. Для нас важно делать технологии доступными для каждого и постоянно совершенствовать наши продукты.

Наша команда — это профессионалы из разных сфер, которые умеют реализовывать необычные и сложные идеи и задачи. Обмениваясь опытом, мы создаём новые идеи и достигаем большего.

Если ты любишь решать сложные задачи, экспериментировать и создавать продукты для миллионов пользователей — присоединяйся, чтобы вместе развивать интернет и определять его будущее.`}
                        />
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
                            className={'flex flex-grow row g-8'}
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
                                Add new line
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
