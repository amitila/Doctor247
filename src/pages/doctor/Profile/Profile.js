import React, { useEffect, useState } from 'react';
import './Profile.css';
import Grid from '@material-ui/core/Grid';
import APIService from '../../../utils/APIService';

import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import CustomImage from '../../../components/Image';
import getToken from '../../../helpers/getToken';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    paper: {
        width: "80%",
        maxHeight: 435
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120
    },
    selectEmpty: {
        marginTop: theme.spacing(2)
    },
    editIcon: {
        fontSize: '25px',
        marginLeft: '10px',
        cursor: 'pointer',
        '&:hover': {
            color: '#004d40'
         },
    },
    formControl: {
        minWidth: 120,
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
    const [text, setText] = useState('');
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
                inputProps={{
                    spellCheck: 'false'
                }}
                 />
        </Grid>
        <Grid item xs={2}>
            <Button variant="outlined" color="secondary" style={{marginLeft: "15%"}} onClick={removeThis}>-</Button>
        </Grid>
    </Grid>);
}

function Profile(props) {
    const classes = useStyles();
    const { enqueueSnackbar } = useSnackbar();

    //const img1 = "https://thumbs.dreamstime.com/z/doctor-web-icon-therapist-medical-avatar-flat-style-illustration-doctor-web-icon-therapist-avatar-103706622.jpg";
    const [imgSrc, setImgSrc] = useState('');

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dob, setDob] = useState('');
    const [sex, setSex] = useState(0);
    const [province, setProvince] = useState(0);
    const [medicalExamination, setMedicalExamination] = useState([]);
    const [displayMedicalExamination, setDisplayMedicalExamination] = useState([]);
    const [introduces, setIntroduces] = useState([]);
    const [displayIntroduces, setDisplayIntroduces] = useState([]);
    const [lengthOfIntroduce, setLengthOfIntroduce] = useState(0);

    const [provincesList, setProvincesList] = useState([]);

    const [workHistory, setWorkHistory] = useState([]);

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        sex: '',
        position: '',
        workAbout: '',
        workAt: '',
        email: '',
        phone: '',
        image: '',
        province: 0,
        introduces: [],
        medicalExamination: [],
    });

    const [openSex, setOpenSex] = React.useState(false);
    const [openProvince, setOpenProvince] = React.useState(false);

    // const token = localStorage.getItem("token_doctor247");
    const token = getToken();
    useEffect(() => {
        loadMyProfile();
        APIService.getProvinces((success, json) => {
            if (success && json.result) {
                setProvincesList(json.result);
            }
        });
    }, []);

    const loadMyProfile = () => {
        APIService.getDoctorProfile(token, (success, json) => {
            if (success && json.result) {
                console.log('profile');
                console.log(json.result);
                const workHistoryList = json.result.doctor.workHistory;
                const positionName = workHistoryList.length > 0 ? workHistoryList[workHistoryList.length - 1].jobPosition.title : '';
                const workplaceName = (workHistoryList.length > 0) ? workHistoryList[workHistoryList.length - 1].workplace.name : '';
                setWorkHistory(workHistoryList);
                setValues({
                    firstName: json.result.doctor.firstName,
                    lastName: json.result.doctor.lastName,
                    dob: json.result.doctor.birthday.substring(0, 10),
                    sex: json.result.doctor.gender === "MALE" ? "Nam" : "Nữ",
                    position: positionName,
                    workAbout: json.result.doctor.specialized.name,
                    workAt: workplaceName,
                    email: json.result.email,
                    phone: json.result.phoneNumber,
                    province: json.result.doctor.province === null ? 0 : json.result.doctor.province.id,
                    image: json.result.doctor.avatarURL === null ? '' : json.result.doctor.avatarURL,
                    introduces: json.result.doctor.introduce,
                    medicalExamination: json.result.doctor.medicalExamination,
                });
                setDisplayIntroduces(json.result.doctor.introduce);
                setDisplayMedicalExamination(json.result.doctor.medicalExamination);
                setLengthOfIntroduce(json.result.doctor.introduce.length);
            }
        });
    }

    const [openEditInfo, setOpenEditInfo] = React.useState(false);

    const handleClickOpenEditInfo = () => {
        setOpenEditInfo(true);
        setFirstName(values.firstName);
        setLastName(values.lastName);
        setDob(values.dob);
        setSex(values.sex === 'Nam' ? 0 : 1);
        setProvince(values.province);
        setIntroduces([...values.introduces]);
        setMedicalExamination([...values.medicalExamination]);
    };

    const handleClose = () => {
        setOpenEditInfo(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            firstName: firstName,
            lastName: lastName,
            birthday: getDateTimeFromYMD(dob),
            gender: sex === 0 ? 'MALE' : 'FEMALE',
            avatar: imgSrc,
            provinceId: province,
            introduce: introduces,
            medicalExamination: medicalExamination
        }
        console.log(data);
        if (firstName.length === 0 ||
            lastName.length === 0 ||
            dob.length === 0 ||
            imgSrc === '' ||
            province === 0 ||
            introduces.length === 0 ||
            medicalExamination.length === 0
            ) {
                enqueueSnackbar('Vui lòng nhập đủ thông tin!', { variant: 'error' });
                return;
            }
        APIService.putDoctorProfile(
            token,
            data,
            (success, json) => {
                if (success, json.result) {
                    enqueueSnackbar('Cập nhật thành công!', { variant: 'success' });
                    setOpenEditInfo(false);
                    loadMyProfile();
                }
                else {
                    console.log(json);
                }
            }
        );
    }

    const handleUpdateIntroText = (index, text) => {
        let lst = introduces;
        lst.splice(index, 1, text);
        setIntroduces([...lst]);
    }
    const handleUpdateMEText = (index, text) => {
        let lst = medicalExamination;
        lst.splice(index, 1, text);
        setMedicalExamination([...lst]);
    } 

    const handleRemoveIntroRow = (index) => {
        let lst = introduces;
        lst.splice(index, 1);
        setIntroduces([...lst]);
    }
    const handleRemoveMERow = (index) => {
        let lst = medicalExamination;
        lst.splice(index, 1);
        setMedicalExamination([...lst]);
    }

    const handleAddIntroRow = () => {
        let newItem = '';
        setIntroduces([...introduces, newItem]);
    }
    const handleAddMERow = () => {
        let newItem = '';
        setMedicalExamination([...medicalExamination, newItem]);
    }

    const handleChangeImage = (e) => {
        const files = e.target.files;
        let fl = [];

        for (let i of Object.keys(files)) {
            fl.push(files[i])
        }
        setImgSrc(fl[0]);
    }

    return (
        <React.Fragment>
            <div>
                <Dialog
                    open={openEditInfo}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <form autoComplete="off" onSubmit={handleSubmit}>
                        <DialogTitle id="alert-dialog-title">
                            <h4>Cập nhật thông tin</h4>
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <Grid container spacing={3}>
                                    <Grid item xs={12}>
                                        <CustomImage image={imgSrc} style={{ margin: '3%' }} width="150" height="150" alt=""/>
                                        <Button
                                            component="label"
                                        >
                                            <i className={["fas fa-pencil-alt", classes.editIcon].join(' ')} >
                                                <input
                                                    type="file"
                                                    accept='.jpg, .png'
                                                    multiple
                                                    onChange={handleChangeImage}
                                                    hidden
                                                />
                                            </i>
                                        </Button>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField onChange={(e) => setFirstName(e.target.value)} required id="fname" fullWidth label="Họ" value={firstName} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField onChange={(e) => setLastName(e.target.value)} required id="lname" fullWidth label="Tên" value={lastName} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField
                                            id="date"
                                            label="Ngày sinh"
                                            type="date"
                                            fullWidth
                                            value={dob}
                                            onChange={(e) => {setDob(e.target.value)}}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControl className={classes.formControl} fullWidth>
                                            <InputLabel id="demo-controlled-open-select-label">Giới tính</InputLabel>
                                            <Select
                                                labelId="demo-controlled-open-select-label"
                                                id="demo-controlled-open-select"
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
                                    <Grid item xs={12}>
                                        <FormControl className={classes.formControl} fullWidth>
                                            <InputLabel id="demo-controlled-open-select-label-province">Tỉnh/thành</InputLabel>
                                            <Select
                                                labelId="demo-controlled-open-select-label-province"
                                                id="demo-controlled-open-select-province"
                                                open={openProvince}
                                                onClose={() => {setOpenProvince(false)}}
                                                onOpen={() => {setOpenProvince(true)}}
                                                value={province}
                                                onChange={(e) => {setProvince(e.target.value)}}
                                            >
                                                <MenuItem value={0}>Chọn tỉnh thành</MenuItem>
                                                {
                                                    provincesList.map(province => 
                                                        <MenuItem value={province.id}>{province.name}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <div></div>
                                    <Grid item xs={12} container>
                                        <Grid item xs={12}>
                                            <label>Giới thiệu:</label>
                                        </Grid>
                                        {
                                            introduces.map((introduce, index) => {
                                                return <Row oldText={introduce} index={index} getText={(index, text) => {handleUpdateIntroText(index, text)}} removeThis={() => {handleRemoveIntroRow(index)}}/>
                                            }
                                            )
                                        }
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleAddIntroRow}
                                            style={{ marginTop: 8 }}>
                                            Thêm dòng
                                        </Button>
                                    </Grid>

                                    <Grid item xs={12} container>
                                        <Grid item xs={12}>
                                            <label>Chuyên khám:</label>
                                        </Grid>
                                        {
                                            medicalExamination.map((element, index) => {
                                                return <Row oldText={element} index={index} getText={(index, text) => {handleUpdateMEText(index, text)}} removeThis={() => {handleRemoveMERow(index)}}/>
                                            }
                                            )
                                        }
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={handleAddMERow}
                                            style={{ marginTop: 8 }}>
                                            Thêm dòng
                                        </Button>
                                    </Grid>
                                </Grid>
                            </DialogContentText>

                        </DialogContent>
                        <DialogActions>
                            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>Xác nhận</Button>
                            <Button onClick={handleClose} autoFocus>
                                Huỷ
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
                <div className="row">
                    <div className="col-md-12 mt-1">
                        {/* BaseInfo */}
                        <div className="card mb-3 content">

                            <div className="card-header">
                                <div className="row">
                                    <div className="col-md-9">
                                        <h1 m-3 pt-3>Thông tin cơ bản</h1>
                                    </div>
                                    <div className="col-md-3">
                                    </div>
                                </div>
                            </div>

                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Họ tên</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.firstName + ' ' + values.lastName}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Ngày sinh</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.dob}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Giới tính</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.sex}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Chức vụ</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.position}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Chuyên khoa</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.workAbout}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Nơi làm việc</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.workAt}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Email</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.email}</h5>
                                    </div>
                                </div>
                                <hr />

                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>SDT</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.phone}</h5>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <Button variant="contained" color="primary" fullWidth onClick={handleClickOpenEditInfo}>Cập nhật</Button>
                                    </div>
                                    <div className="col-md-6">
                                    </div>
                                    <div className="col-md-3">
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Intro */}
                        <div className="card mb-3 content">
                            <h1 className="m-3">Giới thiệu bản thân</h1>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <span style={{display:"inline-block"}}>
                                            <h5>Hình ảnh</h5>
                                        </span>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        {
                                            values.image == ''? <h6>Chưa có hình</h6>
                                            :<img src={values.image} style={{ margin: '3%' }} width="200" height="200" alt=""/>
                                        }
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Giới thiệu</h5>
                                    </div>
                                    {/* <div className="col-md-9 text-secondary">
                                        <h5>{firstIntroduce}</h5>
                                    </div> */}
                                </div>
                                {
                                    displayIntroduces.map(intro => 
                                        <div className="row">
                                            <div className="col-md-3"></div>
                                            <div className="col-md-9 text-secondary">
                                                <h5>- {intro}</h5>
                                            </div>
                                        </div>
                                    )
                                }
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>Chuyên khám</h5>
                                    </div>
                                </div>
                                {
                                    displayMedicalExamination.map(item => 
                                        <div className="row">
                                            <div className="col-md-3"></div>
                                            <div className="col-md-9 text-secondary">
                                                <h5>- {item}</h5>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                        {/* History */}
                        <div className="card mb-3 content">
                            <h1 className="m-3">Lịch sử công tác</h1>
                            <div className="card-body">
                                {
                                    workHistory.map((item) =>
                                        <div className="row">
                                            <div className="col-md-3">
                                                <h5>{"Từ " + item.from.substring(0, 10)}</h5>
                                                <h5>{"Đến " + item.to.substring(0, 10)}</h5>
                                            </div>
                                            <div className="col-md-9 text-secondary">
                                                <h5>{item.workplace.name}</h5>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Profile;