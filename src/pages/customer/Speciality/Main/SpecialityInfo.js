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
    image: {
        width: "30%", 
        heigh: "30%"
    }
}));

export default function SpecialityInfo(props) {
    const classes = useStyles();

    const { task } = props;

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
                                // variant="dot"
                            >
                                <Avatar className={classes.large} alt="Remy Sharp" src={task.avatar} />
                            </StyledBadge>
                        </Grid>
                        <Grid item>
                            <Typography className={classes.pos} color="textSecondary">
                                Chuyên khoa:
                            </Typography>
                            <Typography variant="h4" component="h2">
                                {task.name}
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                Mã số: CK1002
                            </Typography>
                
                            <Typography paragraph>
                                <Button color="inherit">
                                    <Link className={classes.link} to="/doctors">Danh sách bác sĩ</Link>
                                </Button>
                            </Typography>
                            <Typography paragraph>
                                <Button color="inherit">
                                    <Link className={classes.link} to="/home">Về trang chủ</Link>
                                </Button>
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} sm={9}>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >Giới thiệu:</Typography>
                        <Typography paragraph>
                            {task.introduce}
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >Triệu chứng:</Typography>
                        <Typography paragraph>
                            {task.symptom}
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >Điều trị:</Typography>
                        <Typography paragraph >
                            {task.treatment}
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >
                            Các bệnh liên quan:
                        </Typography>
                        <Typography paragraph>
                           {task.related}
                        </Typography>
                        <Typography variant="h6" component="h2" className={classes.title} gutterBottom >
                            Hình ảnh minh họa:
                            <br />
                            <img className={classes.image} src={task.images} alt="bacsi" />
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </CardContent>
    )
}