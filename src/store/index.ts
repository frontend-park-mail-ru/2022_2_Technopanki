import { connect } from './connect';
import { store } from './testStore';

const dispatch = store.dispatch.bind(store);

export { connect, dispatch };
