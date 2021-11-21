import React, { useContext, useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { DoctorContext } from './DoctorProvider';
import './Doctor.css';

function DoctorTopNavbar(props) {
    const [anchorEl, setAnchorEl] = useState(null);

    const { history } = useContext(DoctorContext);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleChangePassword = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        localStorage.removeItem("token_doctor247");
        history.push("/signin");
    }

    return (
        <React.Fragment>            
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