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
        </TableCell>
        <TableCell component="th" scope="row">{row.name}</TableCell>
        <TableCell align="right">{row.id}</TableCell>
        <TableCell align="right">{row.date}</TableCell>
        <TableCell align="right">{row.status}</TableCell>
        <TableCell align="right">{row.note}</TableCell>
        
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
  createData('Jadon Sancho', 210930125, '2021/09/02', '', '', 4),
  createData('Granit Xhaka', 210932684, '2021/08/30', '', '', 4),
  createData('Erling Haaland', 210939003, '2021/08/24', '', '', 3),
  createData('Jordan Lukaku', 210932611, '2021/08/06', '', '', 1),
  createData('Jadon Sancho', 210930125, '2021/09/02', '', '', 4),
  createData('Granit Xhaka', 210932684, '2021/08/30', '', '', 4),
  createData('Erling Haaland', 210939003, '2021/08/24', '', '', 3),
  createData('Jordan Lukaku', 210932611, '2021/08/06', '', '', 1),
  createData('Jadon Sancho', 210930125, '2021/09/02', '', '', 4),
  createData('Granit Xhaka', 210932684, '2021/08/30', '', '', 4),
  createData('Erling Haaland', 210939003, '2021/08/24', '', '', 3),
  createData('Jordan Lukaku', 210932611, '2021/08/06', '', '', 1),
];

export default function PatientRecord() {
  return (
    <TableContainer sx={{ maxHeight: 400 }}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Tên bệnh nhân</TableCell>
            <TableCell align="right">Mã hồ sơ</TableCell>
            <TableCell align="right">Ngày khám</TableCell>
            <TableCell align="right">Trạng thái</TableCell>
            <TableCell align="right">Ghi chú</TableCell>
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
