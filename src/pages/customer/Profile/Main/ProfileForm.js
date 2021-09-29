import React, { useEffect } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SelectProvince from '../../../../components/SelectProvince';
import Relationship from '../../../../components/Relationship';
import UploadAvatar from "../../../../components/UploadAvatar.js";
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(0.5),
		textAlign: "center",
		color: theme.palette.text.secondary,
		marginTop: theme.spacing(8),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		width: '100%',
		margin: "auto",
		border: "#303F9F double 5px",
		borderRadius: 5,
	},
	rowgender: {
		marginTop: "5px",
	},
	clear: {
		backgroundColor: 'orange',
		color: 'white',
		"&:hover": {
			backgroundColor: 'orange',
		}
	}
}));

export default function ProfileForm(props) {

	const classes = useStyles();

	const flag = props.task ? {
		id: props.task.id,
		avatar: props.task.avatar,
		relationship: props.task.relationship,
		firstName: props.task.firstName,
		lastName: props.task.lastName,
		gender: props.task.gender,
		birthday: props.task.birthday,
		bhyt: props.task.bhyt,
		phone: props.task.phone,
		email: props.task.email,
		province: props.task.province,
		address: props.task.address
	} : {
		id: '',
		avatar: '',
		relationship: '',
		firstName: '',
		lastName: '',
		gender: '',
		birthday: '',
		bhyt: '',
		phone: '',
		email: '',
		province: '',
		address: ''
	};

	const [state, setState] = React.useState(flag);

	useEffect(() => {
		if (props && props.task) {
			setState({
				id: props.task.id,
				avatar: props.task.avatar,
				relationship: props.task.relationship,
				firstName: props.task.firstName,
				lastName: props.task.lastName,
				gender: props.task.gender,
				birthday: props.task.birthday,
				bhyt: props.task.bhyt,
				phone: props.task.phone,
				email: props.task.email,
				province: props.task.province,
				address: props.task.address
			});
		} else if (!props.task) {
			setState({
				id: '',
				avatar: '',
				relationship: '',
				firstName: '',
				lastName: '',
				gender: '',
				birthday: '',
				bhyt: '',
				phone: '',
				email: '',
				province: '',
				address: ''
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
			avatar: '',
			relationship: '',
			firstName: '',
			lastName: '',
			gender: '',
			birthday: '',
			bhyt: '',
			phone: '',
			email: '',
			province: '',
			address: ''
		});
	}

	const handleChangeAvatar = (text) => {
		setState({ ...state, avatar: text });
	}

	const handleChangeProvince = (text) => {
		setState({ ...state, province: text });
	}

	const handleSelectRelationship = (text) => {
		setState({ ...state, relationship: text });
	}

	const getCurrentDate = () => {
		var dateObj = new Date();
		var month = dateObj.getMonth() + 1; //months from 1-12
		var day = dateObj.getDate();
		var year = dateObj.getFullYear();
		return (year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
	}

	return (
		<div className="panel panel-warning">
			<div className="panel-heading">
				<h3 className="panel-title" onClick={onCloseForm} >
					{state.id !== '' ? 'Hủy bỏ cập nhật hồ sơ' : 'Hủy bỏ thêm hồ sơ'}
					&nbsp;
					<HighlightOffIcon />
				</h3>
			</div>
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							{/* Upload avatar into profile */}
							<UploadAvatar
								dataFromParent={state.avatar}
								//onChange={event => setAvatar(event.target.value)} 
								handleChangeAvatar={handleChangeAvatar}
								avatar={state.avatar}
							/>
						</Grid>
						<Grid item xs={12}>
							<form onSubmit={onSubmit} >
								<Relationship
									dataFromParent={state.relationship}
									handleSelectRelationship={handleSelectRelationship}
									relationship={state.relationship}
								/>
								<Grid style={{ marginTop: 10 }} container xs={12}>
									<Grid item sm={5}>
										<TextField
											variant="filled"
											size="small"
											required
											fullWidth
											id="firstName"
											label="Họ và tên đệm"
											name="firstName"
											value={state.firstName}
											onChange={onChange}
											autoComplete="firstName"
										/>
									</Grid>
									<br />
									<Grid item sm={2}></Grid>
									<Grid item sm={3}>
										<TextField
											variant="filled"
											size="small"
											required
											fullWidth
											id="lastName"
											label="Tên"
											name="lastName"
											value={state.lastName}
											onChange={onChange}
											autoComplete="lastName"
										/>
									</Grid>
								</Grid>
								<Grid container spacing={2} className={classes.rowgender} >
									<Grid item xs={5}>
										<FormControl required className={classes.gender} component="fieldset">
											<FormLabel component="legend">Giới tính</FormLabel>
											<RadioGroup
												row aria-label="gender"
												name="gender"
												value={state.gender}
												onChange={onChange}
											>
												<FormControlLabel value="Nữ" control={<Radio required />} label="Nữ" />
												<FormControlLabel value="Nam" control={<Radio />} label="Nam" />
												<FormControlLabel value="Khác" control={<Radio />} label="Khác" />
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item xs={7}>
										<TextField
											variant="filled"
											size="small"
											required
											id="date"
											label="Ngày sinh"
											type="date"
											format={'DD/MM/YYYY'}
											defaultValue="1890-10-01"
											maxDate="2021-09-20"
											name="birthday"
											value={state.birthday}
											onChange={onChange}
											className={classes.textField}
											InputLabelProps={{
												shrink: true,
											}}
											InputProps={{
												inputProps: { min: "1890-01-01", max: getCurrentDate() }
											}}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={3}>
									<Grid item xs={8}>
										<TextField
											variant="filled"
											size="small"
											margin="normal"
											fullWidth
											id="bhyt"
											label="Mã BHYT (nếu có)"
											name="bhyt"
											value={state.bhyt}
											onChange={onChange}
											autoComplete="bhyt"
										/>
										<TextField
											variant="filled"
											size="small"
											margin="normal"
											required
											fullWidth
											id="numphone"
											label="Số điện thoại"
											name="phone"
											type="number"
											value={state.phone}
											onChange={onChange}
											autoComplete="phone"
										/>
										<TextField
											variant="filled"
											size="small"
											margin="normal"
											required
											fullWidth
											id="email"
											label="Địa chỉ email"
											name="email"
											type="email"
											value={state.email}
											onChange={onChange}
											autoComplete="email"
										/>
									</Grid>
									<Grid item xs={4}>

									</Grid>
								</Grid>
								{/* Select province where living */}
								<SelectProvince
									dataFromParent={state.province}
									handleChangeProvince={handleChangeProvince}
									province={state.province}
								/>
								<TextField
									variant="filled"
									size="small"
									margin="normal"
									required
									fullWidth
									name="address"
									label="Địa chỉ cụ thể"
									type="address"
									id="address"
									value={state.address}
									onChange={onChange}
									autoComplete="current-address"
								/>
								<div className="text-center">
									<Button
										type="submit"
										variant="contained"
										color="primary"
									>
										Lưu thay đổi
									</Button>
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
						</Grid>
					</Grid>
				</Paper>
			</div>
		</div>
	);
}

