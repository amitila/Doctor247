import { makeStyles, TextareaAutosize, TextField } from '@material-ui/core'
import React, { useEffect } from 'react';
import Button from 'react-bootstrap/esm/Button'
import Typography from '@material-ui/core/Typography';
import { DropzoneArea } from 'material-ui-dropzone';
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Autocomplete from '@material-ui/lab/Autocomplete';
import PatientCard from './PatientCard';

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

export default function TaskForm(props) {

	const flag = props.task ? {
		id: props.task.id,
		name: props.task.name,
		date: props.task.date,
		hour: props.task.hour,
		symptom: props.task.symptom
	} : {
		id: '',
		name: '',
		date: '',
		hour: '',
		symptom: ''
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
				symptom: props.task.symptom
			});
		} else if (!props.task) {
			setState({
				id: '',
				name: '',
				date: '',
				hour: '',
				symptom: ''
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
			symptom: ''
		});
	}

	const classes = useStyles();
	const onSetName = (text) => {
		setState({...state, name: text});
	}

	const handleChangHour = (e, newValue) => {
		setState({...state, hour: newValue.title +'('+ newValue.time +')'});
	}

	const [inputValue, setInputValue] = React.useState(state.hour);

	useEffect(() => {
		setInputValue(state.hour);
	}, [state.hour]);

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
										autoFocus
									/>
									<Autocomplete
										id="book-hour"
										name="hour"
										inputValue={inputValue}
										onInputChange={(e, newInputChange) => setInputValue(newInputChange)}
										onChange={handleChangHour}
										options={bookingTime}
										getOptionLabel={(option) => option.title}
										style={{ width: 300 }}
										renderInput={(params) => <TextField {...params} label="Khung giờ khám" variant="standard" />}
									/>
								</Grid>
							</MuiPickersUtilsProvider>
						</Grid>
					</Grid>

					<TextareaAutosize
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
						// onChange={(files) => console.log('Files:', files)}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
					>
						Xác nhận đặt lịch khám
					</Button>
					<Button
						type="button"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}
						onChange={onClear}
					>
						Điền lại
					</Button>
				</form>
			</div>
		</div>
	);

}

