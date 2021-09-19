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
import { useDispatch, useSelector } from "react-redux";
import { 
    updateEmail, 
    updateAvatar,
    updateName,
    updateGender,
    updateBirthday,
    updateBhyt,
    updatePhone,
    updateProvince,
    updateAddress,
} from "../../store/userSlice";
import { 
    selectEmail, 
    selectAvatar,
    selectName,
    selectGender,
    selectBirthday,
    selectBhyt,
    selectPhone,
    selectProvince,
    selectAddress
} from "../../store/userSlice";
import { useHistory } from "react-router-dom";

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
    // const [profile] = useState([
    //     'https://scontent.fdad3-3.fna.fbcdn.net/v/t1.6435-9/64922148_358667398350685_4240578411438800896_n.jpg?_nc_cat=111&ccb=1-5&_nc_sid=8bfeb9&_nc_ohc=2xtJ36vD13YAX-TAOsJ&tn=qBeE9dEV8LO_X8tf&_nc_ht=scontent.fdad3-3.fna&oh=80df96e535fe5622a2e081a2f95a3850&oe=615F10C1',
    //     'Phạm Văn Tâm',
    //     'male',
    //     '1999-08-18',
    //     'SV221467389',
    //     '0398296632',
    //     'chuatam80@gmail.com',
    //     'Phú Yên',
    //     'Đa Ngư, Hòa Hiệp Nam, Đông Hòa, Phú Yên'
    // ]);

    const [avatar, setAvatar] = useState(useSelector(selectAvatar));
    const [name, setName] = useState(useSelector(selectName));
    const [gender, setGender] = useState(useSelector(selectGender));
    const [birthday, setBirthday] = useState(useSelector(selectBirthday));
    const [bhyt, setBhyt] = useState(useSelector(selectBhyt));
    const [phone, setPhone] = useState(useSelector(selectPhone));
    const [email, setEmail] = useState(useSelector(selectEmail));
    const [province, setProvince] = useState(useSelector(selectProvince));
    const [address, setAddress] = useState(useSelector(selectAddress));

    const dispatch = useDispatch();
    const history = useHistory();

    const onSubmit = () => {
        dispatch(updateAvatar(avatar));
        dispatch(updateName(name));
        dispatch(updateGender(gender));
        dispatch(updateBirthday(birthday));
        dispatch(updateBhyt(bhyt));
        dispatch(updatePhone(phone));
        dispatch(updateEmail(email));
        dispatch(updateProvince(province));
        dispatch(updateAddress(address));
        return history.push("/home");
    }
    
    const handleChangeProvince = (text) => {
        setProvince(text);
    }

    const handleChangeAvatar = (text) => {
        setAvatar(text);
        console.log(avatar);
    }

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        {/* Upload avatar into profile */}
                        <UploadAvatar 
                            dataFromParent={avatar} 
                            //onChange={event => setAvatar(event.target.value)} 
                            handleChangeAvatar={handleChangeAvatar}
                            avatar={avatar}
                        />
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
                                value={name}
                                onChange={event => setName(event.target.value)}
                                autoComplete="fullname"
                            />
                            <Grid container spacing={2} className={classes.rowgender} >
                                <Grid item xs={5}>
                                    <FormControl className={classes.gender} component="fieldset">
                                        <FormLabel component="legend">Giới tính</FormLabel>
                                        <RadioGroup 
                                            row aria-label="gender" 
                                            name="gender" 
                                            value={gender} 
                                            onChange={event => setGender(event.target.value)}
                                        >
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
                                        value={birthday}
                                        onChange={event => setBirthday(event.target.value)}
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
                                        value={bhyt}
                                        onChange={event => setBhyt(event.target.value)}
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
                                        name="phone"
                                        value={phone}
                                        onChange={event => setPhone(event.target.value)}
                                        autoComplete="phone"
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
                                        value={email}
                                        onChange={event => setEmail(event.target.value)}
                                        autoComplete="email"
                                        autoFocus
                                    />
                                </Grid>
                                <Grid item xs={4}>
                                   
                                    
                                </Grid>
                            </Grid>
                            {/* Select province where living */}
                            <SelectProvince 
                                dataFromParent={province} 
                                handleChangeProvince={handleChangeProvince}
                                province={province}
                            /> 
                            <TextField
                                variant="standard"
                                margin="normal"
                                required
                                fullWidth
                                name="address"
                                label="Địa chỉ cụ thể"
                                type="address"
                                id="address"
                                value={address}
                                onChange={event => setAddress(event.target.value)}
                                autoComplete="current-address"
                            />
                            <Button
                                type="button"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className={classes.submit}
                                onClick={onSubmit}
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


