import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './components/Landing.js';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import ForgotPass from './components/ForgotPass';
import Profile from './pages/Profile';
import Doctors from './pages/ListDoctors';
import DrawerHeader from './layouts/DrawerHeader';
import QuestionAnswer from './pages/QuestionAnswer';
import Appointment from './pages/Appointment';
import MedicalrRecords from './pages/MedicalRecords';
import Task from './pages/Task';
import Footer from './layouts/Footer';
import Home from './pages/Home';
//import Demo from './components/Demo';

export default function App() {
	return (
		<Router>
			<DrawerHeader />
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/notification' component={SignIn} />
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/signup' component={SignUp} />
				<Route exact path='/forgotpass' component={ForgotPass} />
				<Route exact path='/profile' component={Profile} />
				<Route exact path='/doctors' component={Doctors} />
				<Route exact path='/appointment' component={Appointment} />
				<Route exact path='/task' component={Task} />
				<Route exact path='/medicalrecords' component={MedicalrRecords} />
				<Route exact path='/question' component={QuestionAnswer} />
				<Route exact path='/home' component={Home} />
				<Redirect to="/signin" />
			</Switch>
			<Footer />
		</Router>
	);
}

