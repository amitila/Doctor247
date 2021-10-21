import React, { useState } from 'react';
import './Profile.css';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//   }));

function Profile(props) {
    const [fullname, setFullname] = useState('Nguyễn Thành Tâm');
    const [dob, setDob] = useState('1970/04/30');
    const [sex, setSex] = useState('Nam');
    const [position, setPosition] = useState('Bác sĩ');
    const [workAbout, setWorkAbout] = useState('Đa khoa');
    const [workAt, setWorkAt] = useState('BV Nhi Đồng, TP. Hồ Chí Minh');
    const [email, setEmail] = useState('nttam1970@gmail.com');
    const [phone, setPhone] = useState('03265496871');
    const [note, setNote] = useState('Không');
    
    const [values, setValues] = useState({
        fullname: 'Nguyễn Thành Tâm',
        dob: '1970/04/30',
        sex: 'Nam',
        position: 'Bác sĩ',
        workAbout: 'Đa khoa',
        workAt: 'BV Nhi Đồng, TP. Hồ Chí Minh',
        email: 'nttam1970@gmail.com',
        phone: '03265496871',
        note: 'Không'        
    });

    //const classes = useStyles();
    
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
        setFullname(values.fullname);
        setDob(values.dob);
        setSex(values.sex);
        setPosition(values.position);
        setWorkAbout(values.workAbout);
        setWorkAt(values.workAt);
        setEmail(values.email);
        setPhone(values.phone);
        setNote(values.note);
    };

    const handleClose = () => {
        setOpen(false);
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
    
    return (
        <React.Fragment>
            <div>
                <Dialog
                    open={open}
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
                                    <TextField onChange={(e) => setFullname(e.target.value)} required id="fullname" fullWidth label="Họ tên" defaultValue={fullname} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField onChange={(e) => setDob(e.target.value)} required id="dob" fullWidth label="Ngày sinh" defaultValue={dob} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField onChange={(e) => setSex(e.target.value)} required id="sex" fullWidth label="Giới tính" defaultValue={sex} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField onChange={(e) => setPosition(e.target.value)} required id="position" fullWidth label="Chức vụ" defaultValue={position} />
                                </Grid>
                                <Grid item xs={6}>
                                    <TextField onChange={(e) => setWorkAbout(e.target.value)} required id="workAbout" fullWidth label="Chuyên khoa" defaultValue={workAbout} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={(e) => setWorkAt(e.target.value)} required id="workAt" fullWidth label="Nơi làm việc" defaultValue={workAt} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={(e) => setEmail(e.target.value)} required id="email" fullWidth label="Email" defaultValue={email} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={(e) => setPhone(e.target.value)} required id="phone" fullWidth label="SDT" defaultValue={phone} />
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField onChange={(e) => setNote(e.target.value)} id="note" fullWidth label="Ghi chú" defaultValue={note} />
                                </Grid>
                            </Grid>
                        </DialogContentText>
                        
                    </DialogContent>
                    <DialogActions>
                        <Button type="submit" variant="contained" color="primary" onClick={handleClose}>Xác nhận</Button>
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
                                        <Button variant="outlined" fullWidth onClick={handleClickOpen}>Sửa</Button>
                                    </div>
                                    <div className="col-md-9">
                                    </div>                                   
                                </div>                                
                            </div>
                        </div>


                         {/* History */}
                        <div className="card mb-3 content">
                            <h1 className="m-3">Lịch sử công tác</h1>
                            <div className="card-body">
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>2010 - 2014</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        BV Nhân Dân
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3">
                                        <h5>2015 - 2021</h5>
                                    </div>
                                    <div className="col-md-9 text-secondary">
                                        BV Nhi Đồng
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default Profile;