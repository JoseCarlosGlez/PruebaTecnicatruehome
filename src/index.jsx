import React from 'react';
import ReactDOM from 'react-dom';
import { Fragment } from 'react/cjs/react.production.min';
import DestinationsComponent from './components/destinations/destination';
import ShoppingCart from './components/shopping cart/shoppingcart';
//redux
import { Provider } from 'react-redux';
import store from './store.js'

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './index.scss';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <Fragment>
      <BrowserRouter>
        <Provider store={store}>
          <div className="home">
            <div className="container">
              <Routes>
                <Route path="/" element={<DestinationsComponent />} />
                <Route exact path="/shoppingcart" element={<ShoppingCart />} />
              </Routes>
            </div>
          </div>
        </Provider >
      </BrowserRouter>
    </Fragment>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
