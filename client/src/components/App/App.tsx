import * as React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../../containers/Login';

import './App.css';

class App extends React.Component<any, any> {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route exact path="/" component={Login} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
