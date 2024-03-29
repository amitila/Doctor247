import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Landing from './components/Landing.js';
// For customer
import Setting from './pages/customer/Setting';
import Notification from './pages/customer/Notification';
import SignIn from './pages/both/SignIn';
import SignUp from './pages/customer/SignUp';
import ForgotPass from './components/ForgotPass';
import Profile from './pages/customer/Profile';
import ListDoctors from './pages/customer/ListDoctors';
import DoctorId from './pages/customer/ListDoctors/DoctorId/index.js';
import PhoneBook from './pages/customer/PhoneBook';
import DrawerHeader from './layouts/customer/DrawerHeader';
import QuestionAnswer from './pages/customer/QuestionAnswer';
import QuestionId from './pages/customer/QuestionAnswer/QuestionId/index.js';
import Appointment from './pages/customer/Appointment';
import MedicalrRecords from './pages/customer/MedicalRecords';
import Speciality from './pages/customer/Speciality';
import Service from './pages/customer/Service';
import SavedQuestion from './pages/customer/SavedQuestion';
import Chat from './pages/customer/Chat';
import Videocall from './pages/customer/Videocall';
import Footer from './layouts/customer/Footer';
import HomeScreen from './pages/customer/Home/HomeScreen';
import CheckToken from './helpers/checkToken';
// For doctor
import Doctor from './pages/doctor/Home/Doctor';
import AppProvider from './store/AppProvider';
// Both
import { useSelector } from "react-redux";
import { selectRole } from './store/userSlice';
import NotFound from './components/NotFound';
import PaymentResult from './components/PaymentResult';
import { SnackbarProvider } from 'notistack';
import SignUpDoctor from './components/SignUpDoctor';

export default function App() {
	let mark;
	CheckToken();
	const role = useSelector(selectRole);
	if(role === 'CUSTOMER') {
		mark = 0;
	}
	else {
		mark = 1;
	}
	return (
		<Router>
			{
				role === 'DOCTOR' ? '' : <DrawerHeader mark={mark} />
			}
			<div
				class="fb-like"
				data-href={window.location.origin + '/home'}
				data-width=""
				data-layout="button_count"
				data-action="like"
				data-size="large"
				data-share="true"
			></div>
			<Switch>
				<AppProvider>
					<SnackbarProvider maxSnack={3}>
					<Route exact path='/' component={Landing} />
					<Route exact path='/notification' component={Notification} />
					<Route exact path='/signin' component={SignIn} />
					<Route exact path='/signup' component={SignUp} />
					<Route exact path='/signup-doctor' component={SignUpDoctor} />
					<Route exact path='/forgotpass' component={ForgotPass} />
					{
						mark === 0 ? 
							<>
								<Route exact path='/profile' component={Profile} />
								<Route exact path='/savedquestion' component={SavedQuestion} />
								<Route exact path='/appointment' component={Appointment} />
								<Route exact path='/medicalrecord' component={MedicalrRecords} />
								<Route exact path='/setting' component={Setting} />
								<Route exact path='/doctorlist/:id/chat-to-doctor' component={Chat} />
								<Route exact path='/doctorlist/:id/videocall-to-doctor' component={Videocall} />
							</>
							: ''
					}
					<Route exact path='/phonebook' component={PhoneBook} />
					<Route exact path='/speciality' component={Speciality} />
					<Route exact path='/service' component={Service} />
					<Route exact path='/doctorlist' component={ListDoctors} />
					<Route exact path='/doctorlist/:id' component={DoctorId} />
					<Route exact path='/question' component={QuestionAnswer} />
					<Route exact path='/question/:id' component={QuestionId} />
					<Route exact path='/home' component={HomeScreen} />
					<Route exact path='/doctor/home' component={Doctor} />
					<Route exact path='/notfound' component={NotFound} />
					<Route path='/api/payment' component={PaymentResult} />
					{
						role === 'DOCTOR' ? <Redirect to="/doctor/home" /> : <Redirect to={window.location.pathname} />
					}
					</SnackbarProvider>
				</AppProvider>
			</Switch>
			{
				role === 'DOCTOR' ? null : <Footer />
			}
			{/* <DrawerHeader />
			<div
				class="fb-like"
				data-href="http://192.168.1.2:3000/home"
				data-width=""
				data-layout="button_count"
				data-action="like"
				data-size="large"
				data-share="true"
			></div>
			<AppProvider>
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
					<Route exact path='/doctor/home' component={Doctor} />
					<Redirect to="/signin" />
				</Switch>
			</AppProvider>
			<Footer /> */}
		</Router>
	);
}
