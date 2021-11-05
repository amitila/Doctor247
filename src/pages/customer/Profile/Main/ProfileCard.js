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
	avatar: {
		width: 125,
		height: 125,
	}
}));

export default function ProfileCard(props) {
	const classes = useStyles();

	const [open, setOpen] = React.useState(false);
	const [code, setCode] = React.useState('');
	const [type, setType] = React.useState('');

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
										Email: {task.email}
										<br />
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
									<Button onClick={handleClose}>Hủy xóa</Button>
									<Button onClick={handleConfirmDelete}>Xác nhận xóa</Button>
								</DialogActions>
							</Dialog>
						</CardActions>
					</Grid>
				</Grid>
			</Card>
		</div>
	);
}
