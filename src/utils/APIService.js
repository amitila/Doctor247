import WebService from './WebService';

export default class APIService {
	static urlServerAddress = 'http://192.168.1.2:8080';

	static baseAPI = () => {
		return `${APIService.urlServerAddress}/api/`;
	};

	static apiSignIn = () => {
		return `${APIService.baseAPI()}user/login`;
	};

	static apiSignUp = () => {
		return `${APIService.baseAPI()}user/customer`;
	};


  	// TODO: multipart
	  
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
	
}
