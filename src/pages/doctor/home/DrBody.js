import React, { Component } from 'react';
import userImg from '../../../assets/user.png';
import './../../../App.css';
import './../home/DrHome.css';
import PatientRecord from './../home/PatientRecord';

class DrBody extends Component {

  render() {
      return (
        <div className="body">
            <div className="cards">
                <div className="card-single">
                    <div>
                        <h1>3</h1>
                        <span>Tin nhắn mới</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className="card-single">
                    <div>
                        <h1>44</h1>
                        <span>Hồ sơ</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className="card-single">
                    <div>
                        <h1>13</h1>
                        <span>Yêu cầu mới</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className="card-single">
                    <div>
                        <h1>2</h1>
                        <span>Thông báo</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>
            </div>

            <div className="recent-grid">
                <div className="projects">
                    <div class="card">
                        <div className="card-header">
                            <h3>Các hồ sơ hiện tại</h3>

                            <button>More</button>
                        </div>
                        <div className="card-body">
                            <table width="100%">
                                {/* <thead>
                                    <tr>
                                        <td>ID</td>
                                        <td>Name</td>
                                        <td>Description</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1011</td>
                                        <td>Hồ sơ 1</td>
                                        <td>
                                            <span className="status"></span>
                                            mô tả 1
                                        </td>
                                    </tr>
                                </tbody> */}
                                <PatientRecord/>

                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="customers">
                    <div className="card">
                        <div className="card-header">
                            <h3>Liên lạc</h3>

                            <button>More</button>
                        </div>

                        <div className="card-body">
                            <div className="customer">
                                <div>
                                    <img src={userImg} width="40px" height="40px" alt=""></img>
                                    <div>
                                        <h4>User 1</h4>
                                        <small>Online</small>
                                    </div>
                                </div>
                            </div>

                            <div className="customer">
                                <div>
                                    <img src={userImg} width="40px" height="40px" alt=""></img>
                                    <div>
                                        <h4>User 2</h4>
                                        <small>Online</small>
                                    </div>
                                </div>
                            </div>

                            <div className="customer">
                                <div>
                                    <img src={userImg} width="40px" height="40px" alt=""></img>
                                    <div>
                                        <h4>User 3</h4>
                                        <small>Online</small>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
      );
  }
}

export default DrBody;
