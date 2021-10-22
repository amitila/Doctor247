import React, { useState } from "react";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/auth';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        border: "#303F9F solid 2px",
        borderRadius: 5,
        padding: '5px 0px 0px 10px',
    },
}));

export default function AuthPhone() {
	var firebaseConfig = {
		apiKey: "AIzaSyBDWZcUa06wmavlixK3EowB2yCLpcY42Is",
		authDomain: "phoneverify-db763.firebaseapp.com",
		databaseURL: "https://phoneverify-db763.firebaseio.com",
		projectId: "phoneverify-db763",
		storageBucket: "phoneverify-db763.appspot.com",
		messagingSenderId: "565311308222",
		appId: "1:565311308222:web:5fc82a97c0d23b10e879ef"
	};
	firebase.initializeApp(firebaseConfig);
	const auth = firebase.auth();
	auth.useEmulator("http://localhost:9099");
	const classes = useStyles();
	const [viewOtpForm, setViewOtpForm] = useState(false);
	const [state, setState] = useState({
		phone: '',
		otp: ''
	});
	
	const handleChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		setState(prevState => ({ ...prevState, [name]: value }));
	}

	React.useEffect(() => {
		window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
			"recaptcha-container", {
				size: "invisible",
				callback: function(response) {
					console.log("Captcha Resolved");
				},
				defaultCountry: "VN",
			}
		);
	}, []);

	const loginSubmit = (e) => {
		e.preventDefault();
		let phone_number = "+84" + state.phone;
		const appVerifier = window.recaptchaVerifier;
		console.log(phone_number);
		auth
			.signInWithPhoneNumber(phone_number, appVerifier)
			.then((confirmationResult) => {
				// SMS sent. Prompt user to type the code from the message, then sign the
				// user in with confirmationResult.confirm(code).
				console.log("otp sent");
				setViewOtpForm(true);
				window.confirmationResult = confirmationResult;
				// ...
			})
			.catch((error) => {
				// Error; SMS not sent
				// ...
				alert(error.message);
			});
	};

	const otpSubmit = (e) => {
		e.preventDefault();
		let opt_number = state.otp;
		window.confirmationResult
			.confirm(opt_number)
			.then((confirmationResult) => {
				console.log(confirmationResult);
				console.log("success");
				alert("Xác thực thành công");
				// window.open("/", "_self");
			})
			.catch((error) => {
				// User couldn't sign in (bad verification code?)
				alert(error.message);
			});
	};

	return (
		<Container component="main" maxWidth="xs" style={{textAlign: "center", marginTop: 20}}>
			<div id="recaptcha-container"></div>
			<Typography component="h1" variant="h5">
				Đăng nhập bằng điện thoại
			</Typography>
			<p className="sub-text">Vui lòng nhập số điện thoại</p>
			{!viewOtpForm ? (
				<div className={classes.paper}>
					<form className={classes.form} id="loginForm" onSubmit={loginSubmit}>
						<TextField
							className={classes.textField}
							variant="standard"
							margin="normal"
							required
							fullWidth
							id="phone"
							name="phone"
							value={state.phone}
							label="Số điện thoại"
							type="number"
							autoComplete="false"
							onChange={handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Xác nhận
						</Button>
					</form>
				</div>
				) : (
				<div className={classes.paper} onSubmit={otpSubmit}>
					<form className={classes.form} id="otpForm">
						<TextField
							className={classes.textField}
							variant="standard"
							margin="normal"
							required
							fullWidth
							id="otp"
							name="otp"
							value={state.otp}
							label="Mã OTP"
							type="number"
							autoComplete="false"
							onChange={handleChange}
						/>
						<Button
							type="submit"
							fullWidth
							variant="contained"
							color="primary"
							className={classes.submit}
						>
							Xác thực
						</Button>
					</form>
				</div>
			)}
		</Container>
	);
};
