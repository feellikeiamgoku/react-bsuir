import '../App.css';

import Header from './Header';
import Clients from './Clients';
import React from 'react';
import Deposits from './Deposits';
import Credits from './Creditis';
import {CreateClient} from './Forms/CreateClient'

import {
  Switch,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App">

        <Header />
        <div className="main">
          <Switch>
            <Route path='/clients' component={Clients}></Route>
            <Route path='/deposits' component={Deposits}></Route>
            <Route path='/credits' component={Credits}></Route>
            <Route path='/create_client' component={CreateClient}></Route>
          </Switch>
        </div>
    </div>
  );
}

export default App;
