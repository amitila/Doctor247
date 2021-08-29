import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './pages/Login/Login.js';
import Register from './pages/Register/Register.js';
import Landing from './components/Landing.js';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home/Home.js';

class App extends Component {

  render() {
      return (
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/home' component={Home} />
          </Switch>
          <Footer />
        </Router>
      );
  }
}

export default App;
