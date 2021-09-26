import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import APIService from '../../utils/APIService';
import Cookies from 'universal-cookie';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.light,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        border: "#A8A8A8 solid 2px",
        borderRadius: 5,
        padding: '5px 0px 0px 10px',
    },
    rowgender: {
		marginLeft: "10px",
	},
    input: {
		marginLeft: "10px",
	},
	large: {
		width: theme.spacing(15),
		height: theme.spacing(15),
	},
}));

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2),
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
	},
});

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant="h6">{children}</Typography>
			{onClose ? (
				<IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export default function PersonalIcon() {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState(false);

	const [state, setState] = React.useState({
        email: '',
		firstName: '',
		lastName: '',
		phoneNumber: '',
		avatar: '',
		gender: ''
    })

    const onChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		setState(prevState => ({ ...prevState, [name]: value }));
	}

	const [name, setName] = React.useState('Bạn');
	const cookies = new Cookies();
	const token = cookies.get("token");

	const handleClickOpen = () => {
		if(token) {
			setOpen(true);
			APIService.checkToken(token, (success, json) => {
				console.log(token);
				if(success && json.result){
					setName(json.result.customer.lastName);
					console.log(json.result.customer.lastName);
				} else {
					console.log("failed");
				}
			}) 

			APIService.getProfile(token, (success, json) => {
				if(success && json.result){
					console.log(json.result.email);
					setState({
						email: json.result.email,
						firstName: json.result.customer.firstName,
						lastName: json.result.customer.lastName,
						phoneNumber: json.result.phoneNumber,
						avatar: json.result.customer.avatarURL,
						gender: json.result.customer.gender
					})
				}
			}) 
		} else {
			return history.push("/signin");
		}
	};

	const onSave = (event) => {
		console.log("Đã vào save");
        event.preventDefault();
        APIService.putProfile(
			token,
			{
				firstName:state.firstName, 
				lastName:state.lastName, 
				gender:state.gender, 
				avatar:state.avatar, 
				birthday: ''
			} ,
            (success, json) => {
            if(success && json.result){
				console.log("ok");
                return alert("THÀNH CÔNG !")
            } else {
				console.log(json);
                return alert("Cập nhật thay đổi THẤT BẠI !")
            }
        }) 
    }

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button variant="none" color="primary" onClick={handleClickOpen}>
		 		<AccountCircleIcon />
				&nbsp;
				Chào {name}
			</Button>
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Thông tin cá nhân
				</DialogTitle>
				<DialogContent dividers>
					<Container component="main" maxWidth="xs">
						<CssBaseline />
						<div className={classes.paper}>
							<Avatar alt="Remy Sharp" src={state.avatar} className={classes.large} />
							<form className={classes.form} noValidate>
								<Grid container spacing={2}>
									<Grid item xs={12} sm={6}>
										<TextField
											className={classes.textField}
											autoComplete="fname"
											variant="standard"
											required
											fullWidth
											id="firstName"
											label="Tên"
											name="firstName"
											value={state.firstName}
											onChange={onChange}
											autoFocus
										/>
									</Grid>
									<Grid item xs={12} sm={6}>
										<TextField
											className={classes.textField}
											variant="standard"
											required
											fullWidth
											id="lastName"
											label="Họ và tên đệm"
											name="lastName"
											value={state.lastName}
											onChange={onChange}
											autoComplete="lname"
										/>
									</Grid>
									<Grid spacing={5} className={classes.rowgender} >
										<Grid item xs={12}>
											<FormControl required className={classes.gender} component="fieldset">
												<FormLabel component="legend">Giới tính</FormLabel>
												<RadioGroup
													row aria-label="gender"
													name="gender"
													value={state.gender}
													onChange={onChange}
												>
													<FormControlLabel value="FEMALE" control={<Radio required />} label="Nữ" />
													<FormControlLabel value="MALE" control={<Radio />} label="Nam" />
													<FormControlLabel value="OTHER" control={<Radio />} label="Khác" />
												</RadioGroup>
											</FormControl>
										</Grid>
									</Grid>
									<Grid item xs={12}>
										<TextField
											className={classes.textField}
											variant="standard"
											required
											fullWidth
											id="email"
											label="Địa chỉ email"
											name="email"
											value={state.email}
											onChange={onChange}
											autoComplete="email"
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											className={classes.textField}
											variant="standard"
											required
											fullWidth
											type="number"
											id="phoneNumber"
											label="Số điện thoại"
											name="phoneNumber"
											value={state.phoneNumber}
											onChange={onChange}
											autoComplete="current-phoneNumber"
										/>
									</Grid>
								</Grid>
								<Button
									type="submit"
									fullWidth
									variant="contained"
									color="primary"
									className={classes.submit}
									onClick={onSave}
								>
									Lưu thay đổi
								</Button>
							</form>
						</div>
					</Container>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose} color="primary">
						Đóng thẻ
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
