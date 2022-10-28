import { Component } from '../Reacts/index';
import { MyContext } from './App';
import { StoreType } from '../Fluxs/types/store';
import { connect } from './store/index';

const mapStateToProps = (store: StoreType, props: Object) => {
    return { ...props, ...store.getState() };
};

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
                <h3 key={2}>{this.props.name}</h3>
                <MyContext.Consumer key={1}>
                    {(value: string) => <p>{value}</p>}
                </MyContext.Consumer>
                <p key={'flux'}>Value from flux: {this.props.value}</p>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Card);
