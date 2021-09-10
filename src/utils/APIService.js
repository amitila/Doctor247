import WebService from './WebService';

export default class APIService {
	static urlServerAddress = 'http://192.168.1.7:8080';

	static baseAPI = () => {
		return `${APIService.urlServerAddress}/api/`;
	};

	static apiSignIn = () => {
		return `${APIService.baseAPI()}user/login`;
	};

  	// TODO: multipart

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
}
