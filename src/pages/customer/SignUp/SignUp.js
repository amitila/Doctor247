import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkTo } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from "react-router-dom";
import APIService from '../../../utils/APIService';

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
}));

export default function SignUp() {
    const classes = useStyles();
    const history = useHistory();

    const [state, setState] = React.useState({
        email: '',
		firstName: '',
		lastName: '',
		password: '',
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

    const onSignUp = (event) => {
        // event.preventDefault();
        console.log(state);
        APIService.signIn(
            state.email, 
            state.firtName, 
            state.lastName, 
            state.password, 
            state.phoneNumber, 
            state.avatar, 
            state.gender, 
            (success, json) => {
            if(success && json.result){
                // dispatch(updateEmail(email));
                // dispatch(updatePassword(password));
                // const timestamp = new Date().getTime();
                // const expire = timestamp + (60*60*24*1000*3);
                // const expireDate = new Date(expire);
                // cookies.set("token", json.result.token, {path: '/', expires: expireDate });
                return history.push("/signin");
            } else {
                return history.push("/signup");
            }
        }) 
    }

    const imageHandler = (e) => {
        // const reader = new FileReader();
        // reader.onload = () => {
        //     if (reader.readyState === 2) {
        //         setState({...state, avatar: reader.result});
        //     }
        // }
        // reader.readAsDataURL(e.target.files[0]);
        setState({...state, avatar: e.currentTarget.files[0]});
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng ký tài khoản
                </Typography>
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
                                onChange={onChange}
                                autoComplete="current-phoneNumber"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                className={classes.textField}
                                variant="standard"
                                required
                                fullWidth
                                type="password"
                                id="password"
                                label="Mật khẩu"
                                name="password"
                                onChange={onChange}
                                autoComplete="current-password"
                            />
                        </Grid>
                        <input accept="image/*" className={classes.input} id="icon-button-file" type="file" onChange={imageHandler} />
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Tôi có muốn nhận thông báo qua email."
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSignUp}
                    >
                        Đăng ký
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <LinkTo to="/signin" variant="body2">
                                Tôi đã có tài khoản - Đăng nhập
                            </LinkTo>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={5}>
                {/* add text */}
            </Box>
        </Container>
    );
}