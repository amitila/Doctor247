import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing.js';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPass from './components/ForgotPass';
import MyProfile from './components/MyProfile';
import Doctors from './pages/ListDoctors';
import Header from './layouts/Header';
import QuestionAnswer from './pages/QuestionAnswer';
import BookingForm from './pages/Booking';
import Footer from './layouts/Footer';
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
            <Route exact path='/doctors' component={Doctors} />
            <Route exact path='/appointment' component={BookingForm} />
            <Route exact path='/question' component={QuestionAnswer} />
            <Route exact path='/home' component={Home} />
          </Switch>
          <Footer />
        </Router>
      );
  }
}

export default App;
