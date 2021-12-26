import React, { useContext, useEffect, useState } from 'react';
import userImg from '../../../assets/user.png';
import '../../../App.css';
import { AppContext } from '../../../store/AppProvider';
import Grid from '@material-ui/core/Grid';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import APIService from '../../../utils/APIService';
import getToken from '../../../helpers/getToken';
import { useSnackbar } from 'notistack';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper
    },
    body: {
        fontFamily: 'montserrat',
        marginTop: '20px',
        padding: '2rem 1.5rem',
        background: '#f1f5f9',
        minHeight: 'calc(100vh-90px)'
    },
    cards: {
        display: 'flex',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '2rem'
    },
    cardSingle: {
        display: 'flex',
        justifyContent: 'space-between',
        background: '#fff',
        borderRadius: '2px',
        cursor: 'pointer',
        '&:hover': {
            background: '#1b9bff',
            color: '#fff'
        },
        fontSize: '2rem',
        color: '#1b9bff'
    },
    customer: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '.5rem 1rem',
        cursor: 'pointer',
        '&:hover': {
            background: '#e3e3e3',
        },
    },
    title: {
        background: '#bfe3ff',
        paddingTop: 10,
    },
    root: {
        flexGrow: 1,
    },
    padding: {
        padding: theme.spacing(3),
    },
}));

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: '#c4c4c4',
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);
  
const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);

function getTime(datetime){
    const dt = new Date(datetime);
    let result = dt.getHours() + ":" + dt.getMinutes().toString().padStart(2, '0');
    return result;
}

function getDay(datetime) {
    const dt = new Date(datetime);
    const dayCode = dt.getDay();
    let result = dt.getDate() + "/" + (dt.getMonth()+1) + "/" + dt.getFullYear() + "";
    switch (dayCode) {
        case 0:
            result += "(Chủ nhật)";
            break;
        case 1:
            result += "(Thứ hai)";
            break;
        case 2:
            result += "(Thứ ba)";
            break;
        case 3:
            result += "(Thứ tư)";
            break;
        case 4:
            result += "(Thứ năm)";
            break;
        case 5:
            result += "(Thứ sáu)";
            break;
        case 6:
            result += "(Thứ bảy)";
            break;
        default:
            result = "error";
            break;
    }
    return result;
}

