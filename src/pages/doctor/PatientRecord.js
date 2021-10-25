import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
  root: {
      flexGrow: 1,
  },
  padding: {
      padding: theme.spacing(3),
  },
  table: {
      minWidth: 700,
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
  createData('Thứ ba', '9:00', '20123', 'Nasri'),
  createData('Thứ ba', '11:30', '20124', 'Frank Ribry'),
  createData('Thứ tư', '8:30', '20125', 'Robben'),
  createData('Thứ năm', '8:00', '20126', 'Rikado Kaka')
];

function CustomizedTables(props) {
  const classes = useStyles();

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
                  {rows.map((row) => (
                      <StyledTableRow key={row.name}>
                          <StyledTableCell align="center">{row.day}</StyledTableCell>
                          <StyledTableCell align="center">{row.time}</StyledTableCell>
                          <StyledTableCell align="center">{row.recordId}</StyledTableCell>
                          <StyledTableCell align="center">{row.patient}</StyledTableCell>
                      </StyledTableRow>
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
  );
}

export default function PatientRecord() {
  const classes = useStyles();

//   const [day, setDay] = useState('Thứ hai');
//   const [time, setTime] = useState('10:00');
//   const [recordId, setRecordId] = useState('21033');
//   const [patient, setPatient] = useState('Hoàng Dũng');
//   const [dateTime, setDateTime] = useState('Thứ hai 10:00 ngày 25/09/2021');
//   const [place, setPlace] = useState('Bệnh viện A, số 150 Hoàng Minh Giám, quận Tân Bình');
//   const [reason, setReason] = useState('Buồn nôn, đau bụng');
//   const [type, setType] = useState('Khám lâm sàng chung');

  return (
      <div className={classes.root}>

          <CustomizedTables />
          
      </div>
  );
}
