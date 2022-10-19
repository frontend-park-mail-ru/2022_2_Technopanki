import { Component } from './packages/reacts/Component';
import { createRoot } from './packages/reacts-dom/root/index';

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
        // TODO: fix bug with <p>Item: ${this.props.count.toString()}</p>
        // сейчас он возвращает массив, и поэтому на проверке в renderChildren в
        // renderNode.ts не проходит проверку и падает с ошибкой
        return (
            <header className={'main__header'}>
                <p>{`Item: ${this.props.count.toString()}`}</p>
                <p>Item 2</p>
            </header>
        );
    }
}

class App extends Component<{}, { data: { name: string }[] }> {
    state = {
        data: [
            {
                name: 'hello world',
            },
            {
                name: 'hello world',
            },
            {
                name: 'hello world',
            },
            {
                name: 'hello world',
            },
        ],
    };

    render() {
        return (
            <div className={'main'}>
                {this.state.data.map((item, index) => (
                    <p key={index.toString()}>{item.name}</p>
                ))}
                <button
                    key={'button'}
                    onclick={() =>
                        this.setState(state => {
                            state.data.push({ name: 'New item' });
                            return state;
                        })
                    }
                >
                    Add item to list
                </button>
                <button
                    key={'delete'}
                    onclick={() =>
                        this.setState(state => {
                            state.data.shift();
                            return state;
                        })
                    }
                >
                    Delete last line
                </button>
            </div>
        );
    }
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
