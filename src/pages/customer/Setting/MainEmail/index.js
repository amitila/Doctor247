import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import APIService from '../../../../utils/APIService';
import getToken from '../../../../helpers/getToken';
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

export default function AddEmail() {
    const classes = useStyles();
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');

    const [auth, setAuth] = useState(false);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        confirmAddEmail();
        setOpen(false);
    };

    const verifyPhone = () => {
        const token = getToken();
        APIService.verifyPhoneNumberBeforeAddEmail(
            token, 
            (success, json) => {
            if (success && json.result) {
                alert('Vui lòng kiểm tra tin nhắn')
                return setAuth(true)
            } else {
                return alert("Không gửi được")
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        const token = getToken();
        APIService.getCodeToAddEmail(
            token, 
            password,
            email,
            code,
            (success, json) => {
            if (success && json.result) {
                alert("Vui lòng kiểm tra mail!")
                handleClickOpen()
            } else {
                return alert("Không gửi được hay mail không đúng")
            }
        })
    }

    const confirmAddEmail = () => {
        const token = getToken();
        APIService.addPhoneNumberOrEmail(
            token, 
            code,
            (success, json) => {
            if (success && json.result) {
                alert("Thêm địa chỉ email THÀNH CÔNG!")
                return history.push('/home')
            } else {
                return alert("THẤT BẠI")
            }
        })
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AlternateEmailIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Thêm email cho tài khoản
                </Typography>
                {
                    auth ? 
                        <form className={classes.form} onSubmit={onSubmit}>
                            <TextField
                                className={classes.textField}
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                id="password"
                                label="Tạo mật khẩu"
                                name="password"
                                autoComplete="password"
                                onChange={(e)=>setPassword(e.target.value)}
                            />
                            <TextField
                                className={classes.textField}
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                id="email"
                                label="Email được"
                                name="email"
                                autoComplete="email"
                                onChange={(e)=>setEmail(e.target.value)}
                            />
                            {/* <Button
                                style={{ marginTop: 15, marginLeft: 3, border: "solid" }} 
                                onClick={getCode}
                                // variant="contained"
                                color="secondary"
                                className={classes.submit}
                            >
                                <b>Nhận mã</b>
                            </Button> */}
                            <TextField
                                className={classes.textField}
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                id="code"
                                label="Mã OTP đã gửi về tin nhắn cho bạn"
                                name="code"
                                autoComplete="code"
                                onChange={(e)=>setCode(e.target.value)}
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Xác nhận
                            </Button>
                            <Dialog open={open} onClose={handleClose}>
                                <DialogTitle>Nhập mã kích hoạt trong email</DialogTitle>
                                <DialogContent>
                                <DialogContentText>
                                    Để xác nhận thêm email này vào tài khoản của bạn, vui lòng nhập mã xác thực đã được gửi từ ứng dụng vào mail của bạn
                                </DialogContentText>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="code"
                                        label="Mã OTP"
                                        type="code"
                                        fullWidth
                                        variant="standard"
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Hủy xác nhận</Button>
                                    <Button onClick={handleClose}>Xác nhận</Button>
                                </DialogActions>
                            </Dialog>
                        </form>
                    :
                    <Button
                        type="button"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={verifyPhone}
                    >
                        Nhận mã xác thực số điện thoại qua tin nhăn
                    </Button>
                }
            </div>
        </Container>
    );
}