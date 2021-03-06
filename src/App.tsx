import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import CardsPage from './pages/cards.landing.component';
import AddCardPage from './pages/cards.add.component';

import './App.css';

class App extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/cards" component={CardsPage} ></Route>
                    <Route exact path="/cards/add" component={AddCardPage}></Route>
                    <Route path={`/cards/:cardId/edit`} component={AddCardPage} />
                    <Redirect from="/" to="/cards" />
                </Switch>
            </div>

        )
    }
}

export default App;