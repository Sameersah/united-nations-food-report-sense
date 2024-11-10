import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // Use named export
import rootReducer from '../reducers/reducer';

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;