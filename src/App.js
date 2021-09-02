import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing.js';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import ForgotPass from './components/ForgotPass';
import MyProfile from './components/MyProfile';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home/Home';

class App extends Component {

  render() {
      return (
        <Router>
          <Header />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/signin' component={SignIn} />
            <Route exact path='/signup' component={SignUp} />
            <Route exact path='/forgotpass' component={ForgotPass} />
            <Route exact path='/myprofile' component={MyProfile} />
            <Route exact path='/home' component={Home} />
          </Switch>
          <Footer />
        </Router>
      );
  }
}

export default App;
