import { ReactsComponent } from '../Reacts/reacts/src/Component';
import { renderNode } from '../Reacts/reacts-dom/render/renderNode';

class SomeComponent extends ReactsComponent {
    render() {
        return <div>Hello world</div>;
    }
}

class Test extends ReactsComponent<{ children: string }> {
    state = {
        elements: ['Hello', 'World'],
    };

    render() {
        return (
            <div>
                <h1 onClick={() => console.log('click')}>Hello world!</h1>
                {this.state.elements.length % 2 === 0 ? (
                    <SomeComponent />
                ) : (
                    <p>tttest</p>
                )}
                <p>{this.state.elements.length}</p>
                {this.state.elements.map((value, index) => (
                    <div key={index.toString()}>
                        <button
                            onClick={() =>
                                this.setState(state => ({
                                    elements: [...state.elements, 'Hi'],
                                }))
                            }
                        >
                            Add new element
                        </button>
                        <button
                            onClick={() =>
                                this.setState(state => ({
                                    elements: [...state.elements.slice(0, -1)],
                                }))
                            }
                        >
                            Delete element
                        </button>
                        <p>{value}</p>
                    </div>
                ))}
            </div>
        );
    }
}

renderNode(document.querySelector('#root') || document.body, <Test />);
