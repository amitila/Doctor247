import WebService from './WebService';

export default class APIService {
	static urlServerAddress = 'http://localhost:8081';

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
