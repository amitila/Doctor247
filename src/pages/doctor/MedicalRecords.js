import React, { useContext, useState } from 'react';
import './Profile.css';
import {DoctorContext} from './DoctorProvider';

import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            borderBottom: 'unset',
        },
    },
    smallAvatar: {
        width: theme.spacing(3),
        height: theme.spacing(3),
    },
    largeAvatar: {
        width: theme.spacing(16),
        height: theme.spacing(16),
    },
    editIcon: {
        fontSize: '25px',
        marginLeft: '10px',
        cursor: 'pointer',
        '&:hover': {
            color: '#004d40'
         },
    }
}));

function createData(name, id, date, status, note,) {
    return {
        name,
        id,
        date,
        status,
        note,
        history: status==='Chưa khám'?null:[
            { date: '2020-01-05', customerId: 'Barack Obama', result: 'Đau bụng' },
            { date: '2020-01-02', customerId: 'Max Agleri', result: 'Tiêu chảy' },
        ],
    };
}

function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();

    return (
        <React.Fragment>
            <TableRow className={classes.root}>
                <TableCell>
                    {(row.history===null)?null:<IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>}
                </TableCell>
                <TableCell >{row.id}</TableCell>
                <TableCell >{row.name}</TableCell>
                <TableCell >{row.date}</TableCell>
                <TableCell >{row.status}</TableCell>
                <TableCell >{row.note}</TableCell>
                <TableCell> <CreateButton/> </TableCell>
            </TableRow>
            {(row.history===null)?null:
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tiền sử bệnh án
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Thời gian</TableCell>
                                        <TableCell>Người khám</TableCell>
                                        <TableCell align="right">Kết quả</TableCell>
                                        <TableCell align="right">Ghi chú</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.result}</TableCell>
                                            <TableCell align="right">
                                                {historyRow.price}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>}
        </React.Fragment>
    );
}

Row.propTypes = {
    row: PropTypes.shape({
        id: PropTypes.number.isRequired,
        status: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
        history: PropTypes.arrayOf(
            PropTypes.shape({
                result: PropTypes.string.isRequired,
                customerId: PropTypes.string.isRequired,
                date: PropTypes.string.isRequired,
            }),
        ).isRequired,
        name: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        note: PropTypes.string.isRequired,
    }).isRequired,
};

function CreateButton(props) {
    const {setContentId, ContentCode} = useContext(DoctorContext);
    return (
        <Button variant="contained" color="primary" onClick={() => setContentId(ContentCode.DETAIL)}>Chi tiết</Button>
    )
}

const rows = [
    createData('Jadon Sancho', 210930125, '2021/09/02', 'Chưa khám', ''),
    createData('Granit Xhaka', 210932684, '2021/08/30', 'Chưa khám', ''),
    createData('Erling Haaland', 210939003, '2021/08/24', 'Chưa khám', ''),
    createData('Thogan Hazard', 210926452, '2021/08/16', 'Chưa khám', ''),
    createData('Luka Modric', 210932611, '2021/08/06', 'Đang điều trị', ''),
    createData('James Harrison', 210932611, '2021/08/06', 'Đang điều trị', ''),
    createData('Marcos Alonso', 210932611, '2021/08/06', 'Đang điều trị', ''),
    createData('Jordan Lukaku', 210932611, '2021/08/06', 'Đã điều trị', '')
];

