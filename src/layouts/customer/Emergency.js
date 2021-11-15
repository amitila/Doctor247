import * as React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NoSsr from '@mui/material/NoSsr';
import {
	createTheme,
	ThemeProvider as MuiThemeProvider,
} from '@mui/material/styles';
import { pink, red } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';
import SpeedDial from '@mui/material/SpeedDial';
import CallIcon from '@mui/icons-material/Call';
import { styled as STYLED } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import APIService from '../../utils/APIService';
import getToken from '../../helpers/getToken';

const customTheme = createTheme({
	palette: {
		primary: pink,
		secondary: red,
	},
});

const StyledAvatar = styled(Avatar)`
	${({ theme }) => `
		cursor: pointer;
		background-color: ${theme.palette.primary.main};
		transition: ${theme.transitions.create(['background-color', 'transform'], {
			duration: theme.transitions.duration.standard,
		})};
		&:hover {
			background-color: ${theme.palette.secondary.main};
			transform: scale(1.6);
		}
	`}
`;

const StyledBadge = STYLED(Badge)(({ theme }) => ({
	'& .MuiBadge-badge': {
	  backgroundColor: 'red',
	  color: 'red',
	  boxShadow: `0 0 0 2px ${theme.palette.error.light}`,
	  '&::after': {
		position: 'absolute',
		top: -32,
		left: -32,
		width: '550%',
		height: '550%',
		borderRadius: '100%',
		animation: 'ripple 1.5s infinite ease-in-out',
		border: '10px solid currentColor',
		content: '""',
	  },
	},
	'@keyframes ripple': {
	  '0%': {
		transform: 'scale(.8)',
		opacity: 1,
	  },
	  '100%': {
		transform: 'scale(2.4)',
		opacity: 0,
	  },
	},
  }));

export default function Emergency() {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const [call, setCall] = React.useState('call_sms');
	const [openAddPhone, setOpenAddPhone] = React.useState(false);
	const [phoneNumber, setPhoneNumber] = React.useState('');
	const [sms, setContent] = React.useState('');

	React.useEffect(() => {
		const token = getToken();
		if(token) {
			APIService.getProfile(token, (success, json) => {
				if(success && json.result){
					// console.log(json.result.customer.relativePhoneNumber)
					return setPhoneNumber(json.result.customer.relativePhoneNumber)
				}
			}) 
		}
	},[])

	const handleAddRelativePhoneNumber = () => {
        const token = getToken();
        APIService.addRelativePhoneNumber(
            token,
            phoneNumber,
            (success, json) => {
                if (success && json.result) {
					setOpenAddPhone(false)
                    return console.log("Thêm thành công!")
                } else {
                    return console.log(json.error)
                }
            }
        )
    }

	const handleAddRelativePhoneNumberAndSms = () => {
        const token = getToken();
        APIService.setEmergencySms(
            token,
            phoneNumber,
			sms,
            (success, json) => {
                if (success && json.result) {
					setOpenAddPhone(false)
                    return console.log("Thêm số điện thoại và nội dung thông điệp khẩn cấp thành công!")
                } else {
                    return console.log(json.error)
                }
            }
        )
    }

	const handleSendEmergencySms = () => {
        const token = getToken();
        APIService.sendEmergencySms(
            token,
            (success, json) => {
                if (success && json.result) {
					handleClose()
                    return alert("Đã phát đi thông điệp khẩn cấp!")
                } else {
                    return console.log(json.error)
                }
            }
        )
    }

	return (
		<>
			<SpeedDial
				ariaLabel="SpeedDial basic example"
				FabProps={{ size: "large", style: { backgroundColor: "#ff9100" } }}
				sx={{ position: 'fixed', bottom: 16, right: 16 }}
				icon={<NoSsr>
					<MuiThemeProvider theme={customTheme}>
						<ThemeProvider theme={customTheme}>
							<StyledBadge
								overlap="circular"
								anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
								variant="dot"
								onClick={handleClickOpen}
							>
								<StyledAvatar>
									<CallIcon />
								</StyledAvatar>
							</StyledBadge>
						</ThemeProvider>
					</MuiThemeProvider>
				</NoSsr>}
			>

			</SpeedDial>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>
					<AddIcCallIcon style={{color: 'red'}}/>{' Gọi khẩn cấp ========>>>'}
					<Button style={{float: 'right'}} onClick={()=>setOpenAddPhone(!openAddPhone)}>{openAddPhone ? 'Quay về' : 'Thêm người thân'}</Button>
				</DialogTitle>
				{
					openAddPhone ? 
						<p style={{padding: 15, textAlign: 'center'}}>
							<TextField
								// autoFocus
								required
								margin="dense"
								id="phoneNumber"
								name="phoneNumber"
								value={phoneNumber}
								label="Số điện thoại người thân"
								type="number"
								fullWidth
								variant="standard"
								onChange={(e)=>setPhoneNumber(e.target.value)}
							/>
							<Button onClick={handleAddRelativePhoneNumber}>
								{phoneNumber ? 'Xác nhận đổi' : 'Xác nhận thêm' }
							</Button>
							<TextField
								// autoFocus
								required
								margin="dense"
								id="sms"
								name="sms"
								value={sms}
								label="Thông điệp khẩn cấp"
								type="text"
								fullWidth
								variant="standard"
								onChange={(e)=>setContent(e.target.value)}
							/>
							<Button onClick={handleAddRelativePhoneNumberAndSms}>
								{sms ? 'Đổi thông điệp' : 'Thêm thông điệp' }
							</Button>
						</p> 
						:
						<>
							<DialogContent>
								<DialogContentText>
									Đây là chức năng vừa cho phép bạn <b>gọi cấp cứu</b> trong trường hợp khẩn cấp và <b>gửi tin nhắn</b> thông báo về cho người thân của bạn
									trong trường hợp khẩn cấp!
								</DialogContentText>
								<FormControl component="fieldset">
									<RadioGroup
										aria-label="emergency"
										defaultValue="call_sms"
										name="radio-buttons-group"
										value={call}
										onChange={(e)=>setCall(e.target.value)}
									>
										<FormControlLabel value="call_sms" control={<Radio />} label="Gọi khẩn cấp và thông báo cho người thân" />
										<FormControlLabel value="sms" control={<Radio />} label="Chỉ thông báo cho người thân" />
										<FormControlLabel value="call" control={<Radio />} label="Chỉ gọi khẩn cấp" />
									</RadioGroup>
								</FormControl>
							</DialogContent>
							<DialogActions>
								<Button onClick={handleClose}>Thoát</Button>
								{
									call === 'sms' ? 
										<Button onClick={handleSendEmergencySms}>Gửi thông báo</Button>
										:
										<Button onClick={handleSendEmergencySms}><a style={{textDecoration: 'none', color: 'red', fontWeight: 'bold'}} href="tel:115">Gọi ngay</a></Button>
								}
							</DialogActions>
						</>
				}
			</Dialog>
		</>
	);
}
