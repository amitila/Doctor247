import React from 'react';
import { useDispatch } from "react-redux";
import { updateId, updateRole, updateName, updateAvatar } from '../store/userSlice';
import APIService from '../utils/APIService';
import Cookies from 'universal-cookie';
import Alert from '@mui/material/Alert';

const DoctorCheckToken = () => {
    console.log("doctorCheckToken");
	const dispatch = useDispatch();

	const cookies = new Cookies();
	const [token, setToken] = React.useState(cookies.get("token"));

	const [status, setStatus] = React.useState(false);
	React.useEffect(() => {
		if(token) {
			APIService.doctorCheckToken(token, (success, json) => {
				if(success && json.result){
					setToken(json.result.token);
					dispatch(updateId(json.result.id));
					dispatch(updateRole(json.result.role));
					dispatch(updateName(json.result.customer.lastName));
					dispatch(updateAvatar(json.result.customer.avatarURL));
				} else {
					setStatus(true);
				}
			}) 
		}
	}, [dispatch, token]);

	return (
		<div className="header" >
			{
				status ? <Alert severity="error">Phiên đã hết hạn, bạn vui lòng đăng nhập lại!</Alert> : ''
			}
		</div>
	);
}
export default DoctorCheckToken;