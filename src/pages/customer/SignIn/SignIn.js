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
import { updateEmail, updatePassword } from "../../../store/userSlice";

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
    const cookies = new Cookies();

    const handleChangeEmail = (event) => {
        setEmail(event.target.value);
    }
    const handleChangePass = (event) => {
        setPassword(event.target.value);
    }
    
    const history = useHistory();
    const dispatch = useDispatch();

    const onSignIn = () => {
        console.log("logined");
        APIService.signIn(email, password, (success, json) => {
            if(success && json.result){
                dispatch(updateEmail(email));
                dispatch(updatePassword(password));
                const timestamp = new Date().getTime();
                const expire = timestamp + (60*60*24*1000*3);
                const expireDate = new Date(expire);
                cookies.set("token", json.result.token, {path: '/', expires: expireDate });
                return history.push("/home");
            } else {
                return history.push("/signin");
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
                <form className={classes.form} noValidate>
                    <TextField
                        className={classes.textField}
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Địa chỉ email"
                        name="email"
                        onChange={handleChangeEmail}
                        autoComplete="email"
                        autoFocus
                    />
                    <TextField
                        className={classes.textField}
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        name="password"
                        label="Mật khẩu"
                        type="password"
                        onChange={handleChangePass}
                        autoComplete="current-password"
                    />
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Nhớ mật khẩu"
                    />
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={onSignIn}
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
                                {"Tôi chưa có tài khoản? Đăng ký"}
                            </LinkTo>
                        </Grid>
                    </Grid>
                </form>
            </div>
            <Box mt={8}>{/* add text */}</Box>
        </Container>
    );
}
