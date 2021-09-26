import WebService from './WebService';

export default class APIService {
	static urlServerAddress = 'http://192.168.1.2:8080';

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


  	// TODO: multipart

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
		WebService.sendJsonPUT(
			this.apiProfile(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for SignUp
	static signUp(values, callback) {
		const formData = new FormData();
		formData.append('email', values.email);
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('password', values.password);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('avatar', values.avatar);
		formData.append('gender', values.gender);
		WebService.sendJsonPOST(
			this.apiSignUp(),
			{
				formData
			},
			callback,
		);
	}

	// api for Appointment
	static appointment(values, callback) {
		const formData = new FormData();
		formData.append('email', values.email);
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('password', values.password);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('avatar', values.avatar);
		formData.append('gender', values.gender);
		WebService.sendJsonPOST(
			this.apiAppointment(),
			{
				formData
			},
			callback,
		);
	}
	
}
