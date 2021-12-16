import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AppContext } from '../../../store/AppProvider';
import './Doctor.css';
import Cookies from 'universal-cookie';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import TextField from "@material-ui/core/TextField";
import { useSnackbar } from 'notistack';
import APIService from '../../../utils/APIService';
import getToken from '../../../helpers/getToken';

function ConfirmationDialogRaw(props) {
    const { onClose, open } = props;
    const [currentPassword, setCurrentPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [newPassword2, setNewPassword2] = React.useState('');
    const radioGroupRef = React.useRef(null);
    const { enqueueSnackbar } = useSnackbar();

    const token = getToken();

    const handleEntering = () => {
      if (radioGroupRef.current != null) {
        radioGroupRef.current.focus();
      }
    };

    const handleConfirm = () => {
        if (currentPassword.length === 0 || newPassword2.length === 0 || newPassword2.length === 0 ) {
            enqueueSnackbar('Bạn chưa nhập đủ thông tin.', { variant: 'error' });
            return;
        }
        if (newPassword !== newPassword2) {
            enqueueSnackbar('Mật khẩu mới không trùng khớp.', { variant: 'error' });
            return;
        }
        APIService.putDoctorPassword(
            token,
            {
                password: currentPassword,
                newPassword: newPassword
            },
            (success, json) => {
                if (success, json.result) {
                    console.log(json.result);
                    setCurrentPassword('');
                    setNewPassword('');
                    setNewPassword2('');
                    enqueueSnackbar('Thay đổi mật khẩu thành công.', { variant: 'success' });
                    onClose();
                }
                else {
                    enqueueSnackbar('Nhập sai mật khẩu hiện tại.', { variant: 'error' });
                    console.log(json);
                }
            }
        );
    }

    const handleCancel = () => {
        onClose();
        setCurrentPassword('');
        setNewPassword('');
        setNewPassword2('');
    }

    return (
        <Dialog
            fullWidth
            onEntering={handleEntering}
            aria-labelledby="confirmation-dialog-title"
            open={open}
        >
            <DialogTitle id="confirmation-dialog-title">Đổi mật khẩu</DialogTitle>
            <DialogContent dividers>
                <TextField
                    id="standard-multiline-flexible1"
                    label="Mật khẩu hiện tại"
                    fullWidth
                    required
                    type="password"
                    style={{marginBottom: 15}}
                    onChange={(e) => { setCurrentPassword(e.target.value) }}
                    value={currentPassword}
                />
                <TextField
                    id="standard-multiline-flexible2"
                    label="Mật khẩu mới"
                    fullWidth
                    required
                    type="password"
                    style={{marginBottom: 15}}
                    onChange={(e) => { setNewPassword(e.target.value) }}
                    value={newPassword}
                />
                <TextField
                    id="standard-multiline-flexible3"
                    label="Nhập lại mật khẩu mới"
                    fullWidth
                    required
                    type="password"
                    style={{marginBottom: 15}}
                    onChange={(e) => { setNewPassword2(e.target.value) }}
                    value={newPassword2}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleConfirm} variant="outlined" color="primary">
                    Ok
                </Button>
                <Button autoFocus onClick={handleCancel} variant="outlined" color="secondary">
                    Hủy
                </Button>
            </DialogActions>
        </Dialog>
    );
}

ConfirmationDialogRaw.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
};

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
    paper: {
        width: 360,
    },
}));

function DoctorTopNavbar(props) {
    const classes = useStyles();
    const [openChangePassword, setOpenChangePassword] = React.useState(false);
    const [value, setValue] = React.useState('Dione');
    const [anchorEl, setAnchorEl] = useState(null);
    const cookies = new Cookies();

    const { history } = useContext(AppContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangePassword = () => {
        setAnchorEl(null);
        setOpenChangePassword(true);
    }

    const handleLogout = () => {
        cookies.remove("token");
        document.cookie = "token" + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        history.push('/signin');
        window.location.reload();
    }

    return (
        <React.Fragment>
            <ConfirmationDialogRaw
                classes={{
                    paper: classes.paper,
                }}
                id="ringtone-menu"
                keepMounted
                open={openChangePassword}
                onClose={() => {setOpenChangePassword(false)}}
            />
            <div className="top_navbar">
                <div className="hamburger" onClick={props.onClick}>
                    <div className="hamburger__inner">
                        <div className="one"></div>
                        <div className="two"></div>
                        <div className="three"></div>
                    </div>
                </div>

                <div className="menu">
                    <div className="logo">
                        Doctor 247
                    </div>
                    <div className="right_menu">
                        <ul>
                            <li>
                                <i className="fas fa-user" onClick={handleClick}></i>
                                <Menu
                                    id="simple-menu"
                                    anchorEl={anchorEl}
                                    keepMounted
                                    open={Boolean(anchorEl)}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={handleChangePassword}>Đổi mật khẩu</MenuItem>
                                    <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                                </Menu>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default DoctorTopNavbar;