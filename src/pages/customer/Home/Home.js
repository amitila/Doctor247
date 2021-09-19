import React from 'react';
import { Link } from 'react-router-dom';
import './../../../App.css';
import { useSelector } from "react-redux";
import { selectEmail, selectPassword, selectProvince } from '../../../store/userSlice';

export default function Home() {
	// Select username from store
	const email = useSelector(selectEmail);
	const password = useSelector(selectPassword);
	const province = useSelector(selectProvince);

	return (
		<div className="header" >
			<h2>Chào mừng bạn có email là <u>{email ? email : "chưa đăng nhập"}</u>  đã đến với Ứng dụng kết nối bác sĩ trực tuyến Doctor247</h2>
			<h2>Mật khẩu của bạn là <u>{password ? password : "chưa đăng nhập"}</u>. Vui lòng đổi lại nhen hihi!!!</h2>
			<h2>Ban ở tỉnh / thành phố {province} </h2>
			<Link to="/signin">Log out</Link>
		</div>
	);
}
