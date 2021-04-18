import React, {useState} from 'react';

import Header from './common/Header/Header';
import Container from './common/Container/Container'

import Clients from './routs/Clients/Clients';
import Deposits from './routs/Deposits/Deposits';
import {CreateDeposit} from './routs/Deposits/CreateDeposit';
import {UpdateDeposit} from './routs/Deposits/UpdateDeposit';
import {UpdateCredit} from './routs/Credits/UpdateCredit';
import Credits from './routs/Credits/Credits';
import {CreateClient} from './routs/Clients/CreateClient'
import NotFound from './common/Errors/NotFound'
import {UpdateCient} from './routs/Clients/UpdateClient'

import {Switch, Route} from "react-router-dom";
import { CreateCredit } from './routs/Credits/CreateCredit';

function App() {
    return (
        <div className="App">
            <Header></Header>
            <Container>
                <Switch>
                    <Route path='/clients'
                        render={() => <Clients/>}></Route>
                    <Route path='/deposits'
                        component={Deposits}></Route>
                    <Route path='/credits'
                        component={Credits}></Route>
                    <Route path='/create_client'
                        component={CreateClient}></Route>
                    <Route path='/update_client/:id'
                        component={UpdateCient}/>
                    <Route path='/create_deposit'
                    component={CreateDeposit}></Route>
                    <Route path='/update_deposit/:id' component={UpdateDeposit}></Route>
                    <Route path='/create_credit'
                    component={CreateCredit}></Route>
                      <Route path='/update_credit/:id'
                    component={UpdateCredit}></Route>
                    <Route component={NotFound}/>
                </Switch>
            </Container>
        </div>
    );
}

export default App;