function CustomizedTables(props) {
    const classes = useStyles();
    
    const { displayAppointmentList } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Ngày</StyledTableCell>
                        <StyledTableCell align="center"> Giờ</StyledTableCell>
                        <StyledTableCell align="center">Tên bệnh nhân</StyledTableCell>
                        <StyledTableCell align="center">Nơi khám</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {displayAppointmentList.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="center">{getDay(row.day)}</StyledTableCell>
                            <StyledTableCell align="center">{getTime(row.day)}</StyledTableCell>
                            <StyledTableCell align="center">{row.medicalRecord.customer.firstName + " " + row.medicalRecord.customer.lastName}</StyledTableCell>
                            <StyledTableCell align="center">{row.workplace.name}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function DrBody(props) {
    const classes = useStyles();
    const token = getToken();
    const { myManagementClinics } = props;
    const { ScreenCode, setCurrentMenuItem, pendingAppointmentList, newPendingAppointmentList, setPendingAppointmentList ,setNewPendingAppointmentList } = useContext(AppContext);
    const { enqueueSnackbar } = useSnackbar();

    const [contactList, setContactList] = useState([{id: 0, name: '', status: ''}]);
    const [displayAppointmentList, setDisplayAppointmentList] = useState([]);
    const [applicationsList, setApplicationsList] = React.useState([]);

    const reloadPage = () => {
        myManagementClinics.forEach(clinic => {
            APIService.getDoctorWorkPlaceApplied(
                token,
                clinic.id,
                "PENDING",
                (success, json) => {
                    if (success, json.result) {
                        let list = [];
                        json.result.forEach(item => {
                            list.push({
                                ...item,
                                clinicName: clinic.name,
                                clinicId: clinic.id
                            });
                        });
                        setApplicationsList(list);
                    }
                }
            );
        });
        APIService.getDoctorAppointment(token, (success, json) => {
            if (success && json.result) {
                let listPendingAppointment = [];
                let listContacts = [];
                let list = [];
                json.result.forEach(item => {
                   if (item.status === 'PENDING'){
                       let d = item.day.substring(0,16).replaceAll('-','').replaceAll('T','').replaceAll(':','');
                       let d2 = item.createdAt.substring(0,16).replaceAll('-','').replaceAll('T','').replaceAll(':','');
                       d = parseInt(d);
                       d2 = parseInt(d2);
                       listPendingAppointment.push({
                           ...item,
                           od: d
                       });
                       list.push({
                           id: item.id,
                           od: d2
                       });
                    }
                    if (listContacts.length > 0) {
                        if (listContacts.findIndex(x => x.id === item.medicalRecord.customer.userId) < 0) {
                            listContacts.push({
                                id: item.medicalRecord.customer.userId,
                                name: item.medicalRecord.customer.firstName + " " + item.medicalRecord.customer.lastName,
                                status: ''
                            });
                        }
                    }
                    else {
                        listContacts.push({
                            id: item.medicalRecord.customer.userId,
                            name: item.medicalRecord.customer.firstName + " " + item.medicalRecord.customer.lastName,
                            status: ''
                        });
                    }

                });
                listPendingAppointment.sort(function(a, b) {
                    return a.od - b.od;
                  });
                setDisplayAppointmentList(listPendingAppointment);
                setContactList(listContacts);
                setNewPendingAppointmentList(list);
                setPendingAppointmentList(list);
            }
        });
    }

    useEffect(() => {
        reloadPage();
    }, []);

    useEffect(() => {
        if (pendingAppointmentList.length < newPendingAppointmentList.length) {
            enqueueSnackbar('Bạn có ' + (newPendingAppointmentList.length - pendingAppointmentList.length) + ' cuộc hẹn mới!', { variant: 'info' });
            reloadPage();
        }
        else if (pendingAppointmentList.length > newPendingAppointmentList.length) {
            if (newPendingAppointmentList.length > 0) {
                enqueueSnackbar('Bạn có cuộc hẹn bị hủy!', { variant: 'warning' });
            }
            else {
                enqueueSnackbar('Bạn có ' + pendingAppointmentList.length + ' cuộc hẹn bị hủy!', { variant: 'warning' });
            }
            // console.log('pendingAppointmentList');
            // console.log(pendingAppointmentList);
            // console.log('newPendingAppointmentList');
            // console.log(newPendingAppointmentList);
            // console.log('lastItem');
            // console.log(pendingAppointmentList[pendingAppointmentList.length - 1]);
            // console.log('lastItemNew');
            // console.log(newPendingAppointmentList[newPendingAppointmentList.length - 1]);
        }
        else {
            if (newPendingAppointmentList.length > 0) {
                for (let index = 0; index < newPendingAppointmentList.length; index++) {
                    if (newPendingAppointmentList[index].id !== pendingAppointmentList[index].id) {
                        enqueueSnackbar('Bạn có cuộc hẹn bị hủy và cuộc hẹn mới!', { variant: 'warning' });
                    }
                    
                }
            }
        }
    }, [newPendingAppointmentList.length]);

    const handleContactClick = (id) => {
        console.log(id);
        console.log('pendingAppointmentList');
        console.log(pendingAppointmentList);
        console.log('newPendingAppointmentList');
        console.log(newPendingAppointmentList);

        //window.open("http://localhost:3000/videocall?id=a?name=dung", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=1200,height=800");
    }

    return (
        <div className={classes.body}>
            <div className={classes.cards}>
                <div className={classes.cardSingle + " " + classes.cardFirst} onClick={() => {setCurrentMenuItem(ScreenCode.CHAT)}}>
                    <div>
                        <h1>0</h1>
                        <span>Tin nhắn mới</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className={classes.cardSingle} onClick={() => {setCurrentMenuItem(ScreenCode.TIMETABLE)}}>
                    <div>
                        <h1>{displayAppointmentList.length}</h1>
                        <span>Cuộc hẹn mới</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className={classes.cardSingle} onClick={() => {setCurrentMenuItem(ScreenCode.WORK_PLACE)}}>
                    <div>
                        <h1>{applicationsList.length}</h1>
                        <span>Yêu cầu mới</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className={classes.cardSingle} onClick={() => {setCurrentMenuItem(ScreenCode.NOTIFY)}}>
                    <div>
                        <h1>0</h1>
                        <span>Thông báo</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>
            </div>

            <br/>
            <br/>
            <div >
                <Grid container spacing={3}>
                    <Grid item xs={12} md={8}>
                        <div class="card">
                            <div className={classes.title}>
                                <h3 style={{textAlign: 'center'}}>Những cuộc hẹn sắp tới</h3>
                            </div>
                            <div className={classes.root}>
                                <CustomizedTables displayAppointmentList={displayAppointmentList}/>
                            </div>
                        </div>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <div class="card" >
                            <div className={classes.title}>
                                <h3 style={{textAlign: 'center'}}>Liên lạc</h3>
                            </div>

                            <div style={{maxHeight: '350px', overflowY: 'scroll'}}>
                                {
                                    contactList.map(contact =>
                                        <div className={classes.customer} onClick={() => {handleContactClick(contact.id)}}>
                                            <div className="info">
                                                <img src={userImg} width="40px" height="40px" alt=""></img>
                                                <div>
                                                    <h4>{contact.name}</h4>
                                                    <small>{contact.status}</small>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    );
}

