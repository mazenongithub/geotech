import React from 'react';
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './components/reducers';
import './index.css';
import App from './App';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));
const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <Provider store={store}><App /></Provider>,
   );