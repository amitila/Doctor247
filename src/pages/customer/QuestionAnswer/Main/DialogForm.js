import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppointmentForm from './AppointmentForm';

export default function DialogForm(props) {
	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const {name, id} = props;

	return (
		<div>
			<Button variant="contained" color="primary" onClick={handleClickOpen} >
				Đặt khám
			</Button>
			<Dialog open={open}>
				<DialogTitle>Đặt khám với bác sĩ <u style={{color: 'blue'}}>{name}</u></DialogTitle>
				<DialogContent>
					<DialogContentText>
						Bạn vui lòng hoàn thành đơn đặt khám với bác sĩ để được khám bệnh nhanh chóng!
					</DialogContentText>
					<AppointmentForm id={id} handleClose={handleClose}/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Hủy đăng ký</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
