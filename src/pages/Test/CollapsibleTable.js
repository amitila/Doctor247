import React from 'react';
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

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});

function createData(name, id, date, status, note, price) {
  return {
    name,
    id,
    date,
    status,
    note,
    price,
    history: [
      { date: '2020-01-05', customerId: 'Barack Obama', result: 'Đau bụng' },
      { date: '2020-01-02', customerId: 'Max Agleri', result: 'Tiêu chảy' },
    ],
  };
}

function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell >{row.id}</TableCell>
        <TableCell >{row.name}</TableCell>
        <TableCell >{row.date}</TableCell>
        <TableCell >{row.status}</TableCell>
        <TableCell >{row.note}</TableCell>
      </TableRow>
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
      </TableRow>
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

const rows = [
  createData('Jadon Sancho', 210930125, '2021/09/02', 'Chưa khám', '', 4),
  createData('Granit Xhaka', 210932684, '2021/08/30', 'Chưa khám', '', 4),
  createData('Erling Haaland', 210939003, '2021/08/24', 'Chưa khám', '', 3),
  createData('Thogan Hazard', 210926452, '2021/08/16', 'Chưa khám', '', 2),
  createData('Luka Modric', 210932611, '2021/08/06', 'Đang điều trị', '', 1),
  createData('James Harrison', 210932611, '2021/08/06', 'Đang điều trị', '', 1),
  createData('Marcos Alonso', 210932611, '2021/08/06', 'Đang điều trị', '', 1),
  createData('Jordan Lukaku', 210932611, '2021/08/06', 'Đã điều trị', '', 1),
];

export default function CollapsibleTable() {
  return (
    <TableContainer component={Paper}>
      <h3>Danh sách bệnh án</h3>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell width="15%">Mã hồ sơ</TableCell>
            <TableCell width="30%">Tên bệnh nhân</TableCell>
            <TableCell width="15%">Ngày khám</TableCell>
            <TableCell width="20%">Trạng thái</TableCell>
            <TableCell width="20%">Ghi chú</TableCell>
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
