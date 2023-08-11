import React, { useEffect, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import CustomImage from './Image';
import APIService from '../utils/APIService';
import { useSnackbar } from 'notistack';
import { AppContext } from '../../src/store/AppProvider';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        color: theme.palette.text.secondary,
        margin: '10px'
    },
    field: {
        marginTop: 10,
        width: '100%'
    },
    field95: {
        marginTop: 10,
        width: '95%'
    },
    button: {
      display: 'block',
      marginTop: 20
    },
    formControl: {
      width: '100%',
      paddingTop: 10
    },
}));

// get date from ymd
function getDateTimeFromYMD(yyyyMMdd) {
    const date = new Date();
    date.setFullYear(yyyyMMdd.substring(0,4));
    date.setMonth(parseInt(yyyyMMdd.substring(5,7)) - 1);
    date.setDate(yyyyMMdd.substring(8,10));
    return date;
}

function Row(props) {
    const { removeThis, oldText, getText, index } = props;
    const [text, setText] = React.useState('');
    useEffect(() => {
        setText(oldText);
    }, []);
    useEffect(() => {
        getText(index, text);
    }, [text]);
    return (<Grid container xs={12} style={{marginTop: 14}}>
        <Grid item xs={10}>
            <TextField 
                multiline
                required
                fullWidth
                onChange={(e) => { setText(e.target.value) }} 
                value={text}
                 />
        </Grid>
        <Grid item xs={2}>
            <Button variant="outlined" color="secondary" style={{marginLeft: "15%"}} onClick={removeThis}>-</Button>
        </Grid>
    </Grid>);
}

