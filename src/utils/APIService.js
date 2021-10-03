import WebService from './WebService';

export default class APIService {
	static urlServerAddress = 'http://192.168.1.5:8080';

	static baseAPI = () => {
		return `${APIService.urlServerAddress}/api/`;
	};

	static apiCheckToken = () => {
		return `${APIService.baseAPI()}customer/users/check-token`;
	};

	static apiSignIn = () => {
		return `${APIService.baseAPI()}user/login`;
	};

	static apiSignUp = () => {
		return `${APIService.baseAPI()}user/customer`;
	};

	static apiProfile = () => {
		return `${APIService.baseAPI()}customer/users/profile`;
	};

	static apiAppointment = () => {
		return `${APIService.baseAPI()}customer/appointment`;
	};

	static apiAppointmentById = () => {
		return `${APIService.baseAPI()}customer/appointment/{id}`;
	};

	static apiProvinces = () => {
		return `${APIService.baseAPI()}province`;
	};


  	// TODO: multipart

//====================CHECK-TOKEN AND SET NEW TOKEN======================

	// api for check-token
	static checkToken(token, callback) {
		WebService.sendJsonPOST(
			this.apiCheckToken(),
			{
				jwt : token,
				token
			},
			callback,
		);
	}
	  
//====================SIGNIGN======================
	// api for SignIn
	static signIn(email, password, callback) {
		WebService.sendJsonPOST(
			this.apiSignIn(),
			{
				email,
				password,
			},
			callback,
		);
	}

//====================PROFILE======================

	// api for Get Profile
	static getProfile(token, callback ) {
		WebService.sendJsonGET(
			this.apiProfile(),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put Profile
	static putProfile(token, values, callback ) {
		const formData = new FormData();
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('gender', values.gender);
		formData.append('birthday', values.birthday);
		formData.append('avatar', values.avatar);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('provinceId', values.provinceId);
		formData.append('address', values.address);
		WebService.sendJsonPUT(
			this.apiProfile(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

//====================SIGNUP======================

	// api for SignUp
	static signUp(values, callback) {
		const formData = new FormData();
		formData.append('email', values.email);
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('password', values.password);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('gender', values.gender);
		WebService.sendJsonPOST(
			this.apiSignUp(),
			{
				formData
			},
			callback,
		);
	}

//====================APPOINTMENT======================

	// api for Post Appointment Form
	static postAppointment(token, values, callback) {
		const formData = new FormData();
		formData.append('guadianId', values.guadianId);
		formData.append('doctorId', values.doctorId);
		formData.append('dayTime', values.dayTime);
		formData.append('description', values.description);
		formData.append('images', values.images);
		WebService.sendJsonPOST(
			this.apiAppointment(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Get Appointment
	static getAppointment(token, values, callback) {
		const formData = new FormData();
		formData.append('status', values.status);
		formData.append('period', values.period);
		formData.append('day', values.day);
		formData.append('month', values.month);
		formData.append('year', values.year);
		WebService.sendJsonGET(
			this.apiAppointment(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Get an appoitment by id
	static getAppointmentById( token, id, callback ) {
		WebService.sendJsonGET(
			this.apiAppointmentById(),
			{
				jwt: token,
				id
			},
			callback,
		);
	}

	// api for Delete an appoitment by id
	static deleteAppointmentById( token, id, callback ) {
		WebService.sendJsonDELETE(
			this.apiAppointmentById(),
			{
				jwt: token,
				id
			},
			callback,
		);
	}

//====================PROVINCES======================

	// api for Get Provinces
	static getProvinces( callback ) {
		WebService.sendJsonGET(
			this.apiProvinces(),
			{
			},
			callback,
		);
	}
	
}
