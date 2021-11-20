import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
		width: '100%'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	update: {
		backgroundColor: '#2196F3',
		color: 'white',
		"&:hover": {
			backgroundColor: '#2196F3',
		}
	},
	delete: {
		backgroundColor: '#FF0101',
		color: 'white',
		"&:hover": {
			backgroundColor: '#FF0101',
		}
	},
	create: {
		backgroundColor: 'green',
		color: 'white',
		"&:hover": {
			backgroundColor: 'green',
		},
	},
	avatar: {
		width: 125,
		height: 125,
	}
}));

export default function ProfileCard(props) {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const [openCreate, setOpenCreate] = React.useState(false);
	const [code, setCode] = React.useState('');
	const [type, setType] = React.useState('');
	const [codeWindow, setCodeWindow] = React.useState(true);

	// const onDelete = () => {
	// 	props.onDelete(props.task.userTwoId, type);
	// }

	const handleEmail = () => {
		setType('EMAIL')
		props.onDelete(props.task.userTwoId, 'EMAIL');
		setOpen(false);
		setOpen(true);
	}

	const handlePhone = () => {
		setType('PHONE')
		props.onDelete(props.task.userTwoId, 'PHONE');
		setOpen(false);
		setOpen(true);
	}

	const handleConfirmDelete = () => {
		props.handleConfirmDelete(props.task.userTwoId, code);
	}

	const verifyGuardianUser = () => {
		props.verifyGuardianUser(state);
		setCodeWindow(false)
	}

	const handleConfirmGuardianUser = () => {
		props.handleConfirmGuardianUser(state);
		handleCloseCreate();
	}

	const onUpdate = () => {
		props.onUpdate(props.task.id);
	}

	const { task, index } = props;
	// const birthday = new Date(task.birthday);
	// const getBirthday = (dmy) => {
	// 	const dd = dmy.getDate();
	// 	const mm = dmy.getMonth() + 1;
	// 	const yyyy = dmy.getFullYear();
	// 	return (dd + '/' + mm + '/' + yyyy).toString();
	// }

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleClickOpenCreate = () => {
		setCodeWindow(true);
		setOpenCreate(true);
	};

	const handleCloseCreate = () => {
		setOpenCreate(false);
	};

	const [state, setState] = React.useState({
        password: '',
        guardiantId: task.userTwoId,
		guardianName: task.firstName +' '+ task.lastName,
        type: 'EMAIL',
        email: task.email,
        phoneNumber: task.phoneNumber,
        code: '',
        guardiantPassword: '',
    })

	const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

	return (
		<div className={classes.root}>
			<Card className={classes.root}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Hồ sơ số {index} của {task.relationship}
							</Typography>
							<Typography variant="h5" component="h2">
								{task.firstName +' '+ task.lastName}
							</Typography>
							<Typography variant="h6" component="h2">
								Mã nhận dạng: {task.id}
							</Typography>
							<Typography className={classes.pos} color="textSecondary">
								{task.birthday}
							</Typography>
							<Grid container>
								<Grid xs={12} sm={8}>
									<Typography variant="body2" component="p">
										Giới tính: {task.gender === 'FEMALE' ? "Nữ" : 'Nam'}
										<br />
										Mã số BHYT: {task.bhyt}
										<br />
										Số điện thoại: {task.phoneNumber}
										<br />
										{/* Email: {task.email}
										<br /> */}
										Tỉnh/TP: {task.province}
										<br />
										Địa chỉ: {task.address}
									</Typography>
								</Grid>
								<Grid xs={12} sm={4}>
									<Avatar 
										alt="avatar" 
										src={task.avatar} 
										loading="lazy" 
										className={classes.avatar}
									/>
								</Grid>
							</Grid>
						</CardContent>
					</Grid>
					<Grid item xs={12}>
						<CardActions>
							<Button
								className={classes.update}
								type="button"
								variant="contained"
								onClick={onUpdate}
							>
								Cập nhật
							</Button>
							&nbsp;
							<Button
								className={classes.delete}
								type="button"
								variant="contained"
								onClick={handleClickOpen}
							>
								Xóa thẻ
							</Button>
							{/* Dialog for delete guardian */}
							<Dialog open={open} onClose={handleClose}>
								<DialogTitle>Hộp xác nhận xóa thẻ hồ sơ</DialogTitle>
								<DialogContent>
									{
										type === '' ?
										<>
											<Button
												style={{ marginTop: 15, marginLeft: 3, border: "solid" }} 
												onClick={handleEmail}
												// variant="contained"
												color="main"
												className={classes.submit}
											>
												<b>Nhận mã qua Email</b>
											</Button>
											<Button
												style={{ marginTop: 15, marginLeft: 3, border: "solid" }} 
												onClick={handlePhone}
												// variant="contained"
												color="secondary"
												className={classes.submit}
											>
												<b>Nhận mã qua tin nhắn</b>
											</Button>
										</>
										:
										<>
											<DialogContentText>
												Vui lòng nhập mã OTP để xác nhận là bạn muốn xóa thẻ hồ sơ này.
												**<b>Cảnh báo</b>: Thẻ hồ sơ bị xóa có thể dẫn tới mất mát các thông tin
												liên quan như hồ sơ bệnh án.
											</DialogContentText>
											<TextField
												autoFocus
												required
												margin="dense"
												id="code"
												label="Mã OTP"
												type="code"
												value={code}
												fullWidth
												variant="standard"
												onChange={(e)=> setCode(e.target.value)}
											/>
										</>
									}
								</DialogContent>
								<DialogActions>
									<Button variant="contained" color='secondary' onClick={handleClose}>Hủy xóa</Button>
									<Button variant="contained" color='primary' onClick={handleConfirmDelete}>Xác nhận xóa</Button>
								</DialogActions>
							</Dialog>
							&nbsp;
							<Button
								className={classes.create}
								type="button"
								variant="contained"
								onClick={handleClickOpenCreate}
							>
								Chuyển đổi
							</Button>
							{/* Dialog for transfer guardian to new customer */}
							<Dialog open={openCreate} onClose={handleCloseCreate}>
								<DialogTitle style={{textAlign: 'center'}}>
									Tính năng chuyển đổi người được bạn giám hộ thành khách hàng chính thức của Doctor247
								</DialogTitle>
								<DialogContent>
									<form className={classes.form} onSubmit={()=>alert('Chuyển đổi')} >
										<Grid container spacing={2}>
											<Grid spacing={5} className={classes.rowgender} >
												<Grid item xs={12}>
													<FormControl required className={classes.gender} component="fieldset">
														<FormLabel component="legend" style={{marginTop: 20}}>Lựa chọn email / số điện thoại để tạo tài khoản:</FormLabel>
														<RadioGroup
															row aria-label="gender"
															name="type"
															value={state.type}
															onChange={onChange}
														>
															<FormControlLabel value="EMAIL" control={<Radio required />} label="Email" />
															<FormControlLabel value="PHONE" control={<Radio />} label="Số điện thoại" />
														</RadioGroup>
													</FormControl>
												</Grid>
											</Grid>
											<Grid item xs={12} sm={6}>
												<TextField
													className={classes.textField}
													autoComplete="fname"
													variant="standard"
													required
													fullWidth
													id="firstName"
													value={state.guardianName}
													label="Họ và tên đệm"
													name="firstName"
													onChange={onChange}
													// autoFocus
												/>
											</Grid>
											<>
												<Grid item xs={12} sm={6}>
												{
													state.type === 'PHONE' ?
														<TextField
															className={classes.textField}
															variant="standard"
															required
															fullWidth
															id="phoneNumber"
															value={state.phoneNumber}
															label="Số điện thoại"
															name="phoneNumber"
															type="number"
															onChange={onChange}
															autoComplete="current-phoneNumber"
														/> :
														<TextField
															className={classes.textField}
															variant="standard"
															required
															fullWidth
															id="email"
															value={state.email}
															label="Địa chỉ email"
															name="email"
															type="email"
															onChange={onChange}
															autoComplete="email"
														/>
												}
												</Grid>
												<Grid container item xs={12} sm={8}>
													<Grid item sm={11}>
														<TextField
															className={classes.textField}
															variant="standard"
															required
															fullWidth
															type={showPassword ? "text" : "password"}
															id="password"
															label="Mật khẩu của tài khoản người giám hộ"
															name="password"
															onChange={onChange}
															autoComplete="current-password"
														/>
													</Grid>
													<Grid item sm={1}>
														<Box style={{ marginTop: 15, marginLeft: 3, border: "solid" }} onClick={handleClickShowPassword}>
															{showPassword ? <VisibilityOff /> : <Visibility />}
														</Box>
													</Grid>  
													<Grid item sm={5}>
														<Button
															style={{ marginTop: 15, marginLeft: 3, border: "solid" }} 
															onClick={verifyGuardianUser}
															variant="contained"
															color="secondary"
															className={classes.submit}
														>
															<b>Nhận mã</b>
														</Button>
													</Grid>
												</Grid>
											</>
											{
												codeWindow ? null :
													<>
														<p style={{textAlign: 'center', marginTop: 20, fontSize: 18}} >
															<b>{'-------------- Nhập mã OTP và mật khẩu mới --------------'}</b>
														</p>
														<Grid container item xs={12}>
															<Grid item sm={7}>
																<TextField
																	className={classes.textField}
																	variant="standard"
																	required
																	fullWidth
																	id="code"
																	label="Mã OTP"
																	name="code"
																	type="number"
																	onChange={onChange}
																	autoComplete="current-code"
																/>
															</Grid>
															<Grid container item xs={12} sm={8}>
																<Grid item sm={11}>
																	<TextField
																		className={classes.textField}
																		variant="standard"
																		required
																		fullWidth
																		type={showPassword ? "text" : "password"}
																		id="password"
																		label="Tạo mật khẩu"
																		name="guardiantPassword"
																		onChange={onChange}
																		autoComplete="current-password"
																	/>
																</Grid>
																<Grid item sm={1}>
																	<Box style={{ marginTop: 15, marginLeft: 3, border: "solid" }} onClick={handleClickShowPassword}>
																		{showPassword ? <VisibilityOff /> : <Visibility />}
																	</Box>
																</Grid>   
															</Grid>
														</Grid>
													</>
											}
										</Grid>
									</form>
								</DialogContent>
								<DialogActions>
									{
										codeWindow ? 
											<Button variant="contained" color='secondary' onClick={handleCloseCreate}>Hủy chuyển đổi</Button>
											:
											<Button variant="contained" color='primary' onClick={handleConfirmGuardianUser}>Xác nhận chuyển đổi</Button>
									}
								</DialogActions>
							</Dialog>
						</CardActions>
					</Grid>
				</Grid>
			</Card>
		</div>
	);
}
