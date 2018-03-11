import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import App from './components/App';
import rootSaga from './dux/rootSaga';
import rootReducer from './dux/rootReducer';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware),
);

sagaMiddleware.run(rootSaga);

const Root = () => (
  <div>
    <Provider store={store}>
      <App />
    </Provider>
  </div>
);
export default Root;
