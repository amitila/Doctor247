import React, { useState, useContext, useEffect } from 'react';
import './Doctor.css';
import DoctorTopNavbar from './DoctorTopNavbar';
import { makeStyles, Tooltip } from '@material-ui/core';
import DrBody from './DrBody';
import Profile from '../Profile/Profile';
import TimeTable from '../TimeTable/TimeTable';
import VideoCall from '../VideoCall/VideoCall';
import Notification from '../Notification/Notification';

import Chat from '../Chat/Chat';
import { AppContext } from '../../../store/AppProvider';
import MedicalRecords from '../MedicalRecord/MedicalRecords';
import APIService from '../../../utils/APIService';
import WorkPlace from '../WorkPlace/WorkPlace';
import QuestionList from '../QA/QuestionList';
import getToken from '../../../helpers/getToken';
import HomeOutlinedIcon from '@material-ui/icons/HomeOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import ScheduleOutlinedIcon from '@material-ui/icons/ScheduleOutlined';
import PlaceOutlinedIcon from '@material-ui/icons/PlaceOutlined';
import HelpOutlineOutlinedIcon from '@material-ui/icons/HelpOutlineOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import VideocamOutlinedIcon from '@material-ui/icons/VideocamOutlined';
import AccountBoxOutlinedIcon from '@material-ui/icons/AccountBoxOutlined';
import NotificationsActiveOutlinedIcon from '@material-ui/icons/NotificationsActiveOutlined';

const useStyles = makeStyles((theme) => ({
    sidebar__inner: {
        position: 'relative',
        height: '95%',
        overflow: 'auto'
    },
    profile: {
        display: 'flex',
        alignItems: 'center',
        color: '#fff',
        padding: '20px 0',
        whiteSpace: 'nowrap',
        transition: 'all 0.5s ease'
    },
    img: {
        padding: '0 18px',
        width: '50px'
    },
    firstChild: {
        fontSize: '14px',
        color: '#80cbc8',
        marginBottom: '3px'
    },
    ul_li_a: {
        color: '#fff',
        fontSize: '14px',
        padding: '10px 15px',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        marginBottom: '1px',
        whiteSpace: 'nowrap',
        transition: 'all 0.5s ease',
        '&:hover': {
            background: "#fff",
            color: '#004d40'
        },
        '&:active': {
            background: "#fff",
            color: '#004d40'
        }
    },
    currentMenuItem: {
        background: "#fff",
        color: '#004d40'
    },
    icon: {
        fontSize: '24px',
        width: '27px'
    },
    title: {
        display: 'block'
    },
    hideTitle: {
        display: 'none'
    },
    container: {
        marginTop: '40px',
        width: 'calc(100% - 210px)',
        marginLeft: '210px',
        padding: '20px',
        transition: 'all 0.5s ease'
    },
    containerX: {
        width: 'calc(100% - 60px)',
        marginLeft: '60px'
    },
    content: {
        border: '1px solid #e0f2f1',
        marginBottom: '30px',
        padding: '20px',
        fontSize: '14px',
        lineHight: '22px'
    },
    profile_info: {
        display: 'none'
    },
    sidebar: {
        height: '100%',
        position: 'fixed',
        top: '20px',
        left: '0',
        background: '#004d40',
        transition: 'all 0.5s ease'
    },
    sidebarOpen: {
        width: '200px'
    },
    sidebarClose: {
        width: '60px'
    }
}));


const ShowContent = (props) => {
    if (props.menuId === props.screenCode.HOME) {
        return (
            <DrBody myManagementClinics={props.myManagementClinics}/>
        );
    }
    else if (props.menuId === props.screenCode.MEDICAL_RECORD) {
        return (
            <MedicalRecords />
        );
    }
    else if (props.menuId === props.screenCode.TIMETABLE) {
        return (
            <TimeTable />
        );
    }
    else if (props.menuId === props.screenCode.WORK_PLACE) {
        return (
            <WorkPlace />
        );
    }
    else if (props.menuId === props.screenCode.QA) {
        return (
            <QuestionList />
        );
    }
    else if (props.menuId === props.screenCode.PROFILE) {
        return (
            <Profile />
        );
    }
    else if (props.menuId === props.screenCode.CHAT) {
        return (
            <Chat />
        );
    }
    else if (props.menuId === props.screenCode.VIDEO) {
        return (
            <VideoCall />
        );
    }
    else if (props.menuId === props.screenCode.NOTIFY) {
        return (
            <Notification />
        );
    }
    else {
        return (null);
    }
}

function Doctor() {
    const classes = useStyles();
    const { ScreenCode, currentMenuItem, setCurrentMenuItem } = useContext(AppContext);

    const [isShowSidabar, setIsShowSidebar] = useState(false);
    const [myManagementClinics, setMyManagementClinics] = useState([]);

    const token = getToken();

    useEffect(() => {
        APIService.getDoctorWorkPlaceManagement(token, "", {}, (success, json) => {
            if (success && json.result) {
                setMyManagementClinics(json.result);
            }
        });
    }, []);

    const menuRefClick = () => {
        setIsShowSidebar(!isShowSidabar);
    }

    return (
        <React.Fragment>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <div className="wrapper">
                <DoctorTopNavbar onClick={menuRefClick} myname="Dung" />
                <div>
                    <div className={[classes.sidebar, isShowSidabar ? classes.sidebarOpen : classes.sidebarClose].join(' ')}>
                        <div className={classes.sidebar__inner}>
                            <div className={classes.profile}>
                                <div className={classes.img}>
                                    {/* <img src={myimg} alt="profile_pic"/> */}
                                </div>
                                <div className={classes.profile_info}>
                                    <p className={classes.firstChild}>Welcome</p>
                                    <p className={classes.profile_name}>Ricardo Kaka</p>
                                </div>
                            </div>
                            <ul style={{ paddingLeft: '0', overflow: 'auto'}}>
                                <li onClick={() => { setCurrentMenuItem(ScreenCode.HOME) }}>
                                    <a className={[classes.ul_li_a, currentMenuItem === ScreenCode.HOME ? classes.currentMenuItem : ''].join(' ')} >
                                        <Tooltip title={isShowSidabar ? '' : <h6 style={{ color: "lightblue" }}>Trang chủ</h6>}><span className={classes.icon}><HomeOutlinedIcon /></span></Tooltip>
                                        <span className={isShowSidabar ? classes.title : classes.hideTitle}>Trang chủ</span>
                                    </a>
                                </li>
                                <li onClick={() => { setCurrentMenuItem(ScreenCode.TIMETABLE) }}>
                                    <a className={[classes.ul_li_a, currentMenuItem === ScreenCode.TIMETABLE ? classes.currentMenuItem : ''].join(' ')} >
                                        <Tooltip title={isShowSidabar ? '' : <h6 style={{ color: "lightblue" }}>Thời gian biểu</h6>}>
                                            <span className={classes.icon}><ScheduleOutlinedIcon /></span>
                                        </Tooltip>
                                        <span className={isShowSidabar ? classes.title : classes.hideTitle}>Thời gian biểu</span>
                                    </a>
                                </li>
                                <li onClick={() => { setCurrentMenuItem(ScreenCode.MEDICAL_RECORD) }}>
                                    <a className={[classes.ul_li_a, currentMenuItem === ScreenCode.MEDICAL_RECORD ? classes.currentMenuItem : ''].join(' ')} >
                                        <Tooltip title={isShowSidabar ? '' : <h6 style={{ color: "lightblue" }}>Quản lý bệnh án</h6>}>
                                            <span className={classes.icon}><DescriptionOutlinedIcon /></span>
                                        </Tooltip>
                                        <span className={isShowSidabar ? classes.title : classes.hideTitle}>Quản lý bệnh án</span>
                                    </a>
                                </li>
                                <li onClick={() => { setCurrentMenuItem(ScreenCode.WORK_PLACE) }}>
                                    <a className={[classes.ul_li_a, currentMenuItem === ScreenCode.WORK_PLACE ? classes.currentMenuItem : ''].join(' ')} >
                                        <Tooltip title={isShowSidabar ? '' : <h6 style={{ color: "lightblue" }}>Nơi làm việc</h6>}>
                                            <span className={classes.icon}><PlaceOutlinedIcon /></span>
                                        </Tooltip>
                                        <span className={isShowSidabar ? classes.title : classes.hideTitle}>Nơi làm việc</span>
                                    </a>
                                </li>
                                <li onClick={() => { setCurrentMenuItem(ScreenCode.QA) }}>
                                    <a className={[classes.ul_li_a, currentMenuItem === ScreenCode.QA ? classes.currentMenuItem : ''].join(' ')} >
                                        <Tooltip title={isShowSidabar ? '' : <h6 style={{ color: "lightblue" }}>Hỏi đáp</h6>}>
                                            <span className={classes.icon}><HelpOutlineOutlinedIcon /></span>
                                        </Tooltip>
                                        <span className={isShowSidabar ? classes.title : classes.hideTitle}>Hỏi đáp</span>
                                    </a>
                                </li>
                                <li onClick={() => { setCurrentMenuItem(ScreenCode.CHAT) }}>
                                    <a className={[classes.ul_li_a, currentMenuItem === ScreenCode.CHAT ? classes.currentMenuItem : ''].join(' ')} >
                                        <Tooltip title={isShowSidabar ? '' : <h6 style={{ color: "lightblue" }}>Nhắn tin</h6>}>
                                            <span className={classes.icon}><SmsOutlinedIcon /></span>
                                        </Tooltip>
                                        <span className={isShowSidabar ? classes.title : classes.hideTitle}>Nhắn tin</span>
                                    </a>
                                </li>
                                <li onClick={() => { setCurrentMenuItem(ScreenCode.VIDEO) }}>
                                    <a className={[classes.ul_li_a, currentMenuItem === ScreenCode.VIDEO ? classes.currentMenuItem : ''].join(' ')} >
                                        <Tooltip title={isShowSidabar ? '' : <h6 style={{ color: "lightblue" }}>Gọi video</h6>}>
                                            <span className={classes.icon}><VideocamOutlinedIcon /></span>
                                        </Tooltip>
                                        <span className={isShowSidabar ? classes.title : classes.hideTitle}>Gọi video</span>
                                    </a>
                                </li>
                                <li onClick={() => { setCurrentMenuItem(ScreenCode.PROFILE) }}>
                                    <a className={[classes.ul_li_a, currentMenuItem === ScreenCode.PROFILE ? classes.currentMenuItem : ''].join(' ')} >
                                        <Tooltip title={isShowSidabar ? '' : <h6 style={{ color: "lightblue" }}>Thông tin cá nhân</h6>}>
                                            <span className={classes.icon}><AccountBoxOutlinedIcon /></span>
                                        </Tooltip>
                                        <span className={isShowSidabar ? classes.title : classes.hideTitle}>Thông tin cá nhân</span>
                                    </a>
                                </li>
                                <li onClick={() => { setCurrentMenuItem(ScreenCode.NOTIFY) }}>
                                    <a className={[classes.ul_li_a, currentMenuItem === ScreenCode.NOTIFY ? classes.currentMenuItem : ''].join(' ')} >
                                        <Tooltip title={isShowSidabar ? '' : <h6 style={{ color: "lightblue" }}>Thông báo</h6>}>
                                            <span className={classes.icon}><NotificationsActiveOutlinedIcon /></span>
                                        </Tooltip>
                                        <span className={isShowSidabar ? classes.title : classes.hideTitle}>Thông báo</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={[classes.container, isShowSidabar ? '' : classes.containerX].join(' ')}>
                        <div className={classes.content}>
                            <ShowContent menuId={currentMenuItem} screenCode={ScreenCode} myManagementClinics={myManagementClinics}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Doctor;