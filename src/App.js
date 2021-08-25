import React, { Component } from 'react';
import './App.css';
import Home from './Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CollaboratorsList from './CollaboratorList';
import CollaboratorsAdd from './CollaboratorAdd';

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path='/' exact={true} component={Home}/>
          <Route path='/collaborators' exact={true} component={CollaboratorsList}/>
          <Route path='/collaborators' component={CollaboratorsAdd}/>
        </Switch>
      </Router>
    )
  }
}

export default App;