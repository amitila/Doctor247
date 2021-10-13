import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './components/Landing.js';
import Notification from './pages/customer/Notification';
import SignIn from './pages/customer/SignIn';
import SignUp from './pages/customer/SignUp';
import ForgotPass from './components/ForgotPass';
import Profile from './pages/customer/Profile';
import ListDoctors from './pages/customer/ListDoctors';
import PhoneBook from './pages/customer/PhoneBook';
import DrawerHeader from './layouts/customer/DrawerHeader';
import QuestionAnswer from './pages/customer/QuestionAnswer';
import Appointment from './pages/customer/Appointment';
import MedicalrRecords from './pages/customer/MedicalRecords';
import Speciality from './pages/customer/Speciality';
import SavedQuestion from './pages/customer/SavedQuestion';
import Task from './pages/customer/Task';
import Footer from './layouts/customer/Footer';
import Home from './pages/customer/Home';
import CheckToken from './helpers/checkToken';

export default function App() {
	CheckToken();
	return (
		<Router>
			<DrawerHeader />
			<div
				class="fb-like"
				data-href="http://192.168.1.2:3000/home"
				data-width=""
				data-layout="button_count"
				data-action="like"
				data-size="large"
				data-share="true"
			></div>
			<Switch>
				<Route exact path='/' component={Landing} />
				<Route exact path='/notification' component={Notification} />
				<Route exact path='/signin' component={SignIn} />
				<Route exact path='/signup' component={SignUp} />
				<Route exact path='/forgotpass' component={ForgotPass} />
				<Route exact path='/profile' component={Profile} />
				<Route exact path='/doctors' component={ListDoctors} />
				<Route exact path='/phonebook' component={PhoneBook} />
				<Route exact path='/appointment' component={Appointment} />
				<Route exact path='/speciality' component={Speciality} />
				<Route exact path='/savedquestion' component={SavedQuestion} />
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

