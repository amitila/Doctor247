import { makeStyles, TextareaAutosize, TextField } from '@material-ui/core'
import React, { useEffect } from 'react';
import Button from "@material-ui/core/Button";
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Autocomplete from '@material-ui/lab/Autocomplete';
import PatientCard from './PatientCard';
import Alert from '@material-ui/lab/Alert';

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
        border: "#303F9F solid 5px",
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
    { title: '7h30 - 8h', time: "sáng" },
    { title: '8h30 - 9h', time: "sáng" },
    { title: '9h30 - 10h', time: "sáng" },
    { title: '10h30 - 11h', time: "sáng" },
    { title: '11h - 11h30', time: "sáng" },
    { title: '11h30 - 12h', time: "sáng" },
    { title: '13h - 13h30', time: "chiều" },
    { title: "13h30 - 14h", time: "chiều" },
    { title: '14h - 14h30', time: "chiều" },
    { title: '14h30 - 15h', time: "chiều" },
    { title: '15h - 15h30', time: "chiều" },
    { title: '15h30 - 16h', time: "chiều" },
    { title: '16h - 16h30', time: "chiều" },
    { title: "16h30 - 17h", time: "chiều" },
];

const doctorName = [
    { title: 'Nguyễn Đức Thăng', id: "01" },
    { title: 'Nguyễn Mai Phương Nhung', id: "02" },
    { title: 'Hồ Thủy Tiên', id: "03" },
    { title: 'Đào Dương Long', id: "04" },
    { title: 'Lô Vỹ Oanh', id: "05" },
];

export default function AppointmentForm(props) {

	const flag = props.task ? {
		id: props.task.id,
		name: props.task.name,
		date: props.task.date,
		hour: props.task.hour,
		doctor: props.task.doctor,
		symptom: props.task.symptom,
		images: props.task.images
	} : {
		id: '',
		name: '',
		date: '',
		hour: '',
		doctor: '',
		symptom: '',
		images: ''
	};
	
	const [state, setState] = React.useState(flag);
	// console.log(state);
	useEffect(() => {
		if (props && props.task) {
			setState({
				id: props.task.id,
				name: props.task.name,
				date: props.task.date,
				hour: props.task.hour,
				doctor: props.task.doctor,
				symptom: props.task.symptom,
				images: props.task.images
			});
		} else if (!props.task) {
			setState({
				id: '',
				name: '',
				date: '',
				hour: '',
				doctor: '',
				symptom: '',
				images: ''
			});
		}
	}, [props]);

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
		setState(prevState => ({ ...prevState, [name]: value }));
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
			symptom: '',
			images: ''
		});
	}

	const classes = useStyles();
	const onSetName = (text) => {
		setState({...state, name: text});
	}

	const handleChangeHour = (e, newValue) => {
		setState({...state, hour: newValue?.title +'('+ newValue?.time +')'});
	}

	const handleChangeDoctor = (e, newValue) => {
		setState({...state, doctor: newValue?.title +'( Mã số: '+ newValue?.id +')'});
	}

	const [inputHour, setInputHour] = React.useState(state.hour);
	const [inputDoctor, setInputDoctor] = React.useState(state.doctor);

	useEffect(() => {
		setInputHour(state.hour);
	}, [state.hour]);

	useEffect(() => {
		setInputDoctor(state.doctor);
	}, [state.doctor]);

	const getCurrentDate = () => {
		var dateObj = new Date();
		var month = dateObj.getUTCMonth() + 1; //months from 1-12
		var day = dateObj.getUTCDate();
		var year = dateObj.getUTCFullYear();
		return (year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
	}

	const handleChangeFile = (files) => {
		const temp = [];
		files.forEach((file, index) => {
            temp.push("/images/" + file.path);
        });
		setState({...state, images: temp});
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
				<form onSubmit={onSubmit} >
					<Typography variant="h6" className={classes.title} >
						Đặt lịch khám
					</Typography>

					<Grid container spacing={5}>
						<Grid item xs={12} sm={3} className={classes.title}>
							<PatientCard dataFromParent={state.name} onSetName={onSetName} />
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
											inputProps: { min: getCurrentDate()} 
										}}
										autoFocus
									/>
									<Autocomplete
										id="book-hour"
										name="hour"
										inputValue={inputHour}
										onInputChange={(e, newInputChange) => setInputHour(newInputChange)}
										onChange={handleChangeHour}
										options={bookingTime}
										getOptionLabel={(option) => option.title}
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
										options={doctorName}
										getOptionLabel={(option) => option.title}
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
						name="symptom"
						value={state.symptom}
						onChange={onChange}
						className={classes.textSize}
						minRows={5}
						placeholder="Lý do đăng ký khám (gồm triệu chứng, thuốc đang dùng, tiền sử bệnh án,...)"
					>

					</TextareaAutosize>

					<Typography>Hình ảnh đính kèm (nếu có)</Typography>
					<DropzoneArea
						className={classes.dropzone}
						filesLimit={5}
						acceptedFiles={['image/*']}
						dropzoneText={"Kéo ảnh thả vào hay nhấp vào để tải ảnh lên"}
						onChange={handleChangeFile}
					/>
					
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

