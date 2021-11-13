import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import AppointmentForm from './AppointmentForm';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';

export default function DialogForm(props) {
	const [open, setOpen] = React.useState(false);
	const [isHaveChange, setIsHaveChange] = React.useState(true);
    const [infoOfDoctor, setInfoOfDoctor] = React.useState('');

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const {name, id} = props;

	const getDayOfWeek = (day) => {
        let dayOfWeek;
        // eslint-disable-next-line default-case
        switch (day) {
            case 'SUNDAY':
                dayOfWeek = 0;
                break;
            case 'MONDAY':
                dayOfWeek = 1;
                break;
            case 'TUESDAY':
                dayOfWeek = 2;
                break;
            case 'WEDNESDAY':
                dayOfWeek = 3;
                break;
            case 'THURSDAY':
                dayOfWeek = 4;
                break;
            case 'FRIDAY':
                dayOfWeek = 5;
                break;
            case 'SATURDAY':
                dayOfWeek = 6;
                break;
            default: 
                dayOfWeek = -1;
          }
        return dayOfWeek;
    }

	React.useEffect(() => {
		if(isHaveChange) {
			const token = getToken();
			APIService.getDoctorById(
				token,
				id,
				(success, json) => {
					if (success && json.result) {
						const item = json.result;
						setInfoOfDoctor({
							id: item.doctor.id,
							avatar: item.doctor.avatarURL,
							name: item.doctor.firstName +' '+ item.doctor.lastName,
							specialist: item.doctor.specialized.name,
							phone:"0257296632",
							year_exp:"5 năm kinh nghiệm",
							workplace: item.doctor.operation.map(x => {return x.workplace.name}),
							operations: item.doctor.operation.map(x => {return {
								workplace: x.workplace.name + ', ' + x.workplace.address,
								patientPerHalfHour: x.patientPerHalfHour === null ? 0 : x.patientPerHalfHour,
								operationHours: x.operationHour.map(y => {return {
									day: y.day,
									dayOfWeek: getDayOfWeek(y.day),
									startTime: y.startTime,
									endTime: y.endTime,
									startTimeVN: new Date(y.startTime),
									endTimeVN: new Date(y.endTime),
									startHour: new Date(y.startTime).getHours() +'h'+ new Date(y.startTime).getMinutes(),
									endHour: new Date(y.endTime).getHours() +'h'+ new Date(y.endTime).getMinutes(),
								}})
							}}),
						})
						setIsHaveChange(false);
						return console.log("thành công");
					} else {
						return console.log("lỗi server");
					}
				}
			)
		}
	},[id, isHaveChange])

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
					<AppointmentForm infoOfDoctor={infoOfDoctor} handleClose={handleClose}/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Hủy đăng ký</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
