import WebService from './WebService';

export default class APIService {
	// static urlServerAddress = 'http://192.168.1.7:8080';
	// static urlServerAddress = 'http://localhost:8081';
	static urlServerAddress = 'https://doctor247api.herokuapp.com';

// For visitor
	static baseAPI = () => {
		return `${APIService.urlServerAddress}/api/`;
	};

	static apiAnswer = (id) => {
		return `${APIService.baseAPI()}question/answer/${id}`;
	};

	static apiDoctorListPublic = () => {
		return `${APIService.baseAPI()}doctor/list`;
	};
	
	static apiJobPosition = () => {
		return `${APIService.baseAPI()}job-position`;
	};

	static apiPublicQuestion = () => {
		return `${APIService.baseAPI()}question`;
	};

	static apiSignIn = () => {
		return `${APIService.baseAPI()}user/login`;
	};

	static apiSpecialized = () => {
		return `${APIService.baseAPI()}specialized`;
	};

	static apiConfirmPayment = () => {
		return `${APIService.baseAPI()}payment/confirm_payment`;
	};

// For customer
	static baseAPI = () => {
		return `${APIService.urlServerAddress}/api/`;
	};

	static apiSpecialized = () => {
		return `${APIService.baseAPI()}specialized`;
	};

	static apiCheckToken = () => {
		return `${APIService.baseAPI()}customer/users/check-token`;
	};

	static apiChangePassword = () => {
		return `${APIService.baseAPI()}customer/users/password`;
	};

	static apiForgotPassword = () => {
		return `${APIService.baseAPI()}user/forgot-password`;
	};

	static apiForgotPasswordMail = () => {
		return `${APIService.baseAPI()}user/forgot-password/mail`;
	};

	static apiForgotPasswordSms = () => {
		return `${APIService.baseAPI()}user/forgot-password/sms`;
	};

	static apiSignIn = () => {
		return `${APIService.baseAPI()}user/login`;
	};

	static apiSignInBySms = () => {
		return `${APIService.baseAPI()}user/login-by-sms`;
	};

	static apiSignInSendCodeToSms = () => {
		return `${APIService.baseAPI()}user/send-login-sms`;
	};

	static apiSignUp = () => {
		return `${APIService.baseAPI()}user/customer`;
	};

	static apiSignUpByEmail = () => {
		return `${APIService.baseAPI()}user/send-register-mail`;
	};

	static apiSignUpBySms = () => {
		return `${APIService.baseAPI()}user/send-register-sms`;
	};

	static apiProfile = () => {
		return `${APIService.baseAPI()}customer/users/profile`;
	};

	// api add relative phonenumber
	static apiAddRelativePhoneNumber = () => {
		return `${APIService.baseAPI()}customer/users/relative-phone-number`;
	};

	static apiSetEmergencySms = () => {
		return `${APIService.baseAPI()}customer/users/emergency-sms`;
	};

	static apiGetEmergencySms = () => {
		return `${APIService.baseAPI()}customer/users/emergency-sms`;
	};

	static apiSendEmergencySms = () => {
		return `${APIService.baseAPI()}customer/users/send-emergency-sms`;
	};

	static apiAdd = () => {
		return `${APIService.baseAPI()}customer/users/add`;
	};

	static apiGetCodeToAddPhoneNumber = () => {
		return `${APIService.baseAPI()}customer/users/phoneNumber`;
	};

	static apiVerifyPhoneNumberBeforeAddEmail = () => {
		return `${APIService.baseAPI()}customer/users/email/verify`;
	};

	static apiGetCodeToAddEmail = () => {
		return `${APIService.baseAPI()}customer/users/email`;
	};

	static apiAppointment = () => {
		return `${APIService.baseAPI()}customer/appointment`;
	};

	static apiAppointmentById = (id) => {
		return `${APIService.baseAPI()}customer/appointment/${id}`;
	};

	static apiProvinces = () => {
		return `${APIService.baseAPI()}province`;
	};

	static apiDistricts = (id) => {
		return `${APIService.baseAPI()}province/district/${id}`;
	};

	static apiWards = (id) => {
		return `${APIService.baseAPI()}province/ward/${id}`;
	};

	static apiGuardian = () => {
		return `${APIService.baseAPI()}customer/guardian`;
	};

