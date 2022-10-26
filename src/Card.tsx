import { Component } from '../Reacts/index';
import { MyContext } from './App';
import createConnect from '../Reacts/reacts-flux/connect';
import { createStore } from "../Fluxs/createStore";

const connect = ;

@connect
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
                <p>{this.props.value}</p>
            </div>
        );
    }
}

export default Card;
