// import { COMPONENT_SYMBOL, DOM_SYMBOL } from '../../shared/constants/symbols';
// import { ReactsComponent } from '../../reacts/src/Component';
// import Func = jest.Func;
//
// describe('JSX', () => {
//     it('DOM - basic tests', () => {
//         const node = <div key={'tests'}>Hello world</div>;
//         expect(node).toEqual({
//             $$typeof: DOM_SYMBOL,
//             type: 'div',
//             props: { children: 'Hello world' },
//             ref: null,
//             key: 'tests',
//             eventMap: new Map<string, Function>()
//         });
//     });
//
//     it('DOM - map', () => {
//         const node = (
//             <div key={'div'}>
//                 {[1, 2, 3].map(elem => (
//                     <p key={elem}>{elem}</p>
//                 ))}
//             </div>
//         );
//         expect(node).toEqual({
//             $$typeof: DOM_SYMBOL,
//             type: 'div',
//             props: {
//                 children: [
//                     {
//                         $$typeof: DOM_SYMBOL,
//                         type: 'p',
//                         props: { children: 1 },
//                         ref: null,
//                         key: 1,
//                     },
//                     {
//                         $$typeof: DOM_SYMBOL,
//                         type: 'p',
//                         props: { children: 2 },
//                         ref: null,
//                         key: 2,
//                     },
//                     {
//                         $$typeof: DOM_SYMBOL,
//                         type: 'p',
//                         props: { children: 3 },
//                         ref: null,
//                         key: 3,
//                     },
//                 ],
//             },
//             ref: null,
//             key: 'div',
//         });
//     });
//
//     it('DOM - map with another children', () => {
//         const node = (
//             <div key={'div'}>
//                 {[1, 2, 3].map(elem => (
//                     <p key={elem}>{elem}</p>
//                 ))}
//                 <h1 key={'h1'}>Hello</h1>
//             </div>
//         );
//         expect(node).toEqual({
//             $$typeof: DOM_SYMBOL,
//             type: 'div',
//             props: {
//                 children: [
//                     [
//                         {
//                             $$typeof: DOM_SYMBOL,
//                             type: 'p',
//                             props: { children: 1 },
//                             ref: null,
//                             key: 1,
//                         },
//                         {
//                             $$typeof: DOM_SYMBOL,
//                             type: 'p',
//                             props: { children: 2 },
//                             ref: null,
//                             key: 2,
//                         },
//                         {
//                             $$typeof: DOM_SYMBOL,
//                             type: 'p',
//                             props: { children: 3 },
//                             ref: null,
//                             key: 3,
//                         },
//                     ],
//                     {
//                         $$typeof: DOM_SYMBOL,
//                         type: 'h1',
//                         props: { children: 'Hello' },
//                         ref: null,
//                         key: 'h1',
//                     },
//                 ],
//             },
//             ref: null,
//             key: 'div',
//         });
//     });
//
//     it('COMPONENT - basic tests', () => {
//         class TestComponent extends ReactsComponent {
//             render() {
//                 return <p key={'tests'}>Hello world!</p>;
//             }
//         }
//         expect(<TestComponent />?.props?.children).toEqual({
//             $$typeof: DOM_SYMBOL,
//             type: 'p',
//             props: { children: 'Hello world!' },
//             key: 'tests',
//             ref: null,
//
//         });
//         expect(<TestComponent />.instance).toBeInstanceOf(TestComponent)
//     });
// });
