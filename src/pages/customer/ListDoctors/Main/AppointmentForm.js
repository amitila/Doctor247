import { makeStyles, TextareaAutosize, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react';
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
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';
import { useSelector } from "react-redux";
import { selectName, selectAvatar } from '../../../../store/userSlice';
import getTimeFromOperationOfDoctor from  './getTimeFromOperationOfDoctor';
import sortBookingTime from './sortBookingTime';

const useStyles = makeStyles((theme) => ({
	textSize: {
		width: '100%',
	},
	paper: {
		marginTop: theme.spacing(0),
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
		marginTop: 12,
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

// var bookingTime = [];
// for (let x = 7; x < 21; x ++) {
// 	for(let y = 0; y < 2; y++) {
// 		if(y === 0) bookingTime.push(`${x}h00 - ${x}h30`);
// 		else bookingTime.push(`${x}h30 - ${x +1 }h00`);
// 	}
// }

export default function AppointmentForm(props) {
	const [bookingTime, setBookingTime] = useState([]);
	const [bookedTime, setBookedTime] = useState([]);
	const [isChecked, setIsChecked] = useState(true);
	const { infoOfDoctor } = props;

	// get current time
	const getCurrentDate = () => {
		var dateObj = new Date();
		var month = dateObj.getMonth() + 1; //months from 1-12
		var day = dateObj.getDate();
		var year = dateObj.getFullYear();
		return (year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
	}

	const [state, setState] = useState({
		id: '',
		name: '',
		date: getCurrentDate(),
		hour: '',
		workplace: '',
		doctor: '',
		description: '',
		imagesView: [],
		guardianId: '',
		doctorId: infoOfDoctor.id,
		dayTime: '',
		imagesSend: [],
	});

	const [patientList, setPatientList] = useState([]);

	const onChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		// if(name === 'status') {
		// 	value = target.value === 'true' ? true : false;
		// }
		setState(prevState => ({ ...prevState, [name]: value, dayTime: getDateTime() }));
	}

	const onSubmit = (event) => {
		event.preventDefault();
		console.log(state);
		const token = getToken();
		const customerIp = window.location.hostname;
        APIService.postAppointment(
			token,
			{
				guardianId: state.guardianId,
				doctorId: state.doctorId,
				dayTime: state.dayTime,
				description: [state.description],
				images: state.imagesSend,
				customerIp: customerIp
			},
			(success, json) => {
				if (success && json.result) {
					window.open(json.result, '_blank');
					return alert("Đặt lịch THÀNH CÔNG!");
				} else {
					return alert("THẤT BẠI");
				}
			}
        )
		//Clear and Close form
		onClear();
		props.handleClose()
	}

	const onClear = () => {
		setState({
			id: '',
			name: '',
			date: '',
			hour: '',
			workplace: '',
			doctor: '',
			description: '',
			imagesView: [],
			guardianId: '',
			dayTime: '',
			imagesSend: [],
		});
		setNumber(4);
	}

	const classes = useStyles();
	const onSetAttribute = (name, id) => {
		setState(prevState => ({ ...prevState, name: name, guardianId: id }));
		console.log(id);
	}

	const handleChangeHour = (e, newValue) => {
		setState({ ...state, hour: newValue? newValue.time : '', workplace: newValue? newValue.workplace : '' });
		// setState(prevState => ({ ...prevState, hour: newValue ? newValue.time : '' }));
	}

	const getBookedAppointmentToDoctor = () => {
        const token = getToken();
		const doctorId = state.doctorId;
		const date = getDateTime();
        APIService.getOperationOfDoctor(
            token,
			doctorId,
			date,
            (success, json) => {
                if (success && json.result) {
					setBookedTime(json.result?.map(item => {
						const dateTemp = new Date(item);
						const hour = dateTemp.getHours();
						const minute = dateTemp.getMinutes();
						const result = `${hour}h${minute}`;
						return {
							hour,
							minute,
							result
						};
					}));

                    return console.log("Lấy lịch thành công");
                } else {
                    return console.log("Không lấy được lịch");
                }
            }
        )
    }

	const getBookingTimeForPatient = () => {
		const date = getDateTime();
		const dayOfWeek = date.getDay();
		bookingTime.length = 0;
		setState({ ...state, hour:'', workplace:'' });
		let ami = [];
		infoOfDoctor.operations?.map(operation => {
			// console.log('Operationnnnnnnnnnnnnnnn')
			const workplace = operation.workplace;
			const patientPerHalfHour = operation.patientPerHalfHour;
			operation?.operationHours.map(operationHour => {
				// console.log('OperationHourrrrrrrrrr')
				if(dayOfWeek === operationHour.dayOfWeek) {
					// console.log('dayOfWeekkkkkkkkkkk')
					let temp = [];
					temp = getTimeFromOperationOfDoctor(operationHour.startHour, operationHour.endHour, workplace, patientPerHalfHour);
					ami = ami.concat(temp);
				}
				return 0;
			})
			setIsChecked(true);
			return setBookingTime(ami);
		})
	}

	useEffect(() => {
		getBookedAppointmentToDoctor();
		getBookingTimeForPatient();
	}, [state.date]);

	const [inputHour, setInputHour] = React.useState(state.hour);

	useEffect(() => {
		setInputHour(state.hour);
	}, [state.hour]);
	
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

	const name = useSelector(selectName);
    const avatarURL = useSelector(selectAvatar);
	useEffect(() => {
		const token = getToken();
		var profileList = [];
		APIService.getGuardian(
			token,
			(success, json) => {
				if (success && json.result) {
					json.result.map((item, index) => {
						if(index === 0) {
                            profileList.push({
                                userTwoId: '',
                                userTwo: {
                                    firstName: name,
                                    lastName: ' (Tôi)',
                                    avatarURL: avatarURL
                                }
                            })
                        }
						return profileList.push(item);
					})
					setPatientList(profileList?.map(item => {
						return {
							userTwoId: item.userTwoId,
							firstName: item.userTwo.firstName,
							lastName: item.userTwo.lastName,
							avatar: item.userTwo.avatarURL,
						}
					}))
					return console.log("lấy patient list thành công");
				} else {
					return console.log("Lấy danh sách gia đình thất bại");
				}
			}
		)
	},[])

	useEffect(() => {
		if(bookingTime.length && isChecked) {
			// let temp = bookingTime;
			bookedTime?.map(booked => {
				const result = booked.result;
				bookingTime?.map((boooking, index) => {
					const booktime = boooking.time.slice(0, 5);
					const mark = booktime.includes(result);
					if(mark) {
						bookingTime[index] = {
							time: bookingTime[index].time,
							workplace: bookingTime[index].workplace,
							patientPerHalfHour: bookingTime[index].patientPerHalfHour - 1
						}
					}
					return 0;
				})
				return 0;
			})
			setIsChecked(false);
			const temp = bookingTime.filter(function(element){
				return element.patientPerHalfHour > 0;
			})
			setBookingTime(sortBookingTime(temp, state.date));
		}
	}, [bookingTime, bookedTime, isChecked, state.date])
	
	return (
		<div className="panel panel-warning">
			<div className="panel-body">
				<form onSubmit={onSubmit} className={classes.paper} >
					<Typography variant="h6" className={classes.title} >
						Đặt lịch khám
					</Typography>

					<Grid container spacing={10}>
						<Grid item xs={12} sm={12} className={classes.title}>
							<PatientCard 
								onSetAttribute={onSetAttribute}
								patientList={patientList}
							/>
							<MuiPickersUtilsProvider utils={DateFnsUtils} >
								<Grid container justifyContent="space-around" style={{marginTop: 15}}>
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
										style={{marginBottom: 15}}
									/>
									{
										state.doctorId && bookingTime.length ? 
											<Autocomplete
												id="state-hour"
												name="hour"
												// value={state.hour}
												inputValue={inputHour}
												onInputChange={(e, newInputChange) => setInputHour(newInputChange)}
												onChange={handleChangeHour}
												options={bookingTime}
												getOptionLabel={(option) => option.time + ' @' + option.workplace}
												style={{ width: 10000 }}
												renderInput={(params) => <TextField required {...params} label="Khung giờ khám" variant="standard" />}
												className={classes.autocomplete}
											/> :
											<Autocomplete
												id="state-hour"
												disabled
												name="hour"
												// value={state.hour}
												inputValue={bookingTime.length ? inputHour : 'Hết lịch'}
												onInputChange={(e, newInputChange) => setInputHour(newInputChange)}
												onChange={handleChangeHour}
												options={bookingTime}
												getOptionLabel={(option) => option.time + ' @' + option.workplace}
												style={{ width: 10000 }}
												renderInput={(params) => <TextField required {...params} label="Thông báo" variant="standard" />}
												className={classes.autocomplete}
											/>
									}
								</Grid>
							</MuiPickersUtilsProvider>
						</Grid>
					</Grid>

					<div style={{textAlign: 'center'}}>
						<b><p>Bạn đã chọn đăng ký khám vào ngày <u style={{color: '#1e07ed'}}>{state.date ? state.date: '...'}</u> vào lúc <u style={{color: '#1e07ed'}}>{state.hour ? state.hour : '...'}</u> tại nơi <u style={{color: '#1e07ed'}}>{state.workplace ? state.workplace : '...'}</u></p></b>
					</div>

					<TextareaAutosize
						style={{marginTop: 10, padding: 10}}
						required
						name="description"
						value={state.description}
						onChange={onChange}
						className={classes.textSize}
						minRows={5}
						placeholder="Lý do đăng ký khám (gồm triệu chứng, thuốc đang dùng, tiền sử bệnh án,...)"
					>

					</TextareaAutosize>

					<Typography style={{marginTop: 10}} >Hình ảnh đính kèm (nếu có, tối đa 4 ảnh)</Typography>
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
					</div>
				</form>
			</div>
		</div>
	);

}

