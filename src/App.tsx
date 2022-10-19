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
        return (
            <header className={'main__header'}>
                <p>Number of items: {this.props.count.toString()}</p>
            </header>
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
        return (
            <div className={'main'}>
                <Header key={'header'} count={this.state.data.length} />
                <button
                    key={'button'}
                    onclick={() =>
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
                    onclick={() =>
                        this.setState(state => {
                            state.data.pop();
                            return state;
                        })
                    }
                >
                    Delete last line
                </button>
                {this.state.data.map((item, index) => (
                    <p key={item.id}>{item.name}</p>
                ))}
            </div>
        );
    }
}

const root = createRoot(document.querySelector('#root'));
root.render(<App />);
