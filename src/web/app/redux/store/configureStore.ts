import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { initialState } from './initialState';
import rootReducer from '../reducers/rootReducer';
import rootSaga from '../sagas/rootSaga';

function configureStoreProd() {
  const sagaMiddleware = createSagaMiddleware();

  const _store = createStore(rootReducer, initialState, compose(
    applyMiddleware(sagaMiddleware)
  ));

  sagaMiddleware.run(rootSaga);
  return _store;
}

function configureStoreDev() {
  const sagaMiddleware = createSagaMiddleware();
  const middleware = [
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),
    sagaMiddleware
  ];

  const composeEnhancers = composeWithDevTools({});
  const _store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middleware)
  ));

  if ((module as any).hot) {
    // Enable Webpack hot module replacement for reducers
    (module as any).hot.accept('../reducers/rootReducer', () => {
      const nextReducer = rootReducer;
      _store.replaceReducer(nextReducer);
    });
  }

  sagaMiddleware.run(rootSaga);
  return _store;
}

export const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;
export const store = configureStore();