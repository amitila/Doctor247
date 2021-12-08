import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import PasswordIcon from '@mui/icons-material/Password';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';
import { useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '100%',
        margin: "auto",
        border: "#64b5f6 solid 5px",
        borderRadius: 10,
        padding: '10px',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.info.light,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
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

export default function ChangePassword() {
    const classes = useStyles();
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPassword_1, setNewPassword_1] = useState('');
    const [view, setView] = useState(false);

    const onSubmit = (event) => {
        event.preventDefault();
        if(newPassword.length < 4 || newPassword_1.length < 4) {
            return alert('Mật khẩu phải có độ dài từ 4 ký tự trở lên, vui lòng nhập lại!')
        }
        else if(newPassword !== newPassword_1) {
            return alert('Mật khẩu cũ không đúng hay hai lần nhập mật khẩu mới không trùng nhau, vui lòng nhập lại!')
        }
        else {
            const token = getToken();
            APIService.changePassword(
                token,
                password,
                newPassword,
                (success, json) => {
                    if (success && json.result) {
                        alert("Đổi mật khẩu THÀNH CÔNG !");
                        return history.push('/home')
                    } else {
                        return alert("THẤT BẠI !");
                    }
                })
        }  
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <PasswordIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Đổi mật khẩu
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        className={classes.textField}
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        type= {view ? 'text' : 'password'}
                        id="password"
                        label="Mật khẩu hiện tại"
                        name="password"
                        autoComplete="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <TextField
                        className={classes.textField}
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        type= {view ? 'text' : 'password'}
                        id="newPassword"
                        label="Mật khẩu mới"
                        name="newPassword"
                        autoComplete="newPassword"
                        onChange={(e) => setNewPassword(e.target.value)}
                    />
                    <TextField
                        className={classes.textField}
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
                        type= {view ? 'text' : 'password'}
                        id="newPassword_1"
                        label="Nhập lại mật khẩu mới"
                        name="newPassword_1"
                        autoComplete="newPassword_1"
                        onChange={(e) => setNewPassword_1(e.target.value)}
                    />
                    <Button
                        style={{ marginTop: 15, marginLeft: 3, border: "solid" }} 
                        onClick={() => setView(!view)}
                        // variant="contained"
                        color="main"
                        className={classes.submit}
                    >
                        <b>{view ? 'Ẩn mật khẩu' : 'Xem rõ'}</b>
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                    >
                        Xác nhận đổi
                    </Button>
                </form>
            </div>
        </Container>
    );
}