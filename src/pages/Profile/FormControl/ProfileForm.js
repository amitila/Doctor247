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
import SelectProvince from '../../../components/SelectProvince.js';
import UploadAvatar from "../../../components/UploadAvatar.js";

const useStyles = makeStyles((theme) => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing(1),
		textAlign: "center",
		color: theme.palette.text.secondary,
	},
	rowgender: {
		marginTop: "5px",
	}
}));

export default function ProfileForm(props) {

	const classes = useStyles();

	const flag = props.task ? {
		id: props.task.id,
		relationship: props.task.relationship,
		name: props.task.name,
		gender: props.task.gender,
		birthday: props.task.birthday,
		bhyt: props.task.bhyt,
		phone: props.task.phone,
		email: props.task.email,
		province: props.task.province,
		address: props.task.address
	} : {
		id: '',
		relationship: '',
		name: '',
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
				relationship: props.task.relationship,
				name: props.task.name,
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
				relationship: '',
				name: '',
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
			relationship: '',
			name: '',
			gender: '',
			birthday: '',
			bhyt: '',
			phone: '',
			email: '',
			province: '',
			address: ''
		});
	}

	// const handleChangeAvatar = (text) => {
    //     setState({ ...state, avatar: text });
    // }

	const handleChangeProvince = (text) => {
		setState({ ...state, province: text });
	}

	return (
		<div className="panel panel-warning">
			<div className="panel-heading">
				<h3 className="panel-title">
					{state.id !== '' ? 'Cập nhật hồ sơ' : 'Thêm hồ sơ'}
					<span
						className="fa fa-times-circle text-right"
						onClick={onCloseForm}
					></span>
				</h3>
			</div>
			<div className={classes.root}>
				<Paper className={classes.paper}>
					<Grid container spacing={2}>
						<Grid item xs={12}>
							{/* Upload avatar into profile */}
							<UploadAvatar 
								// dataFromParent={avatar} 
								// //onChange={event => setAvatar(event.target.value)} 
								// handleChangeAvatar={handleChangeAvatar}
								// avatar={avatar}
							/>
						</Grid>
						<Grid item xs={12}>
							<form onSubmit={onSubmit} >
								<TextField
									variant="standard"
									required
									id="relationship"
									label="Mối quan hệ:"
									name="relationship"
									value={state.relationship}
									onChange={onChange}
									autoComplete="relationship"
								/>
								<TextField
									variant="standard"
									required
									fullWidth
									id="name"
									label="Họ và tên"
									name="name"
									value={state.name}
									onChange={onChange}
									autoComplete="name"
								/>
								<Grid container spacing={2} className={classes.rowgender} >
									<Grid item xs={5}>
										<FormControl className={classes.gender} component="fieldset">
											<FormLabel component="legend">Giới tính</FormLabel>
											<RadioGroup
												row aria-label="gender"
												name="gender"
												value={state.gender}
												onChange={onChange}
											>
												<FormControlLabel value="Nữ" control={<Radio />} label="Nữ" />
												<FormControlLabel value="Nam" control={<Radio />} label="Nam" />
												<FormControlLabel value="Khác" control={<Radio />} label="Khác" />
											</RadioGroup>
										</FormControl>
									</Grid>
									<Grid item xs={7}>
										<TextField
											id="date"
											label="Ngày sinh"
											type="date"
											format={'DD/MM/YYYY'}
											defaultValue="1890-10-01"
											name="birthday"
											value={state.birthday}
											onChange={onChange}
											className={classes.textField}
											InputLabelProps={{
												shrink: true,
											}}
										/>
									</Grid>
								</Grid>
								<Grid container spacing={3}>
									<Grid item xs={8}>
										<TextField
											variant="standard"
											margin="normal"
											fullWidth
											id="bhyt"
											label="Mã BHYT (nếu có)"
											name="bhyt"
											value={state.bhyt}
											onChange={onChange}
											autoComplete="bhyt"
											autoFocus
										/>
										<TextField
											variant="standard"
											margin="normal"
											required
											fullWidth
											id="numphone"
											label="Số điện thoại"
											name="phone"
											value={state.phone}
											onChange={onChange}
											autoComplete="phone"
											autoFocus
										/>
										<TextField
											variant="standard"
											margin="normal"
											required
											fullWidth
											id="email"
											label="Địa chỉ email"
											name="email"
											value={state.email}
											onChange={onChange}
											autoComplete="email"
											autoFocus
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
									variant="standard"
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
										type="button"
										variant="contained"
										color="secondary"
										onClick={onClear}
									>
										Điền lại
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

