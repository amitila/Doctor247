import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, makeStyles } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    menuContainerIcon: {
        marginLeft: 'auto',
    },
    link: {
        textDecoration: 'none',
        fontSize: '15px',
        color: theme.palette.info.dark,
        fontWeight: 'bold',
        backgroundColor: 'none',
    },
    listMenu: {
        backgroundColor: "#F6F6F6",
    }
}));

const DrawerMenu = () => {
    const [openDrawer, setOpenDrawer] = useState(false);
    const classes = useStyles();
    return (
        <>
            <Drawer 
                anchor="right"
                open={openDrawer}
                onClose={() => setOpenDrawer(false)}               
            >
                <List className={classes.listMenu}>
                    <ListItem divider button onClick={() => setOpenDrawer(!openDrawer)} >
                        <ListItemIcon>
                            <Button color="inherit">
                                <Link className={classes.link} to="/home">Trang chủ</Link>
                            </Button>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem divider button onClick={() => setOpenDrawer(!openDrawer)} >
                        <ListItemIcon>
                            <Button color="inherit">
                                <Link className={classes.link} to="/doctors">Danh sách Bác sĩ</Link>
                            </Button>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem divider button onClick={() => setOpenDrawer(!openDrawer)} >
                        <ListItemIcon>
                            <Button color="inherit">
                                <Link className={classes.link} to="/appointment">Đặt lịch khám</Link>
                            </Button>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem divider button onClick={() => setOpenDrawer(!openDrawer)} >
                        <ListItemIcon>
                            <Button color="inherit">
                                <Link className={classes.link} to="/profile">Hồ sơ cá nhân</Link>
                            </Button>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem divider button onClick={() => setOpenDrawer(!openDrawer)} >
                        <ListItemIcon>
                            <Button color="inherit">
                                <Link className={classes.link} to="/question">Hỏi đáp</Link>
                            </Button>
                        </ListItemIcon>
                    </ListItem>
                    <ListItem divider button onClick={() => setOpenDrawer(!openDrawer)} >
                        <ListItemIcon>
                            <Button color="inherit">
                                <Link className={classes.link} to="/signin">Đăng nhập/Đăng ký</Link>
                            </Button>
                        </ListItemIcon>
                    </ListItem>
                </List>
            </Drawer>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={() => setOpenDrawer(!openDrawer)}
                className={classes.menuContainerIcon}
            >
                <MenuIcon />
            </IconButton>
        </>
    )
}

export default DrawerMenu;





