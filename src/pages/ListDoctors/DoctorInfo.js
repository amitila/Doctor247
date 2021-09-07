import React from 'react';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Badge from '@material-ui/core/Badge';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import Rating from '@material-ui/lab/Rating';

const StyledBadge = withStyles((theme) => ({
    badge: {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 5px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: '$ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}))(Badge);

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(20),
        height: theme.spacing(20),
    },
    title: {
        fontWeight: 'bold',
    },
    info: {
        textAlign: "center",
    },
    link: {
        textDecoration: 'none',
        fontSize: '15px',
        color: theme.palette.info.dark,
        fontWeight: 'bold',
    },
    chat: {
        backgroundColor: "green",
    },
    book: {
        backgroundColor: "blue",
    },
    rate: {
        display: 'flex',
        flexDirection: 'column',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

export default function DoctorInfo() {
    const classes = useStyles();

    return (
        <CardContent>
            <Container maxWidth="lg">
                <Grid container spacing={5}>
                    <Grid item xs={12} sm={3} className={classes.info}>
                        <Grid item >
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'right',
                                }}
                                variant="dot"
                            >
                                <Avatar className={classes.large} alt="Remy Sharp" src="https://scontent-hkt1-1.xx.fbcdn.net/v/t1.6435-9/175913934_2279391532196660_5406418668956314956_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=Ffk7VZUABekAX9tXd32&_nc_ht=scontent-hkt1-1.xx&oh=36ce431668b103817e662513807178a2&oe=6156C8FE" />
                            </StyledBadge>
                        </Grid>
                        <Grid item>
                            <Typography variant="h6" component="h2">
                                Ths.Bs.
                            </Typography>
                            <Typography variant="h6" component="h2" gutterBottom >
                                Lô Vỹ Oanh
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Chuyên khoa:
                            </Typography>
                            <Typography variant="h4" component="h2">
                                Hộ sinh mèo
                            </Typography>
                            <Typography color="textSecondary" gutterBottom>
                                0398296632
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Mã số: BS1002
                            </Typography>
                            <Typography paragraph className={classes.pos} color="textSecondary">
                                <Rating name="size-medium" precision={0.5} defaultValue={2} />
                            </Typography>

                            <Typography paragraph>
                                <Button color="inherit">
                                    <Link className={classes.link} to="/home">Chat với bác sĩ</Link>
                                </Button>
                            </Typography>
                            <Typography paragraph>
                                <Button color="inherit">
                                    <Link className={classes.link} to="/doctors">Đặt lịch khám</Link>
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >Giới thiệu:</Typography>
                        <Typography paragraph>
                            - Bác sĩ Lô Vỹ Oanh hiện nguyên là trưởng khoa khoa Hộ sinh của bệnh viện Nhi Đồng 1 <br />
                            - Được phong tặng Danh hiệu thầy thuốc ưu tú vào năm 2015 <br />
                            - Là một trong ba bác sĩ có trên 50 năm kinh nghiệm về đỡ đẻ
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >Giờ làm việc:</Typography>
                        <Typography paragraph>
                            Tất cả các ngày trong tuần trừ ngày chủ nhật: <br />
                            - Buổi sáng: 7h - 12h <br />
                            - Buổi chiều: 13h - 17h <br />
                            *Lưu ý: Trong trường hợp khẩn cấp vui lòng liên hệ số điện thoại 0398296632 để được hỗ trợ tức thời
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >Quá trình công tác:</Typography>
                        <Typography paragraph >
                            - Tốt nghiệp trường Đại học y dược TP.HCM năm 1997 <br />
                            - Là chuyên viên đỡ đẻ siêu cấp tại bệnh viện Nhi đồng 1 năm 2000 <br />
                            - Là trưởng khoa khoa Hộ sinh từ năm 2005 đến 2021
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >
                            Chuyên khám và điều trị:
                        </Typography>
                        <Typography paragraph>
                            1. Bệnh đái tháo đường ở mèo <br />
                            2. Bệnh đau cơ bụng chùn cơ rún ở mèo <br />
                            3. Siêu âm thai nhi cho mèo <br />
                            4. Chuyển đổi giới tính thai nhi cho mèo <br />
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >
                            Địa chỉ: 222 Trần Hưng Đạo, Q10, TP.HCM
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >
                            Hình ảnh bác sĩ:
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </CardContent>
    )
}