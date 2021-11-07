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
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

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
        registerType: 'EMAIL',
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        phoneNumber: '',
        gender: '',
        code: '',
    })

    const onChange = (event) => {
        let target = event.target;
        let name = target.name;
        let value = target.value;
        setState(prevState => ({ ...prevState, [name]: value }));
    }

    const [status, setStatus] = React.useState(false);
    const onSignUp = (event) => {
        event.preventDefault();
        APIService.signUp({
            registerType: state.registerType,
            email: state.email,
            firstName: state.firstName,
            lastName: state.lastName,
            password: state.password,
            phoneNumber: state.phoneNumber,
            gender: state.gender,
            code: state.code
        },
        (success, json) => {
            if (success && json.result) {
                // dispatch(updateEmail(email));
                // dispatch(updatePassword(password));
                // const timestamp = new Date().getTime();
                // const expire = timestamp + (60*60*24*1000*3);
                // const expireDate = new Date(expire);
                // cookies.set("token", json.result.token, {path: '/', expires: expireDate });
                return history.push("/signin");
            } else {
                setStatus(true);
            }
        })
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const sendCodeToPhone = () => {
        if(state.phoneNumber === '') {
            alert("Bạn chưa nhập số điện thoại!")
        }
        else {
            APIService.getCodeFromSms(state.phoneNumber, (success, json) => {
                if (success && json.result) {
                    return alert("Vui lòng kiểm tra tin nhắn!")
                } else {
                    return alert("Không gửi được!")
                }
            })
        }
    }

    const sendCodeToMail = () => {
        if(state.email === '') {
            alert("Bạn chưa nhập email!")
        }
        else {
            APIService.getCodeFromMail(state.email, (success, json) => {
                if (success && json.result) {
                    return alert("Vui lòng kiểm tra mail!")
                } else {
                    return alert("Không gửi được!")
                }
            })
        }
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
                <form className={classes.form} onSubmit={onSignUp} >
                    <Grid container spacing={2}>
                        <Grid spacing={5} className={classes.rowgender} >
                            <Grid item xs={12}>
                                <FormControl required className={classes.gender} component="fieldset">
                                    <FormLabel component="legend">Loại đăng ký:</FormLabel>
                                    <RadioGroup
                                        row aria-label="gender"
                                        name="registerType"
                                        value={state.registerType}
                                        onChange={onChange}
                                    >
                                        <FormControlLabel value="EMAIL" control={<Radio required />} label="Đăng ký bằng mail" />
                                        <FormControlLabel value="PHONE" control={<Radio />} label="Đăng ký bằng số điện thoại" />
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
                                label="Họ và tên đệm"
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
                                label="Tên"
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
                                        {/* <FormControlLabel value="OTHER" control={<Radio />} label="Khác" /> */}
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {
                            state.registerType === 'PHONE' ?
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.textField}
                                    variant="standard"
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Số điện thoại"
                                    name="phoneNumber"
                                    type="number"
                                    onChange={onChange}
                                    autoComplete="current-phoneNumber"
                                />
                            </Grid> :
                            <>
                                <Grid item xs={12}>
                                    <TextField
                                        className={classes.textField}
                                        variant="standard"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Địa chỉ email"
                                        name="email"
                                        type="email"
                                        onChange={onChange}
                                        autoComplete="email"
                                    />
                                </Grid>
                                <Grid container item xs={12}>
                                    <Grid item sm={11}>
                                        <TextField
                                            className={classes.textField}
                                            variant="standard"
                                            required
                                            fullWidth
                                            type={showPassword ? "text" : "password"}
                                            id="password"
                                            label="Mật khẩu"
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
                                </Grid>
                            </>
                        }
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
                            <Grid item sm={5}>
                                <Button
                                    style={{ marginTop: 15, marginLeft: 3, border: "solid" }} 
                                    onClick={
                                        state.registerType === 'PHONE' ? 
                                            sendCodeToPhone
                                            : 
                                            sendCodeToMail
                                    }
                                    // variant="contained"
                                    color="secondary"
                                    className={classes.submit}
                                >
                                    <b>Nhận mã</b>
                                </Button>
                            </Grid>   
                        </Grid>
                        <Grid item xs={12}>
                            <FormControlLabel
                                control={<Checkbox value="allowExtraEmails" color="primary" />}
                                label="Tôi có muốn nhận thông báo qua email."
                            />
                        </Grid>
                    </Grid>
                    {
                        status ? <Alert severity="error">Email hay mật khẩu đã được sử dụng, vui lòng đăng ký lại!</Alert> : ''
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
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