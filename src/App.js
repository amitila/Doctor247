import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import Landing from './components/Landing.js';

class App extends Component {

  render() {
      return (
        <Router>
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </Router>
      );
  }
}

export default App;
