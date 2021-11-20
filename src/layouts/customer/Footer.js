import React from 'react';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    link: {
        '&:hover': {
            color: "#ffb74d",
            textDecoration: "none",
        },
    },
    linkmain: {
        '&:hover': {
            color: "#ff9800",
            textDecoration: "none",
            fontWeight: "bold",
        }
    },
}));

function Copyright() {
    return (
        <Typography variant="body2" color="text.Secondary" align="center">
            {'Bản quyền © '}
            <Link className={useStyles().linkmain} color="textPrimary" href={window.location.origin}>
                <b>Doctor247</b>
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const Footer = () => {
    const classes = useStyles();
    return (
        <footer>
            <Box
                px={{ xs: 3, sm: 10 }}
                py={{ xs: 5, sm: 10 }}
                bgcolor="#2196f3"
                color="white"
            >
                <Container maxWidth="lg">
                    <Grid container spacing={5}>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1} px={{ xs: 2, sm: 2 }} py={{ xs: 2, sm: 2 }} ><b>Doctor247</b></Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin} className={classes.link} color="inherit">
                                    Về chúng tôi
                                </Link>
                            </Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin} className={classes.link} color="inherit">
                                    Liên hệ
                                </Link>
                            </Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin} className={classes.link} color="inherit">
                                    Phiên bản 1.8.8
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1} px={{ xs: 2, sm: 2 }} py={{ xs: 2, sm: 2 }} ><b>Danh sách bác sĩ</b></Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin + '/doctor'} className={classes.link} color="inherit">
                                    Tìm kiếm bác sĩ
                                </Link>
                            </Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin + '/doctor'} className={classes.link} color="inherit">
                                    Đặt lịch với bác sĩ
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1} px={{ xs: 2, sm: 2 }} py={{ xs: 2, sm: 2 }} ><b>Hồ sơ cá nhân</b></Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin} className={classes.link} color="inherit">
                                    Thông tin cá nhân
                                </Link>
                            </Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin + '/medicalrecord'} className={classes.link} color="inherit">
                                    Bệnh án
                                </Link>
                            </Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin + '/appointment'} className={classes.link} color="inherit">
                                    Lịch đã đăng ký
                                </Link>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Box borderBottom={1} px={{ xs: 2, sm: 2 }} py={{ xs: 2, sm: 2 }} ><b>Hỏi đáp</b></Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin + '/savedquestion'} className={classes.link} color="inherit">
                                    Bài viết đã đăng
                                </Link>
                            </Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin + '/savedquestion'} className={classes.link} color="inherit">
                                    Bài viết đã lưu
                                </Link>
                            </Box>
                            <Box style={{marginTop: 10}} >
                                <Link href={window.location.origin + '/question'} className={classes.link} color="inherit">
                                    Tất cả bài viết 
                                </Link>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box textAlign="center" pt={{ xs: 5, sm: 10 }} pb={{ xs: 5, sm: 0 }}>
                        <Copyright />
                    </Box>
                </Container>
            </Box>
        </footer>
    )
}

export default Footer;
