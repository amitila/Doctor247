import React, {useState, useEffect, useRef} from 'react';
import './../home/Doctor.css';
import DoctorTopNavbar from './DoctorTopNavbar';
import { makeStyles, Tooltip } from '@material-ui/core';
import axios from "axios";
import DrBody from './../home/DrBody';
import Checkout from './../../doctor/test/Checkout';
import Profile from '../../doctor/test/Profile';
import WorkPlan from '../../doctor/test/WorkPlan';
import PatientRecord from './../home/PatientRecord';


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

const ScreenCode = {
    HOME: 1,
    SCHEDULE: 3,
    PROFILE: 4,
    FORM: 5,
    TEST: 10,
}

const ShowUser = (props) => {
    const {list} = props;
    return (
        <div>
            {list.map((user, index) => {
                if(index>5) return null;
                return (
                    <React.Fragment key={user.id}>
                        <ul>
                            <li>{index}</li>
                            <li>{user.name}</li>
                            <li>{user.email}</li>
                        </ul>
                        <hr />
                    </React.Fragment>
                );
            })}
        </div>
    );
}


const ShowContent = (props) => {
    if(props.menuId === ScreenCode.TEST){
        return (
            <React.Fragment>
                <h2>User list</h2>
                <PatientRecord/>
                {/* <ShowUser list={listUser} /> */}
            </React.Fragment>
        );
    }
    else if(props.menuId == ScreenCode.HOME){
        return(
            <DrBody/>
        );
    }
    else if(props.menuId == ScreenCode.SCHEDULE){
        return(
            <WorkPlan/>
        );
    }
    else if(props.menuId == ScreenCode.FORM){
        return(
            <Checkout/>
        );
    }
    else if(props.menuId == ScreenCode.PROFILE){
        return(
            <Profile/>
        );
    }
    else{
        return(null);
    }
    
}

function Doctor() {
    const classes = useStyles();

    const [listUser, setListUser] = useState([]); // tạo biến chứa danh sách users

    const [isShowSidabar, setIsShowSidebar] = useState(true);

    const [currentMenuItem, setCurrentMenuItem] = useState(1);

    const menuRef = React.createRef();

    const menuRefClick = () => {
        setIsShowSidebar(!isShowSidabar);
    }

    // 
    useEffect(() => {
        const getUserAPI = 'https://5df8a4c6e9f79e0014b6a587.mockapi.io/freetuts/users';

        //Gọi API bằng axios
        axios.get(getUserAPI).then((res) => {
            setListUser(res.data);
        }).catch((err) => {
            console.log(err);
            alert("Xảy ra lỗi");
        })

    }, []);

    const [myState, changeMyState] = React.useState(0);

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
                                    <a className={[classes.ul_li_a, currentMenuItem==ScreenCode.HOME?classes.currentMenuItem:''].join(' ')} href="#" >
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Trang chủ</h4>}><span className={classes.icon}><i class="fas fa-home"></i></span></Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Trang chủ</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.SCHEDULE)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem==ScreenCode.SCHEDULE?classes.currentMenuItem:''].join(' ')} href="#">
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Quản lý bệnh án</h4>}><span className={classes.icon}><i class="fab fa-algolia"></i></span></Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Quản lý bệnh án</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.FORM)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem==ScreenCode.FORM?classes.currentMenuItem:''].join(' ')} href="#">
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Forms</h4>}><span className={classes.icon}><i className="fab fa-delicious"></i></span></Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Forms</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.PROFILE)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem==ScreenCode.PROFILE?classes.currentMenuItem:''].join(' ')} href="#">
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Thông tin cá nhân</h4>}><span className={classes.icon}><i className="fab fa-elementor"></i></span></Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Thông tin cá nhân</span>
                                    </a>
                                </li>
                                <li onClick={() => {setCurrentMenuItem(ScreenCode.TEST)}}>
                                    <a className={[classes.ul_li_a, currentMenuItem==ScreenCode.TEST?classes.currentMenuItem:''].join(' ')} href="#">
                                        <Tooltip title={isShowSidabar?'':<h4 style={{ color: "lightblue" }}>Test</h4>}><span className={classes.icon}><i className="fas fa-border-all"></i></span></Tooltip>
                                        <span className={isShowSidabar?classes.title:classes.hideTitle}>Test</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className={[classes.container, isShowSidabar?'':classes.containerX].join(' ')}>
                        <div className={classes.content}>
                            <ShowContent menuId={currentMenuItem}/>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Doctor;