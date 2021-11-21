import React, { useContext, useEffect, useState } from 'react';
import userImg from '../../../assets/user.png';
import '../../../App.css';
import { AppContext } from '../../../store/AppProvider';
import Grid from '@material-ui/core/Grid';
import PropTypes from "prop-types";
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

function createData(day, time, recordId, patient) {
    return { day, time, recordId, patient };
}

const rows = [
    createData('Thứ hai', '9:30', '20121', 'Luke Shaw'),
    createData('Thứ hai', '10:30', '20122', 'Ben Arfa'),
    createData('Thứ ba', '11:30', '20124', 'Frank Ribry'),
    createData('Thứ năm', '8:00', '20126', 'Rikado Kaka')
];

function CustomizedTables(props) {
    const classes = useStyles();
    
    const { appointmentList } = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">Ngày</StyledTableCell>
                        <StyledTableCell align="center"> Giờ</StyledTableCell>
                        <StyledTableCell align="center">Mã hồ sơ</StyledTableCell>
                        <StyledTableCell align="center">Tên bệnh nhân</StyledTableCell>
                        <StyledTableCell align="center"></StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {appointmentList.map((row) => (
                        <StyledTableRow key={row.name}>
                            <StyledTableCell align="center">{row.day.substring(0,10)}</StyledTableCell>
                            <StyledTableCell align="center">{row.day.substring(11,16)}</StyledTableCell>
                            <StyledTableCell align="center">{row.medicalRecordId}</StyledTableCell>
                            <StyledTableCell align="center">{row.medicalRecord.customer.firstName + " " + row.medicalRecord.customer.lastName}</StyledTableCell>
                        </StyledTableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default function DrBody() {
    const classes = useStyles();
    // const token = localStorage.getItem("token_doctor247");
    const token = getToken();

    const { ScreenCode, setCurrentMenuItem } = useContext(AppContext);

    const [appointmentList, setAppointmentList] = useState([]);

    const [contacts, setContacts] = useState([{id: 0, name: '', status: ''}]);

    useEffect(() => {
        APIService.getDoctorAppointment(token, (success, json) => {
            if (success && json.result) {
                setAppointmentList(json.result);
            }
        });

        setContacts([
            {
                id: 1,
                name: 'Tâm Phạm',
                status: 'online'
            },
            {
                id: 2,
                name: 'Hân Lê',
                status: 'online'
            },
            {
                id: 3,
                name: 'Dũng Hoàng',
                status: 'online'
            },{
                id: 4,
                name: 'Tâm Phạm',
                status: 'offline'
            },
            {
                id: 5,
                name: 'Hân Lê',
                status: 'offline'
            },
            {
                id: 6,
                name: 'Dũng Hoàng',
                status: 'offline'
            },
        ]);
    }, []);

    const handleContactClick = () => {
        //window.open("http://localhost:3000/videocall?id=a?name=dung", "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=0,left=0,width=1200,height=800");
    }

    return (
        <div className={classes.body}>
            <div className={classes.cards}>
                <div className={classes.cardSingle + " " + classes.cardFirst} onClick={() => {setCurrentMenuItem(ScreenCode.CHAT)}}>
                    <div>
                        <h1>3</h1>
                        <span>Tin nhắn mới</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className={classes.cardSingle} onClick={() => {setCurrentMenuItem(ScreenCode.MEDICAL_RECORD)}}>
                    <div>
                        <h1>44</h1>
                        <span>Hồ sơ</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className={classes.cardSingle} onClick={() => {setCurrentMenuItem(ScreenCode.TIMETABLE)}}>
                    <div>
                        <h1>13</h1>
                        <span>Yêu cầu mới</span>
                    </div>
                    <div>
                        <span>=_=</span>
                    </div>
                </div>

                <div className={classes.cardSingle} onClick={() => {setCurrentMenuItem(ScreenCode.NOTIFY)}}>
                    <div>
                        <h1>2</h1>
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
                                <CustomizedTables appointmentList={appointmentList}/>
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
                                    contacts.map(contact =>
                                        <div className={classes.customer}>
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

