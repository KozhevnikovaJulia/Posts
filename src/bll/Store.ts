import { applyMiddleware, combineReducers, createStore, compose } from 'redux';
import { Reducer } from './Reducer';
import thunkMiddleware from 'redux-thunk';

let redusers = combineReducers({
  app: Reducer,
});

export type AppStateType = ReturnType<typeof redusers>;

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export let store = createStore(redusers, composeEnhancers(applyMiddleware(thunkMiddleware)));
