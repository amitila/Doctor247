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
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function Profile(props) {
    const classes = useStyles();

    //const img1 = "https://thumbs.dreamstime.com/z/doctor-web-icon-therapist-medical-avatar-flat-style-illustration-doctor-web-icon-therapist-avatar-103706622.jpg";
    const [imgSrc, setImgSrc] = useState('');

    const [fullname, setFullname] = useState('');
    const [dob, setDob] = useState('');
    const [sex, setSex] = useState(0);
    const [position, setPosition] = useState('');
    const [workAbout, setWorkAbout] = useState('');
    const [workAt, setWorkAt] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [note, setNote] = useState('');

    const [firstIntroduce, setFirstIntroduce] = useState("");
    const [introduces, setIntroduces] = useState([]);

    const [workHistory, setWorkHistory] = useState([]);

    const [values, setValues] = useState({
        fullname: '',
        dob: '',
        sex: '',
        position: '',
        workAbout: '',
        workAt: '',
        email: '',
        phone: '',
        note: '',
        image: '',
    });

    const [openSex, setOpenSex] = React.useState(false);

    // const token = localStorage.getItem("token_doctor247");
    const token = getToken();
    useEffect(() => {
        APIService.getDoctorProfile(token, (success, json) => {
            if (success && json.result) {
                console.log('doctorinfo');
                console.log(json.result);
                const workHistoryList = json.result.doctor.workHistory;
                const positionName = workHistoryList.length > 0 ? workHistoryList[workHistoryList.length - 1].jobPosition.title : '';
                const workplaceName = (workHistoryList.length > 0) ? workHistoryList[workHistoryList.length - 1].workplace.name : '';
                setWorkHistory(workHistoryList);
                setValues({
                    fullname: json.result.doctor.firstName + " " + json.result.doctor.lastName,
                    dob: json.result.doctor.birthday.substring(0, 10),
                    sex: json.result.doctor.gender === "MALE" ? "Nam" : "Nữ",
                    position: positionName,
                    workAbout: json.result.doctor.specialized.name,
                    workAt: workplaceName,
                    email: json.result.email,
                    phone: '',
                    note: '',
                    image: json.result.doctor.image,
                });
                setIntroduces(json.result.doctor.introduce);
                setFirstIntroduce("Hiện đang là " + positionName + " - Chuyên khoa " + json.result.doctor.specialized.name + " tại " + workplaceName);
            }
        });
    }, []);

    useEffect(() => {
        console.log('workHistory');
        console.log(workHistory);
    }, [workHistory]);

    const [openEditInfo, setOpenEditInfo] = React.useState(false);

    const handleClickOpenEditInfo = () => {
        setOpenEditInfo(true);
        setFullname(values.fullname);
        setDob(values.dob);
        setSex(values.sex === 'Nam' ? 0 : 1);
        setPosition(values.position);
        setWorkAbout(values.workAbout);
        setWorkAt(values.workAt);
        setEmail(values.email);
        setPhone(values.phone);
        setNote(values.note);
    };

    const handleClose = () => {
        setOpenEditInfo(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({
            fullname: fullname,
            dob: dob,
            sex: sex,
            position: position,
            workAbout: workAbout,
            workAt: workAt,
            email: email,
            phone: phone,
            note: note
        });
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
                            <h4>Thông tin cơ bản</h4>
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
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setFullname(e.target.value)} required id="fullname" fullWidth label="Họ tên" defaultValue={fullname} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField onChange={(e) => setDob(e.target.value)} required id="dob" fullWidth label="Ngày sinh" defaultValue={dob} />
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
                                    <Grid item xs={6}>
                                        <TextField inputProps={{readOnly: true}} onChange={(e) => setPosition(e.target.value)} required id="position" fullWidth label="Chức vụ" defaultValue={position} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <TextField inputProps={{readOnly: true}} onChange={(e) => setWorkAbout(e.target.value)} required id="workAbout" fullWidth label="Chuyên khoa" defaultValue={workAbout} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField inputProps={{readOnly: true}} onChange={(e) => setEmail(e.target.value)} required id="email" fullWidth label="Email" defaultValue={email} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField inputProps={{readOnly: true}} onChange={(e) => setPhone(e.target.value)} required id="phone" fullWidth label="SDT" defaultValue={phone} />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField onChange={(e) => setNote(e.target.value)} id="note" fullWidth label="Ghi chú" defaultValue={note} />
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
                                        <h5>{values.fullname}</h5>
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
                                        <h5>Ghi chú</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        <h5>{values.note}</h5>
                                    </div>
                                </div>
                                <hr />
                                <div className="row">
                                    <div className="col-md-3">
                                        <Button variant="outlined" fullWidth onClick={handleClickOpenEditInfo}>Cập nhật</Button>
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
                                        <CustomImage image={values.image} style={{ margin: '3%' }} width="44%" height="200" alt=""/>
                                        {/* <img src={} style={{ margin: '3%' }} width="44%" height="200" alt=""></img> */}
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
                                    introduces.map(intro => 
                                        <div className="row">
                                            <div className="col-md-3"></div>
                                            <div className="col-md-9 text-secondary">
                                                <h5>- {intro}</h5>
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