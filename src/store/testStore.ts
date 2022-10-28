import Store from '../../Fluxs/store';
import { reducer } from './testReducer';

export const store = new Store(reducer, { value: 'hello' }, []);
