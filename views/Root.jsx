import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import App from './App';
import rootSaga from './sagas/objects';
import rootReducer from './reducers/objects';


const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  rootReducer,
  //window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(rootSaga);

export default class Root extends React.Component {
  render() {
    return (
      <div>
      <Provider store={store}>
        <App />
      </Provider>
    </div>
    )
  }
}
