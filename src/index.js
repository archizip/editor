import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import rootReducer from './js/App/Store/Reducers/Root';
import Home from './js/App/Modules/Home';
import styles from './styles/main.less';

const store = createStore(rootReducer);

render(
  <Provider store={store}>
    <Router>
      <Home />
    </Router>
  </Provider>,
  document.getElementById('app'),
);
