import React, {useState, useContext, useMemo } from 'react';
import './Doctor.css';
import DoctorTopNavbar from './DoctorTopNavbar';
import { makeStyles, Tooltip } from '@material-ui/core';
import DrBody from './DrBody';
import Checkout from '../Test/Checkout';
import Profile from './Profile';
import WorkPlan from './WorkPlan';

import ChatRoom from './ChatRoom/ChatRoom';
import { DoctorContext } from './DoctorProvider';
import MedicalRecords from './MedicalRecords';
import { useEffect } from 'react/cjs/react.development';


const useStyles = makeStyles((theme) => ({
    sidebar__inner: {
        position: 'relative'
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
        fontSize: '18px',
        padding: '20px 20px',
        display: 'flex',
        alignItems: 'center',
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
        marginRight: '15px',
        fontSize: '28px'
    },
    title: {
        display: 'block'
    },
    hideTitle: {
        display: 'none'
    },
    container: {
        marginTop: '40px',
        width: 'calc(100% - 225px)',
        marginLeft: '225px',
        padding: '20px',
        transition: 'all 0.5s ease'
    },
    containerX: {
        width: 'calc(100% - 80px)',
        marginLeft: '80px'
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
        width: '250px',
        height: '100%',
        position: 'fixed',
        top: '60px',
        left: '0',
        background: '#004d40',
        transition: 'all 0.5s ease'
    },
    sidebarOpen: {
        width: '250px'
    },
    sidebarClose: {
        width: '80px'
    }
}));


const ShowContent = (props) => {
    if(props.menuId === props.screenCode.HOME){
        return(
            <DrBody/>
        );
    }
    else if(props.menuId === props.screenCode.MEDICAL_RECORDS){
        return(
            <MedicalRecords/>
        );
    }
    else if(props.menuId === props.screenCode.WORK_PLAN){
        return(
            <WorkPlan/>
        );
    }
    else if (props.menuId === props.screenCode.PROFILE) {
        return (
            <Profile />
        );
    }
    else if(props.menuId === props.screenCode.CHAT){
        return(
            <ChatRoom/>
        );
    }
    else if(props.menuId === props.screenCode.FORM){
        return(
            <Checkout/>
        );
    }
    else{
        return(null);
    }
}

function Doctor() {
    const classes = useStyles();

    const [isShowSidabar, setIsShowSidebar] = useState(false);

    //const [currentMenuItem, setCurrentMenuItem] = useState(4);
    const {ScreenCode, currentMenuItem ,setCurrentMenuItem, user} = useContext(DoctorContext);

    useEffect(() => {
    }, [user]);

    const menuRefClick = () => {
        setIsShowSidebar(!isShowSidabar);
    }

    return (
        <React.Fragment>
            <script src="https://kit.fontawesome.com/8d6784f1e8.js" crossorigin="anonymous"></script>
            <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
            <div className="wrapper">
                <DoctorTopNavbar onClick={menuRefClick} myname="Dung"/>
                <div>
                    <div className={[classes.sidebar, isShowSidabar?classes.sidebarOpen:classes.sidebarClose].join(' ')}>
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
                            <ul style={{paddingLeft:'0'}}>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.HOME)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem===ScreenCode.HOME?classes.currentMenuItem:''].join(' ')} >
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Trang chủ</h4>}><span className={classes.icon}><i class="fas fa-home"></i></span></Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Trang chủ</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.MEDICAL_RECORDS)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem===ScreenCode.MEDICAL_RECORDS?classes.currentMenuItem:''].join(' ')} >
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Quản lý bệnh án</h4>}>
                                            <span className={classes.icon}><i class="fas fa-book-medical"></i></span>
                                        </Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Quản lý bệnh án</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.WORK_PLAN)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem===ScreenCode.WORK_PLAN?classes.currentMenuItem:''].join(' ')} >
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Lịch làm việc</h4>}>
                                            <span className={classes.icon}><i class="fas fa-calendar-alt"></i></span>
                                        </Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Lịch làm việc</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.CHAT)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem===ScreenCode.CHAT?classes.currentMenuItem:''].join(' ')} >
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Nhắn tin</h4>}>
                                            <span className={classes.icon}><i class="far fa-comments"></i></span>
                                        </Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Nhắn tin</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.TEST)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem===ScreenCode.TEST?classes.currentMenuItem:''].join(' ')} >
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Gọi video</h4>}>
                                            <span className={classes.icon}><i class="fas fa-video"></i></span>
                                        </Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Gọi video</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.PROFILE)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem===ScreenCode.PROFILE?classes.currentMenuItem:''].join(' ')} >
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Thông tin cá nhân</h4>}>
                                            <span className={classes.icon}><i class="fas fa-user-edit"></i></span>
                                        </Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Thông tin cá nhân</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.NOTIFY)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem===ScreenCode.NOTIFY?classes.currentMenuItem:''].join(' ')} >
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Thông báo</h4>}>
                                            <span className={classes.icon}><i class="fas fa-bell"></i></span>
                                        </Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Thông báo</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.FORM)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem===ScreenCode.FORM?classes.currentMenuItem:''].join(' ')} >
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Form đăng ký</h4>}>
                                            <span className={classes.icon}><i className="fab fa-delicious"></i></span>
                                        </Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Form đăng ký</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={[classes.container, isShowSidabar?'':classes.containerX].join(' ')}>
                        <div className={classes.content}>
                            <ShowContent menuId={currentMenuItem} screenCode={ScreenCode}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Doctor;