function MedicalRecordList() {

    return (
        <TableContainer component={Paper}>
            <Grid container xs={12} sm={12} spacing={3}>
                <Grid item xs={8} sm={8} md={8}>
                    <h3>Danh sách bệnh án</h3>
                </Grid>
                <Grid item xs={4}>
                <Button variant="outlined" color="primary">
                        Thêm mới
                    </Button>
                </Grid>
            </Grid>            
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell />
                        <TableCell width="15%">Mã hồ sơ</TableCell>
                        <TableCell width="15%">Tên bệnh nhân</TableCell>
                        <TableCell width="15%">Ngày khám</TableCell>
                        <TableCell width="15%">Trạng thái</TableCell>
                        <TableCell width="20%">Ghi chú</TableCell>
                        <TableCell width="20%"></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <Row key={row.name} row={row} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

function MedicalRecordDetail() {
    const classes = useStyles();

    const [patientHeight, setPatientHeight] = useState('171 cm');

    const [patientWeight, setPatientWeight] = useState('62 kg');

    const [patientBodyTemperature, setPatientBodyTemperature] = useState('31 C');

    const [patientBloodPressure, setPatientBloodPressure] = useState('120/80 mmHg');

    const [patientHeartbeat, setPatientHeartbeat] = useState('80 lần/phút');

    const [patientBodyStats, setPatientBodyStats] = useState({
        patientHeight: '171 cm',
        patientWeight: '62 kg',
        patientBodyTemperature: '31 C',
        patientBloodPressure: '120/80 mmHg',
        patientHeartbeat: '80 lần/phút',
    });
    
    const [isEditBodyStats, setIsEditBodyStats] = useState(false);

    const handleEditBodyStats = () => {
        setIsEditBodyStats(true);
    }
    
    const handleClose = () => {
        setIsEditBodyStats(false);
    };

    const handleConfirm = () => {
        setPatientBodyStats({
            patientHeight: patientHeight,
            patientWeight: patientWeight,
            patientBodyTemperature: patientBodyTemperature,
            patientBloodPressure: patientBloodPressure,
            patientHeartbeat: patientHeartbeat,
        })
        setIsEditBodyStats(false);
    }

    return(
        <React.Fragment>
            <Grid container spacing={3}>
                <Grid container item xs={12} sm={12} md={4}>
                    <Paper style={{backgroundColor: '#cef5f2'}}>
                        <h3>Thông tin bệnh nhân</h3>
                        <Grid container xs={12} spacing={3}>
                            <Grid item xs={6}>
                                <Avatar
                                    className={classes.largeAvatar}
                                    alt="Remy Sharp"
                                    src="https://file.hstatic.net/1000231532/file/mo_hinh_doraemon_chinh_hang_gundam_store_vn_aff780d8c0f8454bbdd0de44ee8b7d91_grande.jpg"
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField
                                style={{marginTop: "20px"}}
                                    id="standard-read-only-input"
                                    label="Họ tên"
                                    defaultValue="Dũng Hoàng"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                style={{marginTop: "20px"}}
                                    id="standard-read-only-input"
                                    label="Giới tính"
                                    defaultValue="Nam"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                style={{marginTop: "20px"}}
                                    id="standard-read-only-input"
                                    label="Ngày sinh"
                                    defaultValue="1990/01/01"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                            </Grid>
                            <Grid item xs={12} style={{marginLeft: '10px'}}>
                                <TextField
                                    style={{marginTop: "20px"}}
                                    id="standard-read-only-input"
                                    label="SĐT"
                                    fullWidth
                                    defaultValue="0325145641"
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                style={{marginTop: "20px"}}
                                    id="standard-read-only-input"
                                    label="Địa chỉ"
                                    defaultValue="12 đường 147 phường Linh Trung"
                                    multiline
                                    fullWidth
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />
                                <TextField
                                    style={{marginTop: "20px"}}
                                    id="standard-read-only-input"
                                    label="Ghi chú"
                                    multiline
                                    fullWidth
                                    defaultValue="Bệnh nhân bị cao huyết áp. Lấy toa và tự mua thuốc."
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                />                                
                            </Grid>
                            <br/>
                        </Grid>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={12} md={8}>
                    <Paper >
                        <h3>Tình trạng</h3>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Lý do khám"
                                defaultValue="Chóng mặt"
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Than phiền của bệnh nhân"
                                defaultValue="Chóng mặt, chỉ uống emalapril mà không sử dụng Thizide"
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <br/><br/>
                    </Paper>

                    <Paper style={{marginTop: "20px"}}>
                        <h3>Thông tin đăng ký khám</h3>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Thời gian đăng ký"
                                defaultValue="Thứ 7 16:00 23/09/2021"
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Địa điểm khám"
                                defaultValue="Bệnh viện A, số 150 Hoàng Minh Giám, quận Tân Bình"
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Lý do khám"
                                defaultValue="Buồn nôn, đau bụng"
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Loại khám"
                                defaultValue="Khám lâm sàng chung"
                                multiline
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <br/><br/>
                    </Paper>
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <Paper style={{marginTop: "20px"}}>
                        <span style={{display: 'inline-block'}}><h3>Các chỉ số cơ thể</h3></span>
                        <i className={["fas fa-pencil-alt", classes.editIcon].join(' ')} onClick={handleEditBodyStats}></i>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Chiều cao"
                                value={patientBodyStats.patientHeight}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Cân nặng"
                                value={patientBodyStats.patientWeight}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Thân nhiệt"
                                value={patientBodyStats.patientBodyTemperature}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Huyết áp"
                                value={patientBodyStats.patientBloodPressure}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid container xs={12} md={12} spacing={3} style={{marginTop: "20px", marginLeft: "20px"}}>
                            <TextField
                                id="standard-read-only-input"
                                label="Nhịp tim"
                                value={patientBodyStats.patientHeartbeat}
                                style={{width:'95%'}}
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                    </Paper>
                </Grid>

            </Grid>
            <Dialog open={isEditBodyStats} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Các chỉ số sức khoẻ</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Chiều cao"
                        onChange={(e) => setPatientHeight(e.target.value)}
                        defaultValue={patientBodyStats.patientHeight}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Cân nặng"
                        onChange={(e) => setPatientWeight(e.target.value)}
                        defaultValue={patientBodyStats.patientWeight}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Thân nhiệt"
                        onChange={(e) => setPatientBodyTemperature(e.target.value)}
                        defaultValue={patientBodyStats.patientBodyTemperature}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Huyết áp"
                        onChange={(e) => setPatientBloodPressure(e.target.value)}
                        defaultValue={patientBodyStats.patientBloodPressure}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        label="Nhịp tim"
                        onChange={(e) => setPatientHeartbeat(e.target.value)}
                        defaultValue={patientBodyStats.patientHeartbeat}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Huỷ
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

const ContentCode = {
    LIST: 1,
    DETAIL: 2
}

const ShowContent = (props) => {
    if(props.contentId === ContentCode.LIST){
        return (
            <MedicalRecordList/>
        );
    }
    else if(props.contentId === ContentCode.DETAIL){
        return(
            <MedicalRecordDetail/>
        );
    }
}



export default function MedicalRecords(props) {
    const {contentId, setContentId, ContentCode} = useContext(DoctorContext);

    return (
        <React.Fragment>
            <div>
                <Grid container spacing={2}>
                    <Grid xs={12} md={12}>
                        <ShowContent contentId={contentId}/>
                    </Grid>
                    {/* <Grid xs={12} md={12}>
                        <Calendar/>
                    </Grid> */}
                    <Grid xs={12} md={12} style={{marginTop: "100px"}}>
                        <Button variant="contained" hidden={contentId === ContentCode.LIST} onClick={() => setContentId(ContentCode.LIST)}>
                            Return to List
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
}