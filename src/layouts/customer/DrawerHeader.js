import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
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
import ScheduleIcon from '@material-ui/icons/Schedule';
import { Link } from 'react-router-dom';
import Logo from '../../components/Logo';
import { Badge } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import Switch from '@mui/material/Switch';
import { useMediaQuery, useTheme as Theme} from '@material-ui/core';
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';
import PersonalIcon from './PersonalIcon';
import { useSelector, useDispatch } from "react-redux";
import { selectName, updateName} from '../../store/userSlice';

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
    },
    title: {
        flexGrow: 1,
    }
}));

export default function DrawerHeader() {
    const classes = useStyles();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
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

    const name = useSelector(selectName);
    const onSignOut = () => {
        if(cookies.get("token")) {
            cookies.remove("token");
            dispatch(updateName(''));
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
                                                    <Badge badgeContent={17} color="error">
                                                        <Link className={classes.link} to="/notification">
                                                            <NotificationsIcon />
                                                        </Link>                              
                                                    </Badge>
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
                                                    <Badge badgeContent={17} color="error">
                                                        <Link className={classes.link} to="/notification">
                                                            <NotificationsIcon />
                                                        </Link>                              
                                                    </Badge>
                                                </IconButton>
                                                {/* <p>Thông báo</p> */}
                                            </Typography>
                                        </>
                                    } 
                                </>
                                :''
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
                                                    <Badge badgeContent={17} color="error">
                                                        <Link className={classes.link} to="/notification">
                                                            <NotificationsIcon />
                                                        </Link>                              
                                                    </Badge>
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
                anchor= {checked ? 'right' : 'left'}
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
                <PersonalIcon name={name} />
                <Divider />
                <List>
                    {[
                        <Link className={classes.link} to="/home">Trang chủ</Link>, 
                        <Link className={classes.link} to="/doctors">Danh sách Bác sĩ</Link>, 
                        <Link className={classes.link} to="/appointment">Đặt và xem lịch khám</Link>, 
                        <Link className={classes.link} to="/profile">Hồ sơ gia đình</Link>, 
                        <Link className={classes.link} to="/medicalrecords">Xem bệnh án</Link>,
                        <Link className={classes.link} to="/question">Hỏi đáp</Link>,
                        <Link className={classes.link} to="/task">Công việc</Link>
                    ].map((text, index) => (
                        <ListItem button key={text} onClick={handleDrawerClose} >
                            <ListItemIcon>
                                {[<HomeIcon />, <FormatListNumberedIcon />, <EventIcon />, <AccountBoxIcon />, <ReorderIcon />, <HelpIcon />, <ScheduleIcon /> ][index]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <List>
                    {[
                        <Link className={classes.link} to="/notification">Thông báo</Link>, 
                        <Link className={classes.link} to="/signin">Đăng nhập</Link>, 
                        <Link className={classes.link} to="/signup">Đăng ký</Link>, 
                        <Link className={classes.link} to="/signin" onClick={onSignOut}>Thoát</Link>
                    ].map((text, index) => (
                        <ListItem button key={text} onClick={handleDrawerClose} >
                            <ListItemIcon>
                                {[<NotificationsActiveIcon />, <ExitToAppIcon />, <LockOpenIcon />, <PowerSettingsNewIcon />][index]}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Drawer>
            <main
                className={clsx(checked ? classes.contentRight : classes.content, {
                    [checked ? classes.contentShiftRight : classes.contentShift]: open,
                })}
            >
                <div className={checked ? classes.drawerHeaderRight : classes.drawerHeader} />
                {/* content */}
            </main>
        </div>
    );
}
