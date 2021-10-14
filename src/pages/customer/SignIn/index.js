import React from 'react'
import SignIn from './SignIn'
import AuthPhone from './AuthPhone';
import PhoneAndroidIcon from '@mui/icons-material/PhoneAndroid';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import { makeStyles } from "@material-ui/core/styles";
import { Container, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(0),
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function Index() {
    const classes = useStyles();
    const [formLogin, setFormLogin] = React.useState(false);
    const onToggleForm = (event) => {
        setFormLogin(!formLogin);
    }

    const elmForm = formLogin 
        ?   <>
                <SignIn />
                <Grid item xs={12} sm={12} className={classes.paper}>
                    <Grid item style={{textAlign: 'center', marginTop: -50}}> 
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="success"
                            className={classes.submit}
                            onClick={onToggleForm}
                        >
                            <PhoneAndroidIcon /> &nbsp;
                            Đăng nhập bằng điện thoại
                        </Button>
                    </Grid>
                </Grid>
            </> :
            <>
                <AuthPhone />
                <Grid item xs={12} sm={12} className={classes.paper}>
                    <Grid item style={{textAlign: 'center'}}> 
                        <Button
                            type="button"
                            fullWidth
                            variant="contained"
                            color="secondary"
                            className={classes.submit}
                            onClick={onToggleForm}
                        >
                            <AccountCircleIcon /> &nbsp;
                            Đăng nhập bằng tài khoản
                        </Button>
                    </Grid>
                </Grid>
            </>;

    return (
        <Container maxWidth="lg" style={{marginBottom: 150}}>
            <Grid container spacing={2}>
                {elmForm}
            </Grid>
        </Container>            
    )
}
