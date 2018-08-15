import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import {browserHistory, hashHistory} from 'react-router';
//import App from './components/App';

import Routes from './routes';


ReactDOM.render(
    <BrowserRouter history={hashHistory}>
      <Routes />
    </BrowserRouter>,
    document.getElementById('root')
);
