import React from 'react';
import { Link } from 'react-router-dom';
import './../../../App.css';
import { useDispatch } from "react-redux";
import { updateName } from '../../../store/userSlice';
import APIService from '../../../utils/APIService';
import Cookies from 'universal-cookie';
import Alert from '@mui/material/Alert';

export default function Home() {
	const dispatch = useDispatch();

	const [state, setState] = React.useState({
		email: '',
		role: '',
		id: '',
		name: ''
	});

	const cookies = new Cookies();
	const [token, setToken] = React.useState(cookies.get("token"));
	// const onCheckToken = () => {
    //     APIService.checkToken(token, (success, json) => {
    //         if(success && json.result){
	// 			setToken(json.result.token);
    //         } else {
    //             console.log("Thất bại");
    //         }
    //     }) 
    // }

	React.useEffect(() => {
		if(token) {
			APIService.checkToken(token, (success, json) => {
				if(success && json.result){
					setToken(json.result.token);
					setState({
						email: json.result.email,
						role: json.result.role,
						id: json.result.id,
						name: json.result.customer.lastName
					});
					dispatch(updateName(json.result.customer.lastName));
				} else {
					return document.getElementById("alert").innerHTML = <Alert severity="error">Phiên đã hết hạn, bạn vui lòng đăng nhập lại!</Alert>;
				}
			}) 
		}
	}, [dispatch, token]);

	return (
		<div className="header" >
			{/* <button onClick={onCheckToken} >
				Check token
			</button> */}
			<div id="alert">hihi</div>
			<h2>Chào mừng bạn có email là <u>{state.email ? state.email : "chưa đăng nhập"}</u>  đã đến với Ứng dụng kết nối bác sĩ trực tuyến Doctor247</h2>
			<h2>Vai trò của bạn trong ứng dụng này là <u>{state.role ? (state.role === "CUSTOMER" ? "Khách" : "") : "chưa đăng nhập"}</u>.</h2>
			<Link to="/signin">Log out</Link>
		</div>
	);
}
