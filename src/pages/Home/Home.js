import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './../../App.css';

class Home extends Component {

  render() {
      return (
        <div className="header" >
            {/* <div className="hLeft">
                <ul>
                    <li><Link className="active" to="/home">Trang chủ</Link></li>
                    <li><Link to="/listDoctors">Danh sách Y Bác sĩ</Link></li>
                    <li><Link to="/appointment">Đặt lịch khám</Link></li>
                    <li><Link to="/profile">Hồ sơ cá nhân</Link></li>
                    <li><Link to="/notice">Thông báo</Link></li>
                </ul>
            </div>
            <div className="hRight">
                <ul>
                    <li><Link to="/login">Đăng nhập</Link></li>
                    <li><Link to="/register">Đăng ký</Link></li>
                </ul>
            </div> */}
        </div>
      );
  }
}

export default Home;
