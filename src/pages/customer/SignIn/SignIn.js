import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import AssignmentIndOutlinedIcon from "@material-ui/icons/AssignmentIndOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { Link as LinkTo } from "react-router-dom";
import APIService from '../../../utils/APIService';
import Cookies from 'universal-cookie';
import { useDispatch } from "react-redux";
import { updateRole, updateEmail, updatePassword } from "../../../store/userSlice";
import Alert from '@mui/material/Alert';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.info.light,
    },
    form: {
        width: "100%", // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    textField: {
        border: "#303F9F solid 2px",
        borderRadius: 5,
        padding: '5px 0px 0px 10px',
    },
}));

export default function SignIn() {
    const classes = useStyles();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const cookies = new Cookies();

    const handleClickShowPassword = () => {
       setShowPassword(!showPassword);
    };

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePass = (event) => {
        setPassword(event.target.value);
    }
    
    const history = useHistory();
    const dispatch = useDispatch();

    const [status, setStatus] = React.useState(false);
    const onSignIn = (event) => {
        event.preventDefault();
        APIService.signIn(email, password, (success, json) => {
            if(success && json.result){
                dispatch(updateRole(json.result.role));
                dispatch(updateEmail(email));
                dispatch(updatePassword(password));
                const timestamp = new Date().getTime();
                const expire = timestamp + (60*60*24*1000*3);
                const expireDate = new Date(expire);
                cookies.set("token", json.result.token, {path: '/', expires: expireDate });
                if(json.result.role === "CUSTOMER"){
                    return history.push("/home");
                }
                else if(json.result.role === "DOCTOR"){
                    return history.push("/doctor/home");
                }
            } else {
                setStatus(true);
            }
        }) 
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AssignmentIndOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đăng nhập
                </Typography>
                <form className={classes.form} onSubmit={onSignIn} >
                    <TextField
                        className={classes.textField}
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Tên đăng nhập"
                        name="email"
                        type="text"
                        onChange={handleChangeEmail}
                        autoComplete="email"
                        autoFocus
                    />
                    <Grid container xs={12}>
                        <Grid item sm={11}>
                            <TextField
                                className={classes.textField}
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                name="password"
                                label="Mật khẩu"
                                type={showPassword ? "text": "password"}
                                onChange={handleChangePass}
                                autoComplete="current-password"
                            />
                        </Grid>
                        <Grid item sm={1}>
                            <Box style={{marginTop: 30, marginLeft: 3, border: "solid"}} onClick={handleClickShowPassword}>
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </Box>
                        </Grid>
                    </Grid>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Nhớ mật khẩu"
                    />
                    {
                        status ? <Alert severity="warning">Email hoặc mật khẩu không đúng, vui lòng đăng nhập lại!</Alert> : ''
                    }
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Đăng nhập
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            <LinkTo to="/forgotpass" variant="body2">
                                Quên mật khẩu?
                            </LinkTo>
                        </Grid>
                        <Grid item>
                            <LinkTo to="/signup" variant="body2">
                                Tôi chưa có tài khoản? Đăng ký
                            </LinkTo>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>{/* add text */}</Box>
        </Container>
    );
}