	static apiGuardianVerify = () => {
		return `${APIService.baseAPI()}customer/guardian/delete/verify`;
	};

	static apiDeleteGuardianById = (id) => {
		return `${APIService.baseAPI()}customer/guardian/delete/${id}`;
	};

	static apiGuardianById = (id) => {
		return `${APIService.baseAPI()}customer/guardian/${id}`;
	};

	// api add user for guardian
	static apiGuardianUser = () => {
		return `${APIService.baseAPI()}customer/guardian/user`;
	};

	static apiGuardianUserVerify = () => {
		return `${APIService.baseAPI()}customer/guardian/user/verify`;
	};

	static apiPublicQuestion = () => {
		return `${APIService.baseAPI()}question`;
	};

	static apiPublicAnswerById = (id) => {
		return `${APIService.baseAPI()}question/answer/${id}`;
	};

	static apiQuestionMy = () => {
		return `${APIService.baseAPI()}customer/question/my`;
	};

	static apiQuestion = () => {
		return `${APIService.baseAPI()}customer/question`;
	};

	static apiQuestionById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}`;
	};

	// Save - Unsave question
	static apiQuestionSave = () => {
		return `${APIService.baseAPI()}customer/question/saved`;
	};

	static apiQuestionSaveById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}/save`;
	};

	static apiQuestionUnSaveById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}/unsave`;
	};

	// Like - Unlike question
	static apiQuestionLikeById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}/like`;
	};

	static apiQuestionUnLikeById = (id) => {
		return `${APIService.baseAPI()}customer/question/${id}/unlike`;
	};

	// Like - Unlike answer
	static apiAnswerById = (id) => {
		return `${APIService.baseAPI()}customer/answer/${id}`;
	};

	static apiAnswerLikeById = (id) => {
		return `${APIService.baseAPI()}customer/answer/${id}/like`;
	};

	static apiAnswerUnLikeById = (id) => {
		return `${APIService.baseAPI()}customer/answer/${id}/unlike`;
	};

	// DoctorList
	static apiDoctorListPublic = () => {
		return `${APIService.baseAPI()}doctor/list`;
	};

	static apiDoctorList = () => {
		return `${APIService.baseAPI()}customer/doctor/list`;
	};

	static apiDoctorOperationForCustomer = () => {
		return `${APIService.baseAPI()}customer/doctor/operation`;
	};

	static apiDoctorById = (id) => {
		return `${APIService.baseAPI()}customer/doctor/${id}`;
	};

	// Medical-record
	static apiMedicalRecord = () => {
		return `${APIService.baseAPI()}customer/medical-record`;
	};

	static apiMedicalRecordById = (id) => {
		return `${APIService.baseAPI()}customer/medical-record/${id}`;
	};

	// Create payment 
	static apiCreatePaymentUrl = () => {
		return `${APIService.baseAPI()}customer/appointment/create_payment_url`;
	};

// For doctor
	// Doctor Check token
	static apiDoctorCheckToken = () => {
		return `${APIService.baseAPI()}doctor/users/check-token`;
	};

    // Doctor Answer URL
    static apiDoctorAnswer = () => {
        return `${APIService.baseAPI()}doctor/answer`;
    }

    // Doctor Appointment URL
    static apiDoctorAppointment = () => {
        return `${APIService.baseAPI()}doctor/appointment`;
    }

	// Doctor Appointment By Id URL
    static apiDoctorAppointmentById = (id) => {
        return `${APIService.baseAPI()}doctor/appointment/${id}`;
    }

	// Doctor Medical Record By Id URL
	static apiDoctorMedicalRecordId = (id) => {
        return `${APIService.baseAPI()}doctor/medical-record/${id}`;
    }

    // Doctor Question URL
    static apiDoctorMedicalRecord = () => {
        return `${APIService.baseAPI()}doctor/medical-record`;
    }

    // Doctor Profile URL
    static apiDoctorOperation = () => {
        return `${APIService.baseAPI()}doctor/operation`;
    }

    // Doctor Profile URL by id
    static apiDoctorOperationById = (id) => {
        return `${APIService.baseAPI()}doctor/operation/{id}?id=${id}`;
    }
    
    // Doctor Profile URL
    static apiDoctorProfile = () => {
        return `${APIService.baseAPI()}doctor/users/profile`;
    }

    // Doctor Question URL
    static apiDoctorQuestion = () => {
        return `${APIService.baseAPI()}doctor/question`;
    }

	// Doctor Work Place URL
    static apiDoctorWorkPlace = () => {
        return `${APIService.baseAPI()}doctor/work-place`;
    }

	// Doctor Apply Work Place URL
    static apiDoctorWorkPlaceApplyPut = () => {
        return `${APIService.baseAPI()}doctor/work-place/application`;
    }
	
	// Doctor Apply Work Place URL
    static apiDoctorWorkPlaceApply = (id) => {
        return `${APIService.baseAPI()}doctor/work-place/application/${id}`;
    }

	// Doctor Work Place Applied URL
    static apiDoctorWorkPlaceApplied = () => {
        return `${APIService.baseAPI()}doctor/work-place/applied`;
    }

	// Doctor My Work Place URL
    static apiDoctorWorkPlaceMy = () => {
        return `${APIService.baseAPI()}doctor/work-place/my`;
    }

	// Doctor Work Place My URL
    static apiDoctorWorkPlaceManager = () => {
        return `${APIService.baseAPI()}doctor/work-place/manage`;
    }

//////////////////////////////////////////////////////////////////////////////////////////

	// TODO: Both user 

//====================GET SPECIALIZED======================
	// api for Get Specialized
	static getSpecialized( callback ) {
		WebService.sendJsonGET(
			this.apiSpecialized(),
			{
			},
			callback,
		);
	}

	//apiJobPosition
	static getJobPosition( callback ) {
		WebService.sendJsonGET(
			this.apiJobPosition(),
			{
			},
			callback,
		);
	}

	// api for Get Confirm Payment
	static getConfirmPayment( values, callback ) {
		const formData = new FormData();
		formData.append('vnp_Amount', values.vnp_Amount);
		formData.append('vnp_BankCode', values.vnp_BankCode);
		formData.append('vnp_BankTranNo', values.vnp_BankTranNo);
		formData.append('vnp_CardType', values.vnp_CardType);
		formData.append('vnp_OrderInfo', values.vnp_OrderInfo );
		formData.append('vnp_PayDate', values.vnp_PayDate);
		formData.append('vnp_ResponseCode', values.vnp_ResponseCode);
		formData.append('vnp_TmnCode', values.vnp_TmnCode);
		formData.append('vnp_TransactionNo', values.vnp_TransactionNo);
		formData.append('vnp_TransactionStatus', values.vnp_TransactionStatus);
		formData.append('vnp_TxnRef', values.vnp_TxnRef);
		formData.append('vnp_SecureHash', values.vnp_SecureHash);
		// console.log('-----------------')
		// console.log(values)
		WebService.sendJsonGET(
			this.apiConfirmPayment(),
			{
				...values
			},
			callback,
		);
	}

	// Get Answer
	static getAnswer(id, values, callback) {
		const formData = new FormData();
		formData.append('skip', values.skip);
		formData.append('take', values.take);
		formData.append('sortBy', values.keyword);
		WebService.sendJsonGET(
			this.apiAnswer(id),
			{
				formData
			},
			callback,
		);
	}
	
	// api for Get Doctor List Public
	static getDoctorListPublic(values, callback ) {
		const formData = new FormData();
		formData.append('specializedId', values.specializedId);
		formData.append('skip', values.skip);
		formData.append('take', values.take);
		formData.append('wardId', values.wardId);
		formData.append('districtId', values.districtId);
		formData.append('provinceId', values.provinceId);
		WebService.sendJsonGET(
			this.apiDoctorListPublic(),
			{
				formData
			},
			callback,
		);
	}	

	// api for Get Public Question
	static getPublicQuestion( values, callback ) {
		const formData = new FormData();
		formData.append('skip', values.skip);
		formData.append('take', values.take);
		formData.append('keyword', values.keyword);
		formData.append('specializedId', values.specializedId);
		WebService.sendJsonGET(
			this.apiPublicQuestion(),
			{
				formData
			},
			callback,
		);
	}	

  	// TODO: For customer

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

//====================PASSWORD======================

	// api for Change Password
	static changePassword(token, password, newPassword, callback) {
		WebService.sendJsonPUT(
			this.apiChangePassword(),
			{
				jwt : token,
				password,
				newPassword
			},
			callback,
		);
	}

	// api for Forgot Password
	static forgotPassword(token, newPassword, code, type, email, phoneNumber, callback) {
		WebService.sendJsonPUT(
			this.apiForgotPassword(),
			{
				jwt : token,
				newPassword,
				code,
				type,
				email,
				phoneNumber
			},
			callback,
		);
	}

	// api for Forgot Password Sms
	static forgotPasswordMail(email, callback) {
		WebService.sendJsonPOST(
			this.apiForgotPasswordMail(),
			{
				email
			},
			callback,
		);
	}

	// api for Forgot Password Sms
	static forgotPasswordSms(phoneNumber, callback) {
		WebService.sendJsonPOST(
			this.apiForgotPasswordSms(),
			{
				phoneNumber
			},
			callback,
		);
	}
	  
//====================SIGNIGN======================
	// api for SignIn
	static signIn(username, password, callback) {
		WebService.sendJsonPOST(
			this.apiSignIn(),
			{
				username,
				password,
			},
			callback,
		);
	}

	// api for SignIn send code to Sms
	static signInSendCodeToSms(phoneNumber, callback) {
		WebService.sendJsonPOST(
			this.apiSignInSendCodeToSms(),
			{
				phoneNumber
			},
			callback,
		);
	}

	// api for SignIn By Sms
	static signInBySms(phoneNumber, code, callback) {
		WebService.sendJsonPOST(
			this.apiSignInBySms(),
			{
				phoneNumber,
				code
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

	// api for Get code to add phone number
	static getCodeToAddPhoneNumber(token, password, phoneNumber, callback) {
		WebService.sendJsonPUT(
			this.apiGetCodeToAddPhoneNumber(),
			{
				jwt: token,
				password,
				phoneNumber
			},
			callback,
		);
	}

	// api for Add phone number or email
	static addPhoneNumberOrEmail(token, code, callback) {
		WebService.sendJsonPUT(
			this.apiAdd(),
			{
				jwt: token,
				code
			},
			callback,
		);
	}

	// api for Add phone number or email
	static verifyPhoneNumberBeforeAddEmail(token, callback) {
		WebService.sendJsonPUT(
			this.apiVerifyPhoneNumberBeforeAddEmail(),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Get code to add email
	static getCodeToAddEmail(token, password, email, code, callback) {
		WebService.sendJsonPUT(
			this.apiGetCodeToAddEmail(),
			{
				jwt: token,
				password,
				email,
				code
			},
			callback,
		);
	}

	// api for Add relative phonenumber
	static addRelativePhoneNumber(token, phoneNumber, callback ) {
		WebService.sendJsonPUT(
			this.apiAddRelativePhoneNumber(),
			{
				jwt: token,
				phoneNumber
			},
			callback,
		);
	}

	// api for Set Emergency Sms
	static setEmergencySms(token, phoneNumber, content, callback ) {
		WebService.sendJsonPUT(
			this.apiSetEmergencySms(),
			{
				jwt: token,
				phoneNumber,
				content
			},
			callback,
		);
	}

	// api for Set Emergency Sms
	static getEmergencySms(token, callback ) {
		WebService.sendJsonGET(
			this.apiGetEmergencySms(),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Send Emergency Sms
	static sendEmergencySms(token, callback ) {
		WebService.sendJsonPUT(
			this.apiSendEmergencySms(),
			{
				jwt: token
			},
			callback,
		);
	}

//====================SIGNUP======================

	// api for SignUp
	static signUp(values, callback) {
		const formData = new FormData();
		formData.append('registerType', values.registerType);
		formData.append('email', values.email);
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('password', values.password);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('gender', values.gender);
		formData.append('code', values.code);
		WebService.sendJsonPOST(
			this.apiSignUp(),
			{
				formData
			},
			callback,
		);
	}

	// api for get code from register by email
	static getCodeFromMail(email, callback) {
		WebService.sendJsonPOST(
			this.apiSignUpByEmail(),
			{
				email
			},
			callback,
		);
	}

	// api for get code from register by number phone
	static getCodeFromSms(phoneNumber, callback) {
		WebService.sendJsonPOST(
			this.apiSignUpBySms(),
			{
				phoneNumber
			},
			callback,
		);
	}

//====================APPOINTMENT======================

	// api for Post Appointment Form
	static postAppointment(token, values, callback) {
		const formData = new FormData();
		formData.append('guardianId', values.guardianId);
		formData.append('doctorId', values.doctorId);
		formData.append('dayTime', values.dayTime);
		formData.append('description', values.description);
		values.images.forEach((image, index) => {
			formData.append(`images[${index}]`, image);
		});
		formData.append('customerIp', values.customerIp);
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
			this.apiAppointmentById(id),
			{
				jwt: token,
			},
			callback,
		);
	}

	// api for Delete an appoitment by id
	static deleteAppointmentById( token, id, callback ) {
		WebService.sendJsonDELETE(
			this.apiAppointmentById(id),
			{
				jwt: token,
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

	// api for Get Districts
	static getDistricts( id, callback ) {
		WebService.sendJsonGET(
			this.apiDistricts(id),
			{
			},
			callback,
		);
	}

	// api for Get Wards
	static getWards( id, callback ) {
		WebService.sendJsonGET(
			this.apiWards(id),
			{
			},
			callback,
		);
	}
//====================GUARDIAN======================

	// api for Post Guardian
	static postGuardian(token, values, callback ) {
		const formData = new FormData();
		formData.append('guardianName', values.guardianName);
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('gender', values.gender);
		formData.append('birthday', values.birthday);
		formData.append('avatar', values.avatar);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('provinceId', values.provinceId);
		formData.append('address', values.address);
		WebService.sendJsonPOST(
			this.apiGuardian(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Get Guardian
	static getGuardian(token, callback ) {
		WebService.sendJsonGET(
			this.apiGuardian(),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put a Guardian by id
	static putGuardianById( token, id, values, callback ) {
		const formData = new FormData();
		formData.append('guardianName', values.guardianName);
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('gender', values.gender);
		formData.append('birthday', values.birthday);
		formData.append('avatar', values.avatar);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('provinceId', values.provinceId);
		formData.append('address', values.address);
		WebService.sendJsonPUT(
			this.apiGuardianById(id),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Get code verify to Delete Guardian
	static getCodeVerifyGuardian(token, values, callback ) {
		WebService.sendJsonPOST(
			this.apiGuardianVerify(),
			{
				jwt: token,
				id: values.id,
				type: values.type
			},
			callback,
		);
	}

	// api for Delete Guardian
	static deleteGuardian(token, id, code, callback ) {
		WebService.sendJsonPUT(
			this.apiDeleteGuardianById(id),
			{
				jwt: token,
				code
			},
			callback,
		);
	}

	// api for Guardian User
	static postGuardianUser( token, values, callback ) {
		const formData = new FormData();
		formData.append('password', values.password);
		formData.append('guardiantId', values.guardiantId);
		formData.append('type', values.type);
		formData.append('email', values.email);
		formData.append('phoneNumber', values.phoneNumber);
		formData.append('code', values.code);
		formData.append('guardiantPassword', values.guardiantPassword);
		WebService.sendJsonPOST(
			this.apiGuardianUser(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Verify Guardian User
	static verifyGuardianUser( token, values, callback ) {
		const formData = new FormData();
		formData.append('password', values.password);
		formData.append('guardiantId', values.guardiantId);
		formData.append('type', values.type);
		formData.append('email', values.email);
		formData.append('phoneNumber', values.phoneNumber);
		WebService.sendJsonPOST(
			this.apiGuardianUserVerify(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

//====================QUESTION======================

	// // api for Get Public Question
	// static getPublicQuestion( values, callback ) {
	// 	const formData = new FormData();
	// 	formData.append('skip', values.skip);
	// 	formData.append('take', values.take);
	// 	formData.append('keyword', values.keyword);
	// 	formData.append('specializedId', values.specializedId);
	// 	WebService.sendJsonGET(
	// 		this.apiPublicQuestion(),
	// 		{
	// 			formData
	// 		},
	// 		callback,
	// 	);
	// }	

	// api for Get Answer By Id
	static getPublicAnswerById( id, callback ) {
		WebService.sendJsonGET(
			this.apiPublicAnswerById(id),
			{
			},
			callback,
		);
	}	

	// api for Get Question My
	static getQuestionMy(token, callback ) {
		WebService.sendJsonGET(
			this.apiQuestionMy(),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for All Questions
	static getQuestion(token, callback ) {
		WebService.sendJsonGET(
			this.apiQuestion(),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for Post A Question
	static postQuestion(token, values, callback) {
		const formData = new FormData();
		formData.append('title', values.title);
		formData.append('content', values.content);
		values.images.forEach((image, index) => {
			formData.append(`images[${index}]`, image);
		});
		WebService.sendJsonPOST(
			this.apiQuestion(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Put Question By Id
	static putQuestionById(token, id, values, callback ) {
		const formData = new FormData();
		formData.append('title', values.title);
		formData.append('content', values.content);
		values.images?.forEach((image, index) => {
			formData.append(`images[${index}]`, image);
		});
		values.deleteImgs?.forEach((image, index) => {
			formData.append(`deleteImgs[${index}]`, image);
		});
		WebService.sendJsonPUT(
			this.apiQuestionById(id),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

	// api for Delete Question By Id
	static deleteQuestionById(token, id, callback ) {
		WebService.sendJsonDELETE(
			this.apiQuestionById(id),
			{
				jwt: token
			},
			callback,
		);
	}

//====================SAVE - UNSAVE QUESTION======================

	// api for Get Saved Question
	static getSavedQuestion(token, callback ) {
		WebService.sendJsonGET(
			this.apiQuestionSave(),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for Put Question Save By Id
	static putQuestionSaveById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiQuestionSaveById(id),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put Question UnSave By Id
	static putQuestionUnSaveById(token, id, callback ) {
		WebService.sendJsonDELETE(
			this.apiQuestionUnSaveById(id),
			{
				jwt: token
			},
			callback,
		);
	}

//====================LIKE - UNLIKE QUESTION======================

	// api for Put Question Like By Id
	static putQuestionLikeById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiQuestionLikeById(id),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put Question Like By Id
	static putQuestionUnLikeById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiQuestionUnLikeById(id),
			{
				jwt: token
			},
			callback,
		);
	}

//====================LIKE - UNLIKE ANSWER======================

	// api for Get Answer By Id
	static getAnswerById(token, id, callback ) {
		WebService.sendJsonGET(
			this.apiAnswerById(id),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for Put Answer Like By Id
	static putAnswerLikeById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiAnswerLikeById(id),
			{
				jwt: token
			},
			callback,
		);
	}

	// api for Put Answer Like By Id
	static putAnswerUnLikeById(token, id, callback ) {
		WebService.sendJsonPUT(
			this.apiAnswerUnLikeById(id),
			{
				jwt: token
			},
			callback,
		);
	}

//====================DOCTOR - LIST======================
	// // api for Get Doctor List Public
	// static getDoctorListPublic(values, callback ) {
	// 	const formData = new FormData();
	// 	formData.append('specializedId', values.specializedId);
	// 	formData.append('skip', values.skip);
	// 	formData.append('take', values.take);
	// 	formData.append('wardId', values.wardId);
	// 	formData.append('districtId', values.districtId);
	// 	formData.append('provinceId', values.provinceId);
	// 	WebService.sendJsonGET(
	// 		this.apiDoctorListPublic(),
	// 		{
	// 			formData
	// 		},
	// 		callback,
	// 	);
	// }	

	// api for Get Doctor List
	static getDoctorList(token, values, callback ) {
		const formData = new FormData();
		formData.append('specializedId', values.specializedId);
		formData.append('booked', values.booked);
		formData.append('skip', values.skip);
		formData.append('take', values.take);
		formData.append('wardId', values.wardId);
		formData.append('districtId', values.districtId);
		formData.append('provinceId', values.provinceId);
		WebService.sendJsonGET(
			this.apiDoctorList(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}	

	// api for Get Doctor Operation
	static getOperationOfDoctor(token, doctorId , date, callback ) {
		WebService.sendJsonGET(
			this.apiDoctorOperationForCustomer(),
			{
				jwt: token,
				doctorId,
				date
			},
			callback,
		);
	}	

	// api for Get Doctor By Id
	static getDoctorById(token, id, callback ) {
		WebService.sendJsonGET(
			this.apiDoctorById(id),
			{
				jwt: token
			},
			callback,
		);
	}	

//====================MEDICAL - RECORD======================

	// api for Get Medical-records
	static getMedicalRecords(token, values, callback ) {
		const formData = new FormData();
		formData.append('skip', values.skip);
		formData.append('take', values.take);
		formData.append('medicalRecordStatus', values.medicalRecordStatus);
		formData.append('appointmentStatus', values.appointmentStatus);
		formData.append('customerId', values.customerId);
		WebService.sendJsonGET(
			this.apiMedicalRecord(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}	

	// api for Get Medical-record By Id
	static getMedicalRecordById(token, id, callback ) {
		WebService.sendJsonGET(
			this.apiMedicalRecordById(id),
			{
				jwt: token
			},
			callback,
		);
	}	

	// api for Put Answer Like By Id
	static putStatusOfMedicalRecord(token, id, status, callback ) {
		WebService.sendJsonPUT(
			this.apiMedicalRecordById(id),
			{
				jwt: token,
				status
			},
			callback,
		);
	}

//====================CREATE - PAYMENT======================

	// post to create payment url
	static getPaymentUrl(token, values, callback) {
		const formData = new FormData();
		formData.append('id', values.id);
		formData.append('customerIp', values.customerIp);
		WebService.sendJsonPOST(
			this.apiCreatePaymentUrl(),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

////// TODO: For doctor ////////////////////////////////////////////////////////////////////////////////////

//====================CHECK-TOKEN AND SET NEW TOKEN======================

	// api for check-token
	static doctorCheckToken(token, callback) {
		WebService.sendJsonPOST(
			this.apiDoctorCheckToken(),
			{
				jwt : token,
				token
			},
			callback,
		);
	}

	// POST Doctor Answer
	static postDoctorAnswer(token, questionId, content, specializedId, callback) {

		WebService.sendJsonPOST(
			this.apiDoctorAnswer(),
			{
				jwt: token,
				content,
				questionId,
				specializedId
			},
			callback,
		);
	}

	// Get Doctor Appointment
	static getDoctorAppointment(token, callback) {
		WebService.sendJsonGET(
			this.apiDoctorAppointment(),
			{
				jwt: token
			},
			callback,
		);
	}

	// Get Doctor Appointment by id
	static getDoctorAppointmentById(token, id, callback) {
		WebService.sendJsonGET(
			this.apiDoctorAppointmentById(id),
			{
				jwt: token,
			},
			callback,
		);
	}
	
	// Get Doctor Appointment by id
	static putDoctorAppointmentById(token, id, status, callback) {
		WebService.sendJsonPUT(
			this.apiDoctorAppointmentById(id),
			{
				jwt: token,
				status,
			},
			callback,
		);
	}

	// Get Doctor Medical Record
	static getDoctorMedicalRecordById(token, id, values, callback) {
		const formData = new FormData();
		formData.append('skip', values.skip);
		formData.append('take', values.take);
		WebService.sendJsonGET(
			this.apiDoctorMedicalRecordId(id),
			{
				jwt: token,
				id,
				formData
			},
			callback,
		);
	}

	// Put Doctor Medical Record
	static putDoctorMedicalRecordById(token, id, values, callback) {
		const formData = new FormData();
		formData.append('height', values.height);
		formData.append('weight', values.weight);
		formData.append('bodyTemperature', values.bodyTemperature);
		formData.append('bloodPressure', values.bloodPressure);
		formData.append('heartBeat', values.heartBeat);
		formData.append('bloodGroup', values.bloodGroup);
		formData.append('diagnostic', values.diagnostic);
		formData.append('note', values.note);
		formData.append('medicalExpense', values.medicalExpense);
		WebService.sendJsonPUT(
			this.apiDoctorMedicalRecordId(id),
			{
				jwt: token,
				formData
			},
			callback,
		);
	}

    // Get Doctor Operation
    static getDoctorOperation(token, callback) {
        WebService.sendJsonGET(
			this.apiDoctorOperation(),
			{
				jwt: token
			},
			callback,
		);
    }

	// Get Doctor Operation by id
    static getDoctorOperationById(token, id, callback) {
        WebService.sendJsonGET(
			this.apiDoctorOperationById(id),
			{
				jwt: token,
				id
			},
			callback,
		);
    }

    // Put Doctor Operation
    static putDoctorOperation(token, values, callback) {
		const formData = new FormData();
		if(values.addList){
			values.addList.forEach((e, index) => {
				formData.append(`addList[${index}]`, JSON.stringify(e));
			});
		}
		if(values.updateList){
			values.updateList.forEach((e, index) => {
				formData.append(`updateList[${index}]`, JSON.stringify(e));
			});
		}
		if(values.deleteList){
			values.deleteList.forEach((e, index) => {
				formData.append(`deleteList[${index}]`, JSON.stringify(e));
			});
		}
		formData.append('id', values.id);
        WebService.sendJsonPUT(
			this.apiDoctorOperation(),
			{
				jwt: token,
				formData
			},
			callback,
		);
    }

    // Get Doctor Profile
    static getDoctorProfile(token, callback) {
        WebService.sendJsonGET(
			this.apiDoctorProfile(),
			{
				jwt: token
			},
			callback,
		);
    }

    // Put Doctor Profile
    static putDoctorProfile(token, values, callback) {
		const formData = new FormData();
		formData.append('firstName', values.firstName);
		formData.append('lastName', values.lastName);
		formData.append('gender', values.gender);
		formData.append('birthday', values.birthday);
        WebService.sendJsonPUT(
			this.apiDoctorProfile(),
			{
				jwt: token
			},
			callback,
		);
    }

	// Get Doctor Question
    static getDoctorQuestion(token, callback) {
        WebService.sendJsonGET(
			this.apiDoctorQuestion(),
			{
				jwt: token
			},
			callback,
		);
    }

	// Get Doctor Work Place
    static getDoctorWorkPlace(token, values, callback) {
		let query = {}
		if(values.skip){
			query = {
				...query,
				skip: values.skip
			}
		}
		if(values.take){
			query = {
				...query,
				take: values.take
			}
		}
		if(values.keyword){
			query = {
				...query,
				keyword: values.keyword
			}
		}
		if(values.status){
			query = {
				...query,
				status: values.status
			}
		}

        WebService.sendJsonGET(
			this.apiDoctorWorkPlace(),
			{
				jwt: token,
				...query
			},
			callback,
		);
    }
	
	// Get Doctor Apply Work Place
    static putDoctorWorkPlaceApply(token, operationId, status, callback) {
        WebService.sendJsonPUT(
			this.apiDoctorWorkPlaceApplyPut(),
			{
				jwt: token,
				operationId,
				status
			},
			callback,
		);
    }

	// Get Doctor Apply Work Place
    static postDoctorWorkPlaceApply(token, workPlaceId, jobPositionId, callback) {
        WebService.sendJsonPOST(
			this.apiDoctorWorkPlaceApply(workPlaceId),
			{
				jwt: token,
				workPlaceId,
				jobPositionId
			},
			callback,
		);
    }
	
	// Get Doctor Work Place Applied
    static getDoctorWorkPlaceApplied(token, workPlaceId, status, callback) {
        WebService.sendJsonGET(
			this.apiDoctorWorkPlaceApplied(),
			{
				jwt: token,
				workPlaceId,
				status,
			},
			callback,
		);
    }

	// Get Doctor Work Place
    static getDoctorWorkPlaceMy(token, callback) {
        WebService.sendJsonGET(
			this.apiDoctorWorkPlaceMy(),
			{
				jwt: token
			},
			callback,
		);
    }

	// Get Doctor Work Place
    static getDoctorWorkPlaceManager(token, status, data, callback) {
		let query = {}
		if(data.skip){
			query = {
				...query,
				skip: data.skip
			}
		}
		if(data.take){
			query = {
				...query,
				take: data.take
			}
		}
		if(data.keyword){
			query = {
				...query,
				keyword: data.keyword
			}
		}

        WebService.sendJsonGET(
			this.apiDoctorWorkPlaceManager(),
			{
				jwt: token,
				status,
				...query
			},
			callback,
		);
    }

	// Post Doctor Work Place
    static postDoctorWorkPlace(token, values, callback) {
		const formData = new FormData();
		formData.append('name', values.name);
		formData.append('address', values.address);
		formData.append('images', values.images);

        WebService.sendJsonPOST(
			this.apiDoctorWorkPlace(),
			{
				jwt: token,
				formData
			},
			callback,
		);
    }

	// Put Doctor Work Place
    static putDoctorWorkPlace(token, values, callback) {
		const formData = new FormData();
		formData.append('id', values.id);
		formData.append('status', values.status);
		formData.append('name', values.name);
		formData.append('address', values.address);

        WebService.sendJsonPUT(
			this.apiDoctorWorkPlace(),
			{
				jwt: token,
				formData
			},
			callback,
		);
    }
}