import React from 'react';
import DrHeader from '../../../layouts/doctor/DrHeader';
import imgAvt from './../../../assets/user.png';
import './../../doctor/test/Profile.css';

function Profile(props) {
    return (
        <React.Fragment>
            <div>
                <div className="row">
                    {/* <div className="col-md-4 mt-1">
                        <div className="card text-center slidebar">
                            <div className="card-body">
                                <img src={imgAvt} className="rounded-circle" width="150" />
                                <div className="mt-3">
                                    <h1>Ricardo Kaka</h1>
                                    <a href="#">---</a>
                                    <a href="#">---</a>
                                </div>
                            </div>
                        </div>

                        <div className="card mb-3 content">
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Chuyên khoa</h6>
                                    </div>
                                    <div className="col-md-6 text-secondary">
                                        Đa khoa
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <h6>Ngày sinh</h6>
                                    </div>
                                    <div className="col-md-6 text-secondary">
                                        12/01/1998
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}

                    <div className="col-md-8 mt-1">
                        <div className="card mb-3 content">
                            
                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h1 m-3 pt-3>Thông tin cơ bản</h1>
                                    </div>
                                    <div className="col-md-3">
                                        <h6>Edit</h6>
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Chức vụ</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        Bác sĩ
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Chuyên khoa</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        Đa khoa
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Nơi làm việc</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        TP. Hồ Chí Minh
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Email</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        kaka@gmail.com
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>SDT</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        0251456475
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Ghi chú</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        Không
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="card mb-3 content">
                            <h1 className="m-3">Lịch sử công tác</h1>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>2010 - 2014</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        BV Nhân Dân
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>2015 - 2021</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        BV Nhi Đồng
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Profile;