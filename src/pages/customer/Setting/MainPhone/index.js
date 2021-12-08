import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
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
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: '100%',
        margin: "auto",
        border: "#b7dde8 solid 5px",
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

export default function AddPhoneNumber() {
    const classes = useStyles();
    const history = useHistory();

    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [code, setCode] = useState('');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        confirmAddPhoneNumber();
        setOpen(false);
    };

    const confirmAddPhoneNumber = (event) => {
        const token = getToken();
        APIService.addPhoneNumberOrEmail(
            token, 
            code,
            (success, json) => {
            if (success && json.result) {
                alert("Thêm số điện thoại THÀNH CÔNG!")
                return history.push('/home')
            } else {
                return alert("THẤT BẠI")
            }
        })
    }

    const onSubmit = (event) => {
        event.preventDefault();
        if(password && phoneNumber) {
            const token = getToken();
            APIService.getCodeToAddPhoneNumber(
                token, 
                password, 
                phoneNumber, 
                (success, json) => {
                if (success && json.result) {
                    handleClickOpen()
                    return alert("Vui lòng kiểm tra tin nhắn!")
                } else {
                    return alert("Không gửi được")
                }
            })
        }
        else {
            return alert('Vui lòng nhập mật khẩu và số điện thoại bạn muốn thêm vào!')
        }
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <AddIcCallIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Thêm số điện thoại cho tài khoản
                </Typography>
                <form className={classes.form} onSubmit={onSubmit}>
                    <TextField
                        className={classes.textField}
                        variant="standard"
                        margin="normal"
                        required
                        fullWidth
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
                        id="phoneNumber"
                        label="Số điện thoại được thêm"
                        name="phoneNumber"
                        autoComplete="phoneNumber"
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                            Để xác nhận thêm số điện thoại này vào tài khoản của bạn, vui lòng nhập mã xác thực đã được gửi từ ứng dụng vào số điện thoại của bạn
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
            </div>
        </Container>
    );
}