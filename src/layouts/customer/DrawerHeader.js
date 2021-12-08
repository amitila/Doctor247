import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered';
import EventIcon from '@material-ui/icons/Event';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import HelpIcon from '@material-ui/icons/Help';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import ReorderIcon from '@material-ui/icons/Reorder';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
// import { Badge } from '@mui/material';
import Switch from '@mui/material/Switch';
import { MenuList, useMediaQuery, useTheme as Theme } from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import PersonalIcon from './PersonalIcon';
import { useSelector, useDispatch } from "react-redux";
import { selectName, updateName, updateRole, selectAvatar } from '../../store/userSlice';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import WorkIcon from '@mui/icons-material/Work';
import MenuItem from '@mui/material/MenuItem';
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from '@mui/icons-material/Save';
import SettingsIcon from '@mui/icons-material/Settings';
import APIService from '../../utils/APIService';
import getToken from '../../helpers/getToken';
import Notification from './Notification';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    appBar: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        backgroundColor: "#F6F6F6",
        color: "black",
        width: "100%",
    },
    appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    hide: {
        display: 'none',
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    drawerHeaderRight: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentRight: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    contentShiftRight: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 0,
    },
    link: {
        textDecoration: 'none',
        fontSize: '16px',
        color: theme.palette.info.dark,
        fontWeight: 'bold',
        backgroundColor: 'none',
        marginTop: 5,
        marginBottom: 5,
    },
    title: {
        flexGrow: 1,
    },
}));

const MyMenuItem = withStyles({
    root: {
        '&:hover': {
            backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg id='squiggle-link' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' xmlns:ev='http://www.w3.org/2001/xml-events' viewBox='0 0 20 4'%3E%3Cstyle type='text/css'%3E.squiggle{animation:shift .3s linear infinite;}@keyframes shift {from {transform:translateX(0);}to {transform:translateX(-20px);}}%3C/style%3E%3Cpath fill='none' stroke='%23ff9800' stroke-width='2' class='squiggle' d='M0,3.5 c 5,0,5,-3,10,-3 s 5,3,10,3 c 5,0,5,-3,10,-3 s 5,3,10,3'/%3E%3C/svg%3E")`,
            backgroundPosition: '0 100%',
            backgroundSize: 'auto 6px',
            backgroundRepeat: 'repeat-x',
        },
    }
})(MenuItem);

export default function DrawerHeader(props) {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [avatar, setAvatar] = React.useState(useSelector(selectAvatar));
    const name = useSelector(selectName);

    const {mark} = props;
    // console.log(mark);

    const handleDrawerOpen = () => {
        setOpen(true);
        const token = getToken();
        APIService.getProfile(token, (success, json) => {
            if(success && json.result){
                setAvatar(json.result.customer.avatarURL);
            }
        }) 
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const label = { inputProps: { 'anchorLeft': 'anchorRight' } };
    const [checked, setChecked] = React.useState(false);
    const handleChangeSwitch = (e) => {
        setChecked(e.target.checked);
    }

    const themeMedia = Theme();
    const isMatch = useMediaQuery(themeMedia.breakpoints.down('sm'));

    // code for signout
    const cookies = new Cookies();
    const history = useHistory();
    const dispatch = useDispatch();

    const onSignOut = () => {
        if (cookies.get("token")) {
            cookies.remove("token");
            dispatch(updateName(''));
            dispatch(updateRole(''));
            return history.push("/signin");
        }
        alert("Bạn vẫn chưa đăng nhập !");
    }

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [checked ? classes.appBarShiftRight : classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    {
                        checked ? <>
                            {
                                isMatch ?
                                    <>
                                        <Typography variant="h6">
                                            <Link anchor="right" className={classes.link} to="/home">
                                                <Logo />
                                            </Link>
                                        </Typography>
                                        <Typography >
                                            <IconButton
                                                size="large"
                                                aria-label="show 17 new notifications"
                                                color="inherit"
                                            >
                                                {/* <Badge badgeContent={17} color="error">
                                                    <Link className={classes.link} to="/notification">
                                                        <Notification />
                                                    </Link>
                                                </Badge> */}
                                                <Notification />
                                            </IconButton>
                                            {/* <p>Thông báo</p> */}
                                        </Typography>
                                    </>
                                    :
                                    <>
                                        <Typography variant="h6" noWrap className={classes.title}>
                                            <Link anchor="right" className={classes.link} to="/home">
                                                <Logo />
                                            </Link>
                                        </Typography>
                                        <Typography >
                                            <IconButton
                                                size="large"
                                                aria-label="show 17 new notifications"
                                                color="inherit"
                                            >
                                                {/* <Badge badgeContent={17} color="error">
                                                    <Link className={classes.link} to="/notification">
                                                        <Notification />
                                                    </Link>
                                                </Badge> */}
                                                <Notification />
                                            </IconButton>
                                            {/* <p>Thông báo</p> */}
                                        </Typography>
                                    </>
                            }
                        </>
                            : ''
                    }

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge={checked ? 'end' : 'start'}
                        className={checked ? clsx(open && classes.hide) : clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    {
                        checked ? '' : <>
                            <Typography variant="h6" noWrap>
                                <Link anchor="right" className={classes.link} to="/home">
                                    <Logo />
                                </Link>
                            </Typography>
                            <Typography >
                                <IconButton
                                    size="large"
                                    aria-label="show 17 new notifications"
                                    color="inherit"
                                >
                                    {/* <Badge badgeContent={17} color="error">
                                        <Link className={classes.link} to="/notification">
                                            <Notification />
                                        </Link>
                                    </Badge> */}
                                    <Notification />
                                </IconButton>
                                {/* <p>Thông báo</p> */}
                            </Typography>
                        </>
                    }
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor={checked ? 'right' : 'left'}
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={checked ? classes.drawerHeaderRight : classes.drawerHeader}>
                    <p>L</p>
                    <IconButton>
                        <Switch checked={checked} {...label} onChange={handleChangeSwitch} />
                    </IconButton>
                    <p>R</p>
                    {
                        checked ? <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton> :
                            <IconButton onClick={handleDrawerClose}>
                                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                            </IconButton>
                    }
                </div>
                <Divider />
                <PersonalIcon handleDrawerClose={handleDrawerClose} name={name} avatar={avatar} />
                <Divider />
                {
                    mark === 0 ? 
                    <div>
                        <MenuList>
                            {[
                                <div className={classes.link} onClick={()=>history.push("/home")} style={{color: '#db5f12'}}>Trang chủ</div>,
                                <div className={classes.link} onClick={()=>history.push("/doctorlist")}>Danh sách Bác sĩ</div>,
                                <div className={classes.link} onClick={()=>history.push("/appointment")}>Lịch khám</div>,
                                <div className={classes.link} onClick={()=>history.push("/profile")}>Hồ sơ gia đình</div>,
                                <div className={classes.link} onClick={()=>history.push("/medicalrecord")}>Xem bệnh án</div>,
                                <div className={classes.link} onClick={()=>history.push("/question")}>Hỏi đáp</div>,
                                <div className={classes.link} onClick={()=>history.push("/phonebook")}>Danh bạ</div>,
                                <div className={classes.link} onClick={()=>history.push("/speciality")}>Chuyên khoa</div>,
                                <div className={classes.link} onClick={()=>history.push("/service")}>Khám dịch vụ</div>,
                                <div className={classes.link} onClick={()=>history.push("/savedquestion")}>Đã lưu</div>,
                                <div className={classes.link} onClick={()=>history.push("/setting")}>Cài đặt</div>,
                                // <Link className={classes.link} to="/home">Trang chủ</Link>,
                                // <Link className={classes.link} to="/doctors">Danh sách Bác sĩ</Link>,
                                // <Link className={classes.link} to="/appointment">Lịch khám</Link>,
                                // <Link className={classes.link} to="/profile">Hồ sơ gia đình</Link>,
                                // <Link className={classes.link} to="/medicalrecords">Xem bệnh án</Link>,
                                // <Link className={classes.link} to="/question">Hỏi đáp</Link>,
                                // <Link className={classes.link} to="/phonebook">Danh bạ</Link>,
                                // <Link className={classes.link} to="/task">Công việc</Link>
                            ].map((text, index) => (
                                <MyMenuItem button key={text} onClick={handleDrawerClose} >
                                    <ListItemIcon>
                                        {
                                            [<HomeIcon style={{color: '#db5f12'}} />, 
                                            <FormatListNumberedIcon style={{color: '#005bf7'}} />, 
                                            <EventIcon style={{color: '#005bf7'}} />, 
                                            <AccountBoxIcon style={{color: '#005bf7'}} />, 
                                            <ReorderIcon style={{color: '#005bf7'}} />, 
                                            <HelpIcon style={{color: '#005bf7'}} />, 
                                            <LibraryBooksIcon style={{color: '#005bf7'}} />, 
                                            <FolderSpecialIcon style={{color: '#005bf7'}} />,
                                            <WorkIcon style={{color: '#005bf7'}} />,
                                            <SaveIcon style={{color: '#005bf7'}} />,
                                            <SettingsIcon style={{color: '#005bf7'}} />][index]
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </MyMenuItem>
                            ))}
                        </MenuList>
                        <Divider />
                        <MenuList>
                            {[
                                <div className={classes.link} onClick={()=>history.push("/notification")}>Thông báo</div>,
                                (name ? 
                                    <div className={classes.link} onClick={onSignOut}>Thoát</div>
                                    : 
                                    <>
                                        <div className={classes.link} onClick={()=>history.push("/signup")}>Đăng ký</div>,
                                        <div className={classes.link} onClick={()=>history.push("/signin")}>Đăng nhập</div>  
                                    </>
                                ),
                                // <Link className={classes.link} to="/notification">Thông báo</Link>,
                                // <Link className={classes.link} to="/signin">Đăng nhập</Link>,
                                // <Link className={classes.link} to="/signup">Đăng ký</Link>,
                                // <Link className={classes.link} to="/signin" onClick={onSignOut}>Thoát</Link>
                            ].map((text, index) => (
                                <MyMenuItem button key={text} onClick={handleDrawerClose} >
                                    <ListItemIcon>
                                        {
                                            [<NotificationsActiveIcon style={{color: '#005bf7'}} />, 
                                            (name ?
                                                <PowerSettingsNewIcon style={{color: 'red', backgroundColor: 'orange'}} />
                                                :   
                                                <>
                                                    <LockOpenIcon style={{color: '#005bf7'}} />,
                                                    <ExitToAppIcon style={{color: '#005bf7'}} />
                                                </>
                                            )][index]   
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </MyMenuItem>
                            ))}
                        </MenuList>
                    </div>
                    :
                    <div>
                        <MenuList>
                            {[
                                <div className={classes.link} onClick={()=>history.push("/home")}>Trang chủ</div>,
                                <div className={classes.link} onClick={()=>history.push("/doctorlist")}>Danh sách Bác sĩ</div>,
                                <div className={classes.link} onClick={()=>history.push("/question")}>Hỏi đáp</div>,
                                <div className={classes.link} onClick={()=>history.push("/phonebook")}>Danh bạ</div>,
                                <div className={classes.link} onClick={()=>history.push("/speciality")}>Chuyên khoa</div>,
                            ].map((text, index) => (
                                <MyMenuItem button key={text} onClick={handleDrawerClose} >
                                    <ListItemIcon>
                                        {
                                            [<HomeIcon />, 
                                            <FormatListNumberedIcon />, 
                                            <HelpIcon />, 
                                            <LibraryBooksIcon />, 
                                            <FolderSpecialIcon />][index]
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </MyMenuItem>
                            ))}
                        </MenuList>
                        <Divider />
                        <MenuList>
                            {[
                                <div className={classes.link} onClick={()=>history.push("/signup")}>Đăng ký</div>,
                                (name ? 
                                    <div className={classes.link} onClick={onSignOut}>Thoát</div>
                                    : 
                                    <div className={classes.link} onClick={()=>history.push("/signin")}>Đăng nhập</div> 
                                ),
                            ].map((text, index) => (
                                <MyMenuItem button key={text} onClick={handleDrawerClose} >
                                    <ListItemIcon>
                                        {
                                            [
                                            <LockOpenIcon />,
                                            (name ?
                                                <PowerSettingsNewIcon />
                                                :   
                                                <ExitToAppIcon />
                                            )][index]   
                                        }
                                    </ListItemIcon>
                                    <ListItemText primary={text} />
                                </MyMenuItem>
                            ))}
                        </MenuList>
                    </div>
                }
                
            </Drawer>
            <main
                className={clsx(checked ? classes.contentRight : classes.content, {
                    [checked ? classes.contentShiftRight : classes.contentShift]: open,
                })}
                onClick={handleDrawerClose}
            >
                <div className={checked ? classes.drawerHeaderRight : classes.drawerHeader} />
                {/* content */}
            </main>
        </div>
    );
}
