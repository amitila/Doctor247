import React from 'react';
import { useDispatch } from "react-redux";
import { updateId, updateRole, updateName, updateAvatar, updateMyid } from '../store/userSlice';
import APIService from '../utils/APIService';
import Cookies from 'universal-cookie';
import Alert from '@mui/material/Alert';

const CheckToken = () => {
    console.log("checkToken");
	const dispatch = useDispatch();

	const cookies = new Cookies();
	const [token, setToken] = React.useState(cookies.get("token"));

	const [status, setStatus] = React.useState(false);
	React.useEffect(() => {
		if(token) {
			APIService.checkToken(token, (success, json) => {
				if(success && json.result){
					setToken(json.result.token);
					dispatch(updateId(json.result.id));
					dispatch(updateRole(json.result.role));
					dispatch(updateName(json.result.customer.lastName));
					dispatch(updateAvatar(json.result.customer.avatarURL));
					dispatch(updateMyid(json.result.customer.id));
				} else {
					// setStatus(true);
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
export default CheckToken;