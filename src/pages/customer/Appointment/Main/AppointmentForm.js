import { makeStyles, TextareaAutosize, TextField } from '@material-ui/core'
import React, { useEffect } from 'react';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Autocomplete from '@material-ui/lab/Autocomplete';
import PatientCard from './PatientCard';
import Alert from '@material-ui/lab/Alert';
import UploadImage from '../../../../components/UploadImage';

const useStyles = makeStyles((theme) => ({
	textSize: {
		width: '100%',
	},
	paper: {
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: '100%',
		margin: "auto",
		border: "#303F9F double 5px",
		borderRadius: 5,
		padding: '10px',
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
		backgroundColor: 'orange',
	},
	title: {
		textAlign: "center",
	},
	dropzone: {
		heigh: "5px",
	},
	autocomplete: {
		marginBottom: "20px",
	},
	clear: {
		backgroundColor: 'orange',
		color: 'white',
		"&:hover": {
			backgroundColor: 'orange',
		}
	}
}));

const bookingTime = [
	'07h30 - 08h00',
	'08h30 - 09h00',
	'09h30 - 10h00',
	'10h30 - 11h00',
	'11h00 - 11h30',
	'11h30 - 12h00',
	'13h00 - 13h30',
	"13h30 - 14h00",
	'14h00 - 14h30',
	'14h30 - 15h00',
	'15h00 - 15h30',
	'15h30 - 16h00',
	'16h00 - 16h30',
	"16h30 - 17h00",
];

const doctorList = [
	{ name: 'Nguyễn Đức Thăng', id: 1 },
	{ name: 'Nguyễn Mai Phương Nhung', id: 2 },
	{ name: 'Hồ Thủy Tiên', id: 1 },
	{ name: 'Đào Dương Long', id: 2 },
	{ name: 'Lô Vỹ Oanh', id: 1 },
];

export default function AppointmentForm(props) {

	const [state, setState] = React.useState({
		id: '',
		name: '',
		date: '',
		hour: '',
		doctor: '',
		description: '',
		imagesView: [],
		guardianId: '',
		doctorId: '',
		dayTime: '',
		imagesSend: [],
	});

	const onCloseForm = (event) => {
		props.onCloseForm();
	}

	const onChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		// if(name === 'status') {
		// 	value = target.value === 'true' ? true : false;
		// }
		setState(prevState => ({ ...prevState, [name]: value, dayTime: getDateTime() }));
		console.log("onchange: ");
		console.log(state);
	}

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(state);
		props.onSubmit(state);
		//Clear and Close form
		onClear();
		onCloseForm();
	}

	const onClear = () => {
		setState({
			id: '',
			name: '',
			date: '',
			hour: '',
			doctor: '',
			description: '',
			imagesView: [],
			guardianId: '',
			doctorId: '',
			dayTime: '',
			imagesSend: [],
		});
		setNumber(4);
	}

	const classes = useStyles();
	const onSetAttribute = (name, id) => {
		setState(prevState => ({ ...prevState, name: name, guardianId: id }));
	}

	const handleChangeDoctor = (e, newValue) => {
		setState({ ...state, doctor: newValue? newValue.name : '', doctorId: newValue? newValue.id : '' });
	}

	const [inputHour, setInputHour] = React.useState(state.hour);
	const [inputDoctor, setInputDoctor] = React.useState(state.doctor);

	useEffect(() => {
		setInputHour(state.hour);
	}, [state.hour]);

	useEffect(() => {
		setInputDoctor(state.doctor);
	}, [state.doctor]);

	// get current time
	const getCurrentDate = () => {
		var dateObj = new Date();
		var month = dateObj.getMonth() + 1; //months from 1-12
		var day = dateObj.getDate();
		var year = dateObj.getFullYear();
		return (year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
	}
	
	// add images
	const [number, setNumber] = React.useState(4);
	if(number < 0){
		setNumber(4);
		setState({ ...state, imagesView: [], imagesSend: [] });
	}
	const handleChangeImages1 = (view, send) => {
		state.imagesView.push(view);
		state.imagesSend.push(send);
		setNumber(number - 1);
		console.log(state);
	}
	const handleChangeImages2 = (view, send) => {
		state.imagesView.push(view);
		state.imagesSend.push(send);
		setNumber(number - 1);
		console.log(state);
	}
	const handleChangeImages3 = (view, send) => {
		state.imagesView.push(view);
		state.imagesSend.push(send);
		setNumber(number - 1);
		console.log(state);
	}
	const handleChangeImages4 = (view, send) => {
		state.imagesView.push(view);
		state.imagesSend.push(send);
		setNumber(number - 1);
		console.log(state);
	}

	const getDateTime = () => {
		var date = new Date();
		var day = state.date;
		var time = state.hour;
		if(day) {
			date.setDate(parseInt(day.slice(8,10)));
			date.setMonth(parseInt(day.slice(5,7) -1));
			date.setFullYear(parseInt(day.slice(0,4)));
		}
		if(time) {
			date.setHours(parseInt(time.slice(0,2)));
			date.setMinutes(parseInt(time.slice(3,5)));
			date.setSeconds(0);
		}
		return date;
	}
	
	return (
		<div className="panel panel-warning">
			<div className="panel-heading">
				<h3 className="panel-title">
					{state.id !== '' ? 'Chỉnh sửa lịch hẹn' : 'Thêm lịch hẹn'}
					<span
						className="fa fa-times-circle text-right"
						onClick={onCloseForm}
					></span>
				</h3>
			</div>
			<div className="panel-body">
				<form onSubmit={onSubmit} className={classes.paper} >
					<Typography variant="h6" className={classes.title} >
						Đặt lịch khám
					</Typography>

					<Grid container spacing={5}>
						<Grid item xs={12} sm={3} className={classes.title}>
							<PatientCard 
								onSetAttribute={onSetAttribute}
							/>
						</Grid>
						<Grid item xs={12} sm={9} className={classes.title}>
							<MuiPickersUtilsProvider utils={DateFnsUtils}>
								<Grid container justifyContent="space-around">
									<TextField
										required
										id="date"
										label="Ngày khám"
										type="date"
										format={'DD/MM/YYYY'}
										name="date"
										value={state.date}
										onChange={onChange}
										className={classes.textField}
										InputLabelProps={{
											shrink: true,
										}}
										InputProps={{
											inputProps: { min: getCurrentDate() }
										}}
										autoFocus
									/>
									<Autocomplete
										id="state-hour"
										name="hour"
										value={state.hour}
										inputValue={inputHour}
										onInputChange={(e, newInputChange) => setInputHour(newInputChange)}
										onChange={(e, newValue) => {
											setState(prevState => ({ ...prevState, hour: newValue ? newValue : '' }));
										}}
										options={bookingTime}
										// getOptionLabel={(option) => option}
										style={{ width: 300 }}
										renderInput={(params) => <TextField required {...params} label="Khung giờ khám" variant="standard" />}
										className={classes.autocomplete}
									/>
									<Autocomplete
										id="doctor"
										name="doctor"
										inputValue={inputDoctor}
										onInputChange={(e, newInputChange) => setInputDoctor(newInputChange)}
										onChange={handleChangeDoctor}
										options={doctorList}
										getOptionLabel={(option) => option.name}
										style={{ width: 300 }}
										renderInput={(params) => <TextField required {...params} label="Chọn bác sĩ" variant="standard" />}
										className={classes.autocomplete}
									/>
								</Grid>
							</MuiPickersUtilsProvider>
						</Grid>
					</Grid>

					<TextareaAutosize
						required
						name="description"
						value={state.description}
						onChange={onChange}
						className={classes.textSize}
						minRows={5}
						placeholder="Lý do đăng ký khám (gồm triệu chứng, thuốc đang dùng, tiền sử bệnh án,...)"
					>

					</TextareaAutosize>

					<Typography>Hình ảnh đính kèm (nếu có, tối đa 4 ảnh)</Typography>
					<Grid container>
						{
							number <= 1 ? <UploadImage 
											handleChangeImages={handleChangeImages1}
											number={number}
										/> : ''
						}
						{
							number <=2  ? <UploadImage 
											handleChangeImages={handleChangeImages2}
											number={number}
										/> : ''
						}
						{
							number <= 3 ? <UploadImage 
											handleChangeImages={handleChangeImages3}
											number={number}
										/> : ''
						}
						{
							number <= 4 ? <UploadImage 
											handleChangeImages={handleChangeImages4}
											number={number}
										/> : ''
						}
					</Grid>
					<div className="text-center">
						{state.name ? <Button
							type="submit"
							variant="contained"
							color="primary"
						>
							Xác nhận
						</Button>
							:
							<Alert severity="warning">Vui lòng chọn tên Bệnh nhân được khám</Alert>
						}
						&nbsp;
						<Button
							className={classes.clear}
							type="button"
							variant="contained"
							onClick={onClear}
						>
							Điền lại
						</Button>
						&nbsp;
						<Button
							variant="contained"
							color="secondary"
							onClick={onCloseForm}
						>
							Đóng
						</Button>
					</div>
				</form>
			</div>
		</div>
	);

}

