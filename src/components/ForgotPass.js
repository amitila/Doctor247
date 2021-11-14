import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { Link as LinkTo } from 'react-router-dom';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { useHistory } from "react-router-dom";
import APIService from '../utils/APIService';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import getToken from '../helpers/getToken';

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

export default function ForgotPassword() {
    const classes = useStyles();
    const history = useHistory();

    const [type, setType]= useState('EMAIL');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword_1, setNewPassword_1] = useState('');
    const [code, setCode] = useState('');
   
    const onChangePass = (event) => {
        event.preventDefault();
        if(newPassword !== newPassword_1) {
            return alert('Mật khẩu mới nhập lại không trùng mật khẩu mới');
        }
        else {
            const token = getToken();
            APIService.forgotPassword(
                token, 
                newPassword, 
                code, 
                type, 
                email, 
                phoneNumber, 
                (success, json) => {
                if (success && json.result) {
                    alert("Tạo mật khẩu mới THÀNH CÔNG!")
                    return history.push('/home');
                } else {
                    return alert("THẤT BẠI")
                }
            })
        }
    }

    const [showPassword, setShowPassword] = React.useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const sendCodeToPhone = () => {
        if(phoneNumber === '') {
            alert("Bạn chưa nhập số điện thoại!")
        }
        else {
            APIService.forgotPasswordSms(phoneNumber, (success, json) => {
                if (success && json.result) {
                    return alert("Vui lòng kiểm tra tin nhắn!")
                } else {
                    return alert("Không gửi được!")
                }
            })
        }
    }

    const sendCodeToMail = () => {
        if(email === '') {
            alert("Bạn chưa nhập email!")
        }
        else {
            APIService.forgotPasswordMail(email, (success, json) => {
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
                    <VpnKeyIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Quên mật khẩu - Tạo mật khẩu mới
                </Typography>
                <form className={classes.form} onSubmit={onChangePass} >
                    <Grid container spacing={2}>
                        <Grid spacing={5} className={classes.rowgender} >
                            <Grid item xs={12}>
                                <FormControl required className={classes.gender} component="fieldset">
                                    <FormLabel component="legend">Loại xác thực:</FormLabel>
                                    <RadioGroup
                                        row aria-label="gender"
                                        name="type"
                                        value={type}
                                        onChange={(e) => setType(e.target.value)}
                                    >
                                        <FormControlLabel value="EMAIL" control={<Radio required />} label="Nhận mã đổi mật khẩu qua mail" />
                                        <FormControlLabel value="PHONE" control={<Radio />} label="Nhận mã đổi mật khẩu qua số điện thoại" />
                                    </RadioGroup>
                                </FormControl>
                            </Grid>
                        </Grid>
                        {
                            type === 'PHONE' ?
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.textField}
                                    variant="standard"
                                    required
                                    fullWidth
                                    id="phoneNumber"
                                    label="Số điện thoại đã đăng ký"
                                    name="phoneNumber"
                                    type="number"
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    autoComplete="current-phoneNumber"
                                />
                            </Grid> :
                            <Grid item xs={12}>
                                <TextField
                                    className={classes.textField}
                                    variant="standard"
                                    required
                                    fullWidth
                                    id="email"
                                    label="Địa chỉ email đã đăng ký"
                                    name="email"
                                    type="email"
                                    onChange={(e) => setEmail(e.target.value)}
                                    autoComplete="email"
                                />
                            </Grid>
                        }
                        <Grid container item xs={12}>
                            <Grid item sm={11}>
                                <TextField
                                    className={classes.textField}
                                    variant="standard"
                                    required
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword"
                                    label="Mật khẩu mới"
                                    name="newPassword"
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    autoComplete="newPassword"
                                />
                            </Grid>
                            <Grid item sm={1}>
                                <Box style={{ marginTop: 15, marginLeft: 3, border: "solid" }} onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </Box>
                            </Grid>   
                        </Grid>
                        <Grid container item xs={12}>
                            <Grid item sm={11}>
                                <TextField
                                    className={classes.textField}
                                    variant="standard"
                                    required
                                    fullWidth
                                    type={showPassword ? "text" : "password"}
                                    id="newPassword_1"
                                    label="Nhập lại mật khẩu mới"
                                    name="newPassword_1"
                                    onChange={(e) => setNewPassword_1(e.target.value)}
                                    autoComplete="newPassword_1"
                                />
                            </Grid>
                            <Grid item sm={1}>
                                <Box style={{ marginTop: 15, marginLeft: 3, border: "solid" }} onClick={handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </Box>
                            </Grid>   
                        </Grid>
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
                                    onChange={(e) => setCode(e.target.value)}
                                    autoComplete="current-code"
                                />
                            </Grid>
                            <Grid item sm={5}>
                                <Button
                                    style={{ marginTop: 15, marginLeft: 3, border: "solid" }} 
                                    onClick={
                                        type === 'PHONE' ? 
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
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Xác nhận
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <LinkTo to="/signin" variant="body2">
                                Quay về Đăng nhập
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