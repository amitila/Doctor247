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
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    link: {
        textDecoration: 'none',
        fontSize: '16px',
        color: theme.palette.info.dark,
        fontWeight: 'bold',
        backgroundColor: 'none',
    },
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

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="fixed"
                className={clsx(classes.appBar, {
                    [classes.appBarShift]: open,
                })}
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, open && classes.hide)}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        <Link anchor="right" className={classes.link} to="/home">
                            <Logo />
                        </Link>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer} 
                variant="persistent"
                anchor="left"
                open={open}
                classes={{
                    paper: classes.drawerPaper,
                }}
            >
                <div className={classes.drawerHeader}>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </div>
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
                        <Link className={classes.link} to="/home">Thoát</Link>
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
                className={clsx(classes.content, {
                    [classes.contentShift]: open,
                })}
            >
                <div className={classes.drawerHeader} />
                {/* content */}
            </main>
        </div>
    );
}
