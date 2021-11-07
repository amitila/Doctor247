import * as React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { useHistory } from 'react-router-dom';
import { Badge } from '@mui/material';

const notificationCards = [
	{
		title: 'Thông báo về việc tiêm phòng Covid 19',
		content: "Hiện nay, Việt Nam đã nhận được 50 triệu liều vacxin Astrazenica...",
		person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
	},
	{
		title: 'Thông báo về việc người dân trở lại TP.HCM sau 30/9',
		content: `Thành phố Hồ Chí minh vừa công bố hết dịch và đang ra chính sách để người dân quay lại TP.HCM làm việc sau ngày 30/9...`,
		person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
	},
	{
		title: 'Thông báo về việc trở lại học tập',
		content: 'Cả nước đang hướng về ngày toàn quốc trở lại học tập sau bao tháng giãn cách xã hội...',
		person: 'https://img.lovepik.com/original_origin_pic/19/01/03/f4d5c7c1c9ff025b2b70bfcd15031d2c.png_wh860.png',
	},
];

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
