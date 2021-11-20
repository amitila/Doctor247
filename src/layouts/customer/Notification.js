import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { useHistory } from 'react-router-dom';
import { Badge } from '@mui/material';
import APIService from '../../utils/APIService';
import getToken from '../../helpers/getToken';

var notificationCards = [];
var status = 'PENDING';
const token = getToken();
const appointmentList = [];
APIService.getAppointment(
	token,
	{
	},
	(success, json) => {
		if (success && json.result) {
			json.result.map(item => {
				return item.status === status && getDateTime(new Date()) === getDateTime(new Date(item.day)) ? appointmentList.push(item) : '';
			})
			notificationCards = appointmentList?.map(item => {
				return {
					title: `Lịch khám số ${item.id} - ngày ${getDateTime(new Date(item.day))}`,
					content: `Hôm nay bạn có lịch khám với bác sĩ ${item.doctor.firstName + ' ' + item.doctor.lastName} vào lúc ${getTime(new Date(item.day))} !`,
					person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
				}
			})
			return console.log("thành công");
		} else {
			return console.log("Lỗi server!");
		}
	})

const getDateTime = (dmy) => {
	const dd = dmy.getDate();
	const mm = dmy.getMonth() + 1;
	const yyyy = dmy.getFullYear();
	return (dd + '/' + mm + '/' + yyyy).toString();
}

const getTime = (hm) => {
	let hour = hm.getHours();
	let minute = hm.getMinutes();
	if (minute.toString().length === 1) {
		minute = '0' + minute;
	}
	return (hour + ' : ' + minute).toString();
}

export default function Notification() {
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	const history = useHistory();

	return (
		<div>
			<div
				id="basic-button"
				aria-controls="basic-menu"
				aria-haspopup="true"
				aria-expanded={open ? 'true' : undefined}
				onMouseEnter={handleClick}
			>
				<Badge badgeContent={notificationCards.length} color="error">
					<NotificationsActiveIcon style={{color: 'blue'}} />
				</Badge>
			</div>
			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					'aria-labelledby': 'basic-button',
				}}
				style={{ maxWidth: 500}}
			>
				{
					notificationCards.map(item => {
						return <MenuItem onClick={()=>history.push('/notification')} ><NotificationsActiveIcon/>{' '}{item.title}</MenuItem>
					})
				}
			</Menu>
		</div>
	);
}
