import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './components/Landing.js';
import SignIn from './pages/customer/SignIn';
import SignUp from './pages/customer/SignUp';
import ForgotPass from './components/ForgotPass';
import Profile from './pages/customer/Profile';
import Doctors from './pages/customer/ListDoctors';
import DrawerHeader from './layouts/customer/DrawerHeader';
import QuestionAnswer from './pages/customer/QuestionAnswer';
import Appointment from './pages/customer/Appointment';
import MedicalrRecords from './pages/customer/MedicalRecords';
import Task from './pages/customer/Task';
import Footer from './layouts/customer/Footer';
import Home from './pages/customer/Home';
import Doctor from './pages/doctor/home/Doctor';
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
				<Route exact path='/doctor/home' component={Doctor} />
			</Switch>
			<Footer />
		</Router>
	);
}

