import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Typography from "@material-ui/core/Typography";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import SelectProvince from './../../components/SelectProvince.js';
import UploadAvatar from "../../components/UploadAvatar.js";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: "center",
        color: theme.palette.text.secondary,
    },
    rowgender: {
        marginTop: "5px",
    }
}));

export default function AutoGrid() {
    const classes = useStyles();

    // Tạo state cho profile gồm 9 thông tin: [avatar, name, gender, birthday, bhyt, phone, mail, province, address]
    const [profile] = useState([
        'https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/64922148_358667398350685_4240578411438800896_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=2xtJ36vD13YAX-TAOsJ&tn=qBeE9dEV8LO_X8tf&_nc_ht=scontent.fdad3-3.fna&oh=80df96e535fe5622a2e081a2f95a3850&oe=615F10C1',
        'Phạm Văn Tâm',
        'male',
        '1999-08-18',
        'SV221467389',
        '0398296632',
        'chuatam80@gmail.com',
        'Phú Yên',
        'Đa Ngư, Hòa Hiệp Nam, Đông Hòa, Phú Yên'
    ]);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* Upload avatar into profile */}
                        <UploadAvatar dataFromParent={profile[0]} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography component="h1" variant="h5">
                            Thông tin cá nhân
                        </Typography>
                        <form className={classes.form} noValidate>
                            <TextField
                                variant="standard"
                                required
                                fullWidth
                                id="fullName"
                                label="Họ và tên"
                                name="fullName"
                                value={profile[1]}
                                autoComplete="fullname"
                            />
                            <Grid container spacing={2} className={classes.rowgender} >
                                <Grid item xs={5}>
                                    <FormControl className={classes.gender} component="fieldset">
                                        <FormLabel component="legend">Giới tính</FormLabel>
                                        <RadioGroup row aria-label="gender" name="gender" value={profile[2]} >
                                            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                            <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                            <FormControlLabel value="other" control={<Radio />} label="Khác" />
                                        </RadioGroup>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={7}>
                                    <TextField
                                        id="date"
                                        label="Ngày sinh"
                                        type="date"
                                        format={'DD/MM/YYYY'}
                                        defaultValue="1890-10-01"
                                        value={profile[3]}
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3}>
                                <Grid item xs={8}>
                                    <TextField
                                        variant="standard"
                                        margin="normal"
                                        fullWidth
                                        id="bhyt"
                                        label="Mã BHYT (nếu có)"
                                        name="bhyt"
                                        value={profile[4]}
                                        autoComplete="bhyt"
                                        autoFocus
                                    />
                                    <TextField
                                        variant="standard"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="numphone"
                                        label="Số điện thoại"
                                        name="numphone"
                                        value={profile[5]}
                                        autoComplete="numphone"
                                        autoFocus
                                    />
                                    <TextField
                                        variant="standard"
                                        margin="normal"
                                        required
                                        fullWidth
                                        id="email"
                                        label="Địa chỉ email"
                                        name="email"
                                        value={profile[6]}
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                   
                                    
                                </Grid>
                            </Grid>
                            {/* Select province where living */}
                            <SelectProvince dataFromParent={profile[7]} /> 
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                label="Địa chỉ cụ thể"
                                type="address"
                                id="address"
                                value={profile[8]}
                                autoComplete="current-address"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                            >
                                Lưu thay đổi
                            </Button>
                        </form>
                    </Grid>
                </Grid>
            </Paper>
        </div>
    );
}


