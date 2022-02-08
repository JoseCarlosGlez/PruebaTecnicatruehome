import React from 'react';
import ReactDOM from 'react-dom';
import { Fragment } from 'react/cjs/react.production.min';
import DestinationsComponent from './components/destinations/destination';
//redux
import { Provider } from 'react-redux';
import  store  from './store.js'


import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Fragment>
        <div className="home">
          <div className="container">
            <DestinationsComponent />
          </div>
        </div>
      </Fragment>
    </Provider >
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
