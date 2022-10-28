import Store from '../../Fluxs/createStore';
import { reducer } from './testReducer';

export const store = new Store(reducer, { value: 'hello' }, []);
