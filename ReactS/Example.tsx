import { Component, VNode } from './core/index';

export default class Example implements JSX.ElementClass {
    props;

    constructor(props: any) {
        this.props = props;
    }
    render(): any {
        return (
            <section className={'Hello'}>
                <h1>Привет мир!</h1>
            </section>
        );
    }
}
