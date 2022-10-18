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

class App extends Component<{}, { count: number }> {
    state = {
        count: 0,
    };

    render() {
        return (
            <div className={'main'}>
                <Header count={this.state.count} />
                <h1>Hello world!</h1>
                <button
                    onclick={() =>
                        this.setState(state => ({ count: state.count + 1 }))
                    }
                >
                    Increment button
                </button>
            </div>
        );
    }
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
