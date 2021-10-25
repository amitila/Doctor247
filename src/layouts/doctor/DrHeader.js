import React, { Component } from 'react';
import './../../App.css';
import './../../pages/doctor/home/DrHome.css';
import { Link } from 'react-router-dom';

class DrHeader extends Component {

    render() {
        return (
            <div className="home">
                <nav>
                    <input type="checkbox" id="check"></input>
                    <label for="check" className="checkbtn">
                        <i className="fas fa-bars"></i>
                    </label>
                    <label className="logo">Doctor247</label>
                    <ul>
                        <li><a><Link to="/doctor">Trang chủ</Link></a></li>
                        <li><Link to="/doctor">Quản lý bệnh án</Link></li>
                        <li><Link to="/test">Thông tin cá nhân</Link></li>
                        <li><Link to="/profile">Liên hệ</Link></li>
                        <li><Link to="/login">Đăng xuất</Link></li>
                    </ul>
                </nav>
            </div>
        );
    }
}

export default DrHeader;
