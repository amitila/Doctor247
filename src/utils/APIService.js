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
		return `${APIService.baseAPI()}user/signup`;
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

	// api for SignIn
	static signUp(email, firtName, lastName, password, phoneNumber, avatar, gender, callback) {
		WebService.sendJsonPOST(
			this.apiSignUp(),
			{
				email, 
				firtName, 
				lastName, 
				password, 
				phoneNumber, 
				avatar, 
				gender,
			},
			callback,
		);
	}
	
}
