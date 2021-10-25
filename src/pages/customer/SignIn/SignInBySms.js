import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import APIService from "../../../utils/APIService";
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import { updateRole, updatePhone } from "../../../store/userSlice";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { DoctorContext } from "../../doctor/DoctorProvider";

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

export default function SignInBySms() {

	const classes = useStyles();
	const [viewOtpForm, setViewOtpForm] = useState(false);
	const [state, setState] = useState({
		phone: '',
		otp: ''
	});
	const cookies = new Cookies();

	const { setUserId } = useContext(DoctorContext);
	
	const handleChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		setState(prevState => ({ ...prevState, [name]: value }));
	}

	const loginSubmit = (e) => {
		e.preventDefault();
		let phoneNumber = state.phone;

		if(phoneNumber === '') {
            alert("Bạn chưa nhập số điện thoại!")
        }
        else {
            APIService.signInSendCodeToSms(phoneNumber, (success, json) => {
                if (success && json.result) {
					setViewOtpForm(true);
                    return alert("Vui lòng kiểm tra tin nhắn!")
                } else {
                    return alert("Không gửi được!")
                }
            })
        }
	};

	const history = useHistory();
    const dispatch = useDispatch();

	const otpSubmit = (e) => {
		e.preventDefault();
		let phoneNumber = state.phone;
		let code = state.otp;
		
		if(code === '') {
            alert("Bạn chưa nhập mã OTP!")
        }
        else {
            APIService.signInBySms(phoneNumber, code, (success, json) => {
                if (success && json.result) {
					// setUserId(json.result.id.toString());
                	dispatch(updateRole(json.result.role));
					dispatch(updatePhone(phoneNumber));
					const timestamp = new Date().getTime();
					const expire = timestamp + (60*60*24*1000*3);
					const expireDate = new Date(expire);
					cookies.set("token", json.result.token, {path: '/', expires: expireDate });
					// return history.push("/home");
					if(json.result.role === "CUSTOMER"){
						return history.push("/home");
					}
					else if(json.result.role === "DOCTOR"){
						setUserId(json.result.doctor.id.toString());
						return history.push("/doctor/home");
					}
                } else {
                    return alert("Đã xảy ra lỗi đăng nhập!")
                }
            })
        }
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
