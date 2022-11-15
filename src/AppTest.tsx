import { ReactsComponent } from '../Reacts/reacts/src/Component';
import { renderNode } from '../Reacts/reacts-dom/render/renderNode';

class Test extends ReactsComponent<{ children: string }> {
    state = {
        elements: ['Hello', 'World'],
    };
    render() {
        return (
            <div>
                <h1 onClick={() => console.log('click')}>Hello world!</h1>
                <p>{this.state.elements.length}</p>
                {this.state.elements.map((value, index) => (
                    <p
                        key={index.toString()}
                        onClick={() =>
                            this.setState(state => ({
                                elements: [...state.elements, 'Hi'],
                            }))
                        }
                    >
                        {value}
                    </p>
                ))}
            </div>
        );
    }
}

renderNode(document.querySelector('#root') || document.body, <Test />);
