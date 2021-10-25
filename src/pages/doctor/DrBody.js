import React, { useContext } from 'react';
import userImg from './../../assets/user.png';
import './../../App.css';
import './DrHome.css';
import PatientRecord from './PatientRecord';
import { DoctorContext } from './DoctorProvider';

export default function DrBody() {

    const { ScreenCode, setCurrentMenuItem } = useContext(DoctorContext);

    const handleContactClick = () => {
        window.open("http://localhost:3000/videocall?id=a?name=dung", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=1200,height=800");
    }

    return (
        <div className="body">
            <div className="cards">
                <div className="card-single" onClick={() => {setCurrentMenuItem(ScreenCode.CHAT)}}>
                    <div>
                        <h1>3</h1>
                        <span>Tin nhắn mới</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className="card-single" onClick={() => {setCurrentMenuItem(ScreenCode.MEDICAL_RECORDS)}}>
                    <div>
                        <h1>44</h1>
                        <span>Hồ sơ</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className="card-single" onClick={() => {setCurrentMenuItem(ScreenCode.WORK_PLAN)}}>
                    <div>
                        <h1>13</h1>
                        <span>Yêu cầu mới</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className="card-single" onClick={() => {setCurrentMenuItem(ScreenCode.NOTIFY)}}>
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
                            <h3>Lịch hẹn sắp tới</h3>

                            <button>More</button>
                        </div>
                        <div className="card-body">
                            <table width="100%">
                                <PatientRecord />

                            </table>
                        </div>
                    </div>
                </div>

                <div className="customers">
                    <div className="card">
                        <div className="card-header">
                            <h3>Liên lạc</h3>
                            <button onClick={handleContactClick}>More</button>
                        </div>

                        <div className="card-body">
                            <div className="customer">
                                <div className="info">
                                    <img src={userImg} width="40px" height="40px" alt=""></img>
                                    <div>
                                        <h4>Max Agleri</h4>
                                        <small>Online</small>
                                    </div>
                                </div>
                            </div>

                            <div className="customer">
                                <div className="info">
                                    <img src={userImg} width="40px" height="40px" alt=""></img>
                                    <div>
                                        <h4>Atonio Conte</h4>
                                        <small>Online</small>
                                    </div>
                                </div>
                            </div>

                            <div className="customer">
                                <div className="info">
                                    <img src={userImg} width="40px" height="40px" alt=""></img>
                                    <div>
                                        <h4>Thomas Tuchel</h4>
                                        <small>Online</small>
                                    </div>
                                </div>
                            </div>

                            <div className="customer">
                                <div className="info">
                                    <img src={userImg} width="40px" height="40px" alt=""></img>
                                    <div>
                                        <h4>Jurgen Klop</h4>
                                        <small>Offline</small>
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

