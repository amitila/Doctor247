import React from 'react';
import {Link} from 'react-router-dom';

const Header = () => {
    return (
        <div>
            <div className="header">
                <div>
                    <h2>Doctor 24/7</h2>
                </div>
                <ul>
                    <li　className="left"><Link className="active" to="/home">Trang chủ</Link></li>
                    <li className="left"><Link to="/listDoctors">Danh sách Y Bác sĩ</Link></li>
                    <li className="left"><Link to="/appointment">Đặt lịch khám</Link></li>
                    <li className="left"><Link to="/profile">Hồ sơ cá nhân</Link></li>
                    <li className="left"><Link to="/notice">Thông báo</Link></li>
                    <li className="right"><Link to="/register">Đăng ký</Link></li>
                    <li className="right"><Link to="/login">Đăng nhập</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default Header;
