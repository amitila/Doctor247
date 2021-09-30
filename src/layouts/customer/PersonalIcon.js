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
import Avatar from "@material-ui/core/Avatar";
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import Badge from '@material-ui/core/Badge';
import { useDispatch } from "react-redux";
import { updateName } from '../../store/userSlice';
import { Link } from 'react-router-dom';
import SelectProvince from '../../components/SelectProvince';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(1),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(0),
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
		display: "none"
	},
	large: {
		width: theme.spacing(18),
		height: theme.spacing(18),
	},
	link: {
        textDecoration: 'none',
        fontSize: '14px',
        color: theme.palette.warning.dark,
        fontWeight: 'bold',
        backgroundColor: 'none',
		textAlign: 'center'
    },
	personal: {
        textDecoration: 'none',
        fontSize: '16px',
        color: theme.palette.success.dark,
        fontWeight: 'bold',
        backgroundColor: 'none',
		textAlign: 'center'
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
		padding: theme.spacing(0),
	},
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
	},
}))(MuiDialogActions);

export default function PersonalIcon(props) {
	const classes = useStyles();
	const history = useHistory();
	const [open, setOpen] = React.useState(false);

	const [state, setState] = React.useState({
        email: '',
		firstName: '',
		lastName: '',
		birthday: '',
		gender: '',
		phoneNumber: '',
		healthInsuranceCode: '',
		address: '',
		province: '',
		avatar: '',
    });
	const [provinceId, setProvinceId] = React.useState('');

    const onChange = (event) => {
		let target = event.target;
		let name = target.name;
		let value = target.value;
		setState(prevState => ({ ...prevState, [name]: value }));
	}

	const cookies = new Cookies();
	const token = cookies.get("token");

	const handleClickOpen = () => {
		if(token) {
			APIService.getProfile(token, (success, json) => {
				if(success && json.result){
					setOpen(true);
					console.log(json.result.customer.birthday?.slice(0,10));
					setState({
						email: json.result.email,
						firstName: json.result.customer.firstName,
						lastName: json.result.customer.lastName,
						birthday: json.result.customer.birthday ? json.result.customer.birthday.slice(0,10) : "1890-10-01",
						gender: json.result.customer.gender,
						phoneNumber: json.result.phoneNumber,
						healthInsuranceCode: json.result.customer.healthInsuranceCode ? json.result.customer.healthInsuranceCode : '' ,
						address: json.result.customer.address ? json.result.customer.address : '',
						province: json.result.customer.province?.name,
						avatar: json.result.customer.avatarURL ? json.result.customer.avatarURL : '' ,
					});
				}
			}) 
		} else {
			return history.push("/signin");
		}
	};

	const dispatch = useDispatch();
	const onSave = (event) => {
        event.preventDefault();
        APIService.putProfile(
			token,
			{
				firstName:state.firstName, 
				lastName:state.lastName, 
				gender:state.gender, 
				birthday: getBirthday(),
				avatar: url,
				phoneNumber: state.phoneNumber,
				provinceId: provinceId,
				address: state.address
			} ,
            (success, json) => {
            if(success && json.result){
				dispatch(updateName(json.result.customer.lastName));
                return alert("THÀNH CÔNG !");
            } else {
                return alert("Cập nhật thay đổi THẤT BẠI !");
            }
        }) 
    }

	const handleClose = () => {
		setOpen(false);
	};
	
	const [url, setUrl] = React.useState('');
	const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if (reader.readyState === 2) {
                setState({...state, avatar: reader.result});
            }
        }
        reader.readAsDataURL(e.target.files[0]);
        setUrl(e.currentTarget.files[0]);
    }

	const getCurrentDate = () => {
		var dateObj = new Date();
		var month = dateObj.getMonth() + 1; //months from 1-12
		var day = dateObj.getDate();
		var year = dateObj.getFullYear();
		return (year + "-" + (month < 10 ? '0' + month : month) + "-" + day);
	}

	const handleChangeProvince = (obj) => {
		setState({ ...state, province: obj.name });
		setProvinceId(obj.id);
	}

	const getBirthday = () => {
		var date = new Date();
		var value = state.birthday;
		var dd = parseInt(value.slice(0,4));
		date.setDate(parseInt(value.slice(8,10))+1);
		date.setMonth(parseInt(value.slice(5,7))-1);
		date.setFullYear(parseInt(value.slice(0,4)));
		console.log(dd);
		return date;
	}
	console.log(getBirthday());
	return (
		<div>
			{
				props.name ? <Button className={classes.personal} fullWidth variant="none" color="primary" onClick={handleClickOpen} >
								<AccountCircleIcon />
								&nbsp;
								Chào {props.name}
							</Button> 
							: 
							<Button fullWidth variant="none" color="primary" >
								<Link className={classes.link} to="/signin" >Bạn chưa đăng nhập !</Link>
							</Button> 
							
			}
			<Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
				<DialogTitle id="customized-dialog-title" onClose={handleClose}>
					Thông tin cá nhân
				</DialogTitle>
				<DialogContent dividers>
					<Container component="main" maxWidth="xs">
						<CssBaseline />
						<div className={classes.paper}>
							<div>
								<Badge
									overlap="circular"
									anchorOrigin={{
										vertical: 'bottom',
										horizontal: 'right',
									}}
									badgeContent={
										<label htmlFor="icon-button-file">
											<IconButton color="primary" aria-label="upload picture" component="span">
												<PhotoCamera />
											</IconButton>
										</label>
									}
								>
									<Avatar className={classes.large} alt="avatar" src={state.avatar} />
								</Badge>
								<input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={imageHandler} />
							</div>
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
									<Grid item xs={12}>
										<TextField
											className={classes.textField}
											variant="standard"
											required
											id="date"
											label="Ngày sinh"
											type="date"
											format={'DD/MM/YYYY'}
											defaultValue="1890-10-01"
											// maxDate="2021-09-20"
											name="birthday"
											value={state.birthday}
											onChange={onChange}
											InputLabelProps={{
												shrink: true,
											}}
											InputProps={{
												inputProps: { min: "1890-01-01", max: getCurrentDate() }
											}}
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
											fullWidth
											id="healthInsuranceCode"
											label="Mã BHYT (nếu có)"
											name="healthInsuranceCode"
											value={state.healthInsuranceCode}
											onChange={onChange}
											autoComplete="bhyt"
										/>
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
									<Grid item xs={12} >
										<SelectProvince
											province={state.province}
											provinceId={provinceId}
											handleChangeProvince={handleChangeProvince}
										/>
									</Grid>
									<Grid item xs={12}>
										<TextField
											className={classes.textField}
											variant="standard"
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
									</Grid>
								</Grid>	
							</form>
						</div>
					</Container>
				</DialogContent>
				<DialogActions>
					<Button
						autoFocus
						type="submit"
						variant="contained"
						color="primary"
						className={classes.submit}
						onClick={onSave}
					>
						Lưu thay đổi
					</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}