export default function SignUpDoctor() {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();
    const { history } = useContext(AppContext);

    const [sex, setSex] = React.useState(0);
    const [specialized, setSpecialized] = React.useState(0);
    const [email, setEmail] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [firstName, setFirstName] = React.useState('');
    const [dob, setDob] = React.useState('1990-01-01');
    const [address, setAddress] = React.useState('');
    const [id, setId] = React.useState('');
    const [phoneNumber, setPhoneNumber] = React.useState('');
    const [otp, setOtp] = React.useState('');
    const [password, setPassword] = React.useState('');

    const [isGetOtp, setIsGetOtp] = React.useState(false);
    const [openSex, setOpenSex] = React.useState(false);
    const [openSpecialized, setOpenSpecialized] = React.useState(false);
    const [openProvinces, setOpenProvinces] = React.useState(false);
    const [openDistricts, setOpenDistricts] = React.useState(false);
    const [openWards, setOpenWards] = React.useState(false);

    const [specializedList, setSpecializedList] = React.useState([]);
    const [provinceSelect, setProvinceSelect] = React.useState(0);
    const [districtSelect, setDistrictSelect] = React.useState(0);
    const [wardSelect, setWardSelect] = React.useState(0);
    const [provinces, setProvinces] = React.useState([]);
    const [districts, setDistricts] = React.useState([]);
    const [wards, setWards] = React.useState([]);
    
    const [imgSrc, setImgSrc] = React.useState();
    const [idImgSrcList, setIdImgSrcList] = React.useState([]);
    const [idImgSrcListStr, setIdImgSrcListStr] = React.useState([]);    
    const [certificateImgSrcList, setCertificateImgSrcList] = React.useState([]);
    const [certificateImgSrcListStr, setCertificateImgSrcListStr] = React.useState([]);

    const getFullAddress = () => {
        const p = provinces.find(x => x.id === provinceSelect)?.name;
        const d = districts.find(x => x.id === districtSelect)?.name;
        const w = wards.find(x => x.id === wardSelect)?.name;
        return address + ", " + w + ", " + d + ", " + p;
    }

    useEffect(() => {
        APIService.getSpecialized((success, json) =>{
            if (success && json.result) {
                setSpecializedList(json.result);
            }
        });
        APIService.getProvinces(
            (success, json) => {
                if (success && json.result) {
                    setProvinces(json.result);
                }
            }
        );
    }, []);

    useEffect(() => {
        setWards([]);
        setWardSelect(0);
        if (provinceSelect !== 0) {
            APIService.getDistricts(provinceSelect, (success, json) => {
                if (success && json.result) {
                    setDistricts(json.result);
                }
            });
        }
        else {
            setDistricts([]);
        }
    }, [provinceSelect]);
    
    useEffect(() => {
        setWardSelect(0);
        if (districtSelect === 0 ) {
            setWards([]);
            return;
        }
        APIService.getWards(districtSelect, (success, json) => {
            if (success && json.result) {
                setWards(json.result);
            }
        });
    }, [districtSelect]);

    const handeSubmitForm = () => {
        const data = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            birthday: getDateTimeFromYMD(dob),
            gender: sex === 0 ? 'MALE' : 'FEMALE',
            avatar: imgSrc,
            specializedId: specialized,
            identityCardNumber: id,
            code: otp,
            password: password,
            phoneNumber: phoneNumber,
            address: getFullAddress(),
            identityCard: idImgSrcList,
            practicingCertificate: certificateImgSrcList,
            otherImages: certificateImgSrcList
        };
        console.log(data);
        if (specialized === 0 
            || email.length === 0 
            || lastName.length === 0 
            || firstName.length === 0 
            || id.length === 0 
            || phoneNumber.length === 0
            || dob.length === 0
            || otp.length === 0
            || password.length === 0) {
                enqueueSnackbar('Nhập thiếu thông tin.', { variant: 'error' });
                return;
            }
        APIService.postSignUpDoctor(
            data,
            (success, json) => {
                if (success && json.result) {
                    enqueueSnackbar('Đăng ký thành công! Vui lòng chờ quản trị viên xét duyệt và thông báo!', { variant: 'success' });
                    history.push('/home');
                }
                else {
                    enqueueSnackbar('Đăng ký thất bại!', { variant: 'error' });
                    console.log(json);
                }
            }
        );
    }

    const handleGetOtp = () => {
        if (phoneNumber.length === 0) {
            enqueueSnackbar('Chưa nhập số điện thoại.', { variant: 'error' });
        }
        else {
            APIService.getCodeFromSms(phoneNumber, (success, json) => {
                if (success && json.result) {
                    enqueueSnackbar('Vui lòng kiểm tra tin nhắn.', { variant: 'success' });
                    setIsGetOtp(true);
                }
                else {
                    enqueueSnackbar('Gửi mã thất bại.', { variant: 'error' });
                }
            });
        }
    }

    const handleChangeImage = (e) => {
        const files = e.target.files;
        let fl = [];

        for (let i of Object.keys(files)) {
            fl.push(files[i])
        }
        setImgSrc(fl[0]);
    }

    const handleChangeIdImages = (e) => {
        const files = e.target.files;
        let fl = [];
        let fl_s = [];

        for (let i of Object.keys(files)) {
            fl.push(files[i]);
            
            const reader = new FileReader();
            reader.readAsBinaryString(files[i]);
            reader.onload = (e) => {
                fl_s.push(e.target.result);
            }
        }
        setIdImgSrcList(fl);
        setIdImgSrcListStr(fl_s);
    }
    
    const handleChangeCertificateImages = (e) => {
        const files = e.target.files;
        let fl = [];
        let fl_s = [];

        for (let i of Object.keys(files)) {
            fl.push(files[i]);
            
            const reader = new FileReader();
            reader.readAsBinaryString(files[i]);
            reader.onload = (e) => {
                fl_s.push(e.target.result);
            }
        }
        console.log(fl_s);
        
        setCertificateImgSrcList(fl);
        setCertificateImgSrcListStr(fl_s);
    }

    return (
        <div className={classes.root}>
            <Grid container >
                <Grid item xs={12} sm={12} md={8}>
                    <Paper className={classes.paper}>
                        <Grid container >
                            <Grid item xs={12} >
                                <h3>Đăng ký bác sĩ</h3>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Email"
                                    placeholder="Nhập Email"
                                    helperText=""
                                    className={classes.field}
                                    margin="normal"
                                    value={email}
                                    onChange={(e) => {setEmail(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Họ"
                                    placeholder="Nhập họ"
                                    helperText=""
                                    className={classes.field95}
                                    value={firstName}
                                    onChange={(e) => {setFirstName(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Tên"
                                    placeholder="Nhập tên"
                                    helperText=""
                                    className={classes.field}
                                    value={lastName}
                                    onChange={(e) => {setLastName(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    id="date"
                                    label="Ngày sinh"
                                    type="date"
                                    className={classes.field95}
                                    value={dob}
                                    onChange={(e) => {setDob(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label">Giới tính</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label"
                                        open={openSex}
                                        onClose={() => {setOpenSex(false)}}
                                        onOpen={() => {setOpenSex(true)}}
                                        value={sex}
                                        onChange={(e) => {setSex(e.target.value)}}
                                    >
                                        <MenuItem value={0}>Nam</MenuItem>
                                        <MenuItem value={1}>Nữ</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="CMND/Căn cước số"
                                    placeholder="Nhập số CMND/Căn cước"
                                    helperText=""
                                    className={classes.field95}
                                    value={id}
                                    onChange={(e) => {setId(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label2">Chuyên ngành</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label2"
                                        open={openSpecialized}
                                        onClose={() => {setOpenSpecialized(false)}}
                                        onOpen={() => {setOpenSpecialized(true)}}
                                        value={specialized}
                                        onChange={(e) => {setSpecialized(e.target.value)}}
                                    >
                                        <MenuItem value={0}>Chọn chuyên ngành</MenuItem>
                                        {
                                            specializedList.map(item =>
                                                <MenuItem value={item.id}>{item.name}</MenuItem>)
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label3">Tỉnh</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label3"
                                        open={openProvinces}
                                        onClose={() => {setOpenProvinces(false)}}
                                        onOpen={() => {setOpenProvinces(true)}}
                                        value={provinceSelect}
                                        onChange={(e) => {setProvinceSelect(e.target.value)}}
                                    >
                                        <MenuItem value={0}>Chọn tỉnh</MenuItem>
                                        {
                                            provinces.map((province) => (
                                                <MenuItem value={province.id}>{province.name}</MenuItem>))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label3">Quận/Huyện</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label3"
                                        open={openDistricts}
                                        onClose={() => {setOpenDistricts(false)}}
                                        onOpen={() => {setOpenDistricts(true)}}
                                        value={districtSelect}
                                        onChange={(e) => {setDistrictSelect(e.target.value)}}
                                    >
                                        <MenuItem value={0}>Chọn quận/huyện</MenuItem>
                                        {
                                            districts.map((district) => (
                                                <MenuItem value={district.id}>{district.name}</MenuItem>))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl className={classes.formControl}>
                                    <InputLabel id="demo-controlled-open-select-label3">Phường/Xã</InputLabel>
                                    <Select
                                        labelId="demo-controlled-open-select-label3"
                                        open={openWards}
                                        onClose={() => {setOpenWards(false)}}
                                        onOpen={() => {setOpenWards(true)}}
                                        value={wardSelect}
                                        onChange={(e) => {setWardSelect(e.target.value)}}
                                    >
                                        <MenuItem value={0}>Chọn phường/xã</MenuItem>
                                        {
                                            wards.map((ward) => (
                                                <MenuItem value={ward.id}>{ward.name}</MenuItem>))
                                        }
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label="Số nhà, đường"
                                    placeholder="Nhập số nhà, đường"
                                    helperText=""
                                    className={classes.field}
                                    value={address}
                                    onChange={(e) => {setAddress(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <TextField
                                    label="Số điện thoại"
                                    placeholder="Nhập số điện thoại"
                                    helperText=""
                                    className={classes.field95}
                                    value={phoneNumber}
                                    onChange={(e) => {setPhoneNumber(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={4}>
                                <Button fullWidth className={classes.button} variant="outlined" color="primary" onClick={handleGetOtp}>
                                    Nhận mã
                                </Button>
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Mã OTP"
                                    placeholder="Nhập mã OTP"
                                    helperText="Hệ thống sẽ gửi mã trong vòng 30s khi quý khách nhấn nút Nhận mã"
                                    className={classes.field95}
                                    value={otp}
                                    onChange={(e) => {setOtp(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                    label="Mật khẩu"
                                    placeholder="Nhập mật khẩu"
                                    type="password"
                                    helperText=""
                                    className={classes.field}
                                    value={password}
                                    onChange={(e) => {setPassword(e.target.value)}}
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                />
                            </Grid><Grid item xs={12}>
                                <TextField
                                    label=""
                                    helperText=""
                                    multiline
                                    defaultValue="Đính kèm hình ảnh đại diện"
                                    style={{marginTop: 30}}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Thêm hình ảnh
                                    <input
                                        type="file"
                                        accept='.jpg, .png'
                                        onChange={handleChangeImage}
                                        hidden
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                <CustomImage image={imgSrc} style={{ margin: '3%' }} width="44%" height="200" alt="" />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label=""
                                    helperText=""
                                    multiline
                                    defaultValue="Đính kèm các hình ảnh về CMND/Căn cước"
                                    style={{marginTop: 30}}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Thêm hình ảnh
                                    <input
                                        type="file"
                                        accept='.jpg, .png'
                                        multiple
                                        onChange={handleChangeIdImages}
                                        hidden
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    idImgSrcList.map(imgSrc => {
                                        return <CustomImage image={imgSrc} style={{ margin: '3%' }} width="44%" height="200" alt="" />
                                    }
                                    )
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    label=""
                                    helperText=""
                                    multiline
                                    defaultValue="Đính kèm các hình ảnh chứng minh trình độ bác sĩ"
                                    style={{marginTop: 30}}
                                    fullWidth
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    component="label"
                                >
                                    Thêm hình ảnh
                                    <input
                                        type="file"
                                        accept='.jpg, .png'
                                        multiple
                                        onChange={handleChangeCertificateImages}
                                        hidden
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    certificateImgSrcList.map(imgSrc => {
                                        return <CustomImage image={imgSrc} style={{ margin: '3%' }} width="44%" height="200" alt="" />
                                    }
                                    )
                                }
                            </Grid>
                            <Grid item xs={12}>
                                <Button
                                    variant="contained"
                                    component="label"
                                    color="primary"
                                    fullWidth
                                    style={{marginTop: 30}}
                                    onClick={handeSubmitForm}
                                >
                                    Gửi đăng ký
                                </Button>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}