import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BrowserRouter, Switch, Redirect, Route} from "react-router-dom";

ReactDOM.render(
  // <BrowserRouter>
  <React.StrictMode>
    <App />
  </React.StrictMode>,
//   <BrowserRouter>
//   <Switch>
//     <Route path="/admin" render={(props) => <App {...props} />} />
//     <Route path="/auth" render={(props) => <AuthLayout {...props} />} />
//     <Redirect from="/" to="/admin/index" />
//   </Switch>
// </BrowserRouter>,

  document.getElementById('root')
);
