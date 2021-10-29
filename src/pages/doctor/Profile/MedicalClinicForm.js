import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";

const axios = require("axios");

function ConfirmationDialogRaw(props) {
  const { onClose, value: valueProp, open, ...other } = props;
  const [value, setValue] = React.useState(valueProp);
  const radioGroupRef = React.useRef(null);

  React.useEffect(() => {
    if (!open) {
      setValue(valueProp);
    }
  }, [valueProp, open]);

  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const handleCancel = () => {
    onClose();
  };

  const handleOk = () => {
    console.log(provinceSelect);
    onClose(value);
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const classes = useStyles();
  const [state, setState] = React.useState({
    age: "",
    name: "hai"
  });

  const handleChangeAge = (event) => {
    const name = event.target.name;
    setState({
      ...state,
      [name]: event.target.value
    });
  };

  const [openProvinces, setOpenProvinces] = React.useState(false);
  const [openDistricts, setOpenDistricts] = React.useState(false);
  const [openWards, setOpenWards] = React.useState(false);
  const [provinceSelect, setProvinceSelect] = React.useState("");
  const [districtSelect, setDistrictSelect] = React.useState("");
  const [wardSelect, setWardSelect] = React.useState("");
  const [provinces, setProvinces] = React.useState([]);
  const [districts, setDistricts] = React.useState([]);
  const [wards, setWards] = React.useState([]);

  const handleChangeProvince = (event) => {
    setProvinceSelect(event.target.value);
    console.log(event.target.value);
  };
  const handleChangeDistrict = (event) => {
    setDistrictSelect(event.target.value);
    console.log(event.target.value);
  };
  const handleChangeWard = (event) => {
    setWardSelect(event.target.value);
    console.log(event.target.value);
  };

  const handleCloseProvinces = () => {
    setOpenProvinces(false);
  };
  const handleCloseDistricts = () => {
    setOpenDistricts(false);
  };
  const handleCloseWards = () => {
    setOpenWards(false);
  };
  const handleOpenProvinces = () => {
    setOpenProvinces(true);
  };
  const handleOpenDistricts = () => {
    setOpenDistricts(true);
  };
  const handleOpenWards = () => {
    setOpenWards(true);
  };

  useEffect(() => {
    // Make a request for a user with a given ID
    axios
      .get("https://provinces.open-api.vn/api/?depth=2")
      .then(function (response) {
        console.log("response+start");
        console.log(response);
        setProvinces(response.data);
        console.log("response+end");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });

    axios
      .get("https://provinces.open-api.vn/api/w")
      .then(function (response) {
        console.log("response+start");
        console.log(response);
        console.log("response+end");
      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
      .then(function () {
        // always executed
      });
  }, []);

  useEffect(() => {
    setDistricts([]);
    setWards([]);
  }, [provinces]);

  return (
    <Dialog
      maxWidth="xs"
      onEntering={handleEntering}
      aria-labelledby="confirmation-dialog-title"
      open={open}
      {...other}
    >
      <DialogTitle id="confirmation-dialog-title">Đăng ký PK</DialogTitle>
      <DialogContent dividers>
        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-controlled-open-select-label">
            Thành Phố/Tỉnh
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openProvinces}
            value={provinceSelect}
            onClose={handleCloseProvinces}
            onOpen={handleOpenProvinces}
            onChange={handleChangeProvince}
          >
            <MenuItem value={0}>
              <em>Chọn tỉnh / thành phố</em>
            </MenuItem>
            {provinces.map((province) => (
              <MenuItem value={province.code}>{province.name}</MenuItem>
            ))}
            {/* {
                operation.map(o => <MenuItem value={o.id}>{o.address}</MenuItem>)
              } */}
          </Select>
        </FormControl>
        <br />

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-controlled-open-select-label">
            Quận/Huyện
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openDistricts}
            value={districtSelect}
            onClose={handleCloseDistricts}
            onOpen={handleOpenDistricts}
            onChange={handleChangeDistrict}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            {districts.map((district) => (
              <MenuItem value={district.code}>{district.name}</MenuItem>
            ))}
            {/* {
                operation.map(o => <MenuItem value={o.id}>{o.address}</MenuItem>)
              } */}
          </Select>
        </FormControl>
        <br />

        <FormControl className={classes.formControl} fullWidth>
          <InputLabel id="demo-controlled-open-select-label">
            Phường/Xã
          </InputLabel>
          <Select
            labelId="demo-controlled-open-select-label"
            id="demo-controlled-open-select"
            open={openWards}
            value={wardSelect}
            onClose={handleCloseWards}
            onOpen={handleOpenWards}
            onChange={handleChangeWard}
          >
            <MenuItem value={0}>
              <em>None</em>
            </MenuItem>
            {wards.map((ward) => (
              <MenuItem value={ward.code}>{ward.name}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <br />

        <TextField
          id="filled-full-width"
          label="Tỉnh/Thành Phố"
          placeholder=""
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="filled-full-width"
          label="Quận/Huyện"
          placeholder=""
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="filled-full-width"
          label="Phường/Xã/Thị Trấn"
          placeholder=""
          margin="normal"
          fullWidth
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="filled-full-width"
          label="Số nhà, đường"
          placeholder="số nhà, đường, ấp/tổ/khu phố"
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="filled-full-width"
          label="Điện thoại"
          placeholder=""
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="filled-full-width"
          label="Thời gian làm việc"
          placeholder=""
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
        <TextField
          id="filled-full-width"
          label="Ngày bắt đầu hoạt động"
          placeholder=""
          helperText="Full width!"
          fullWidth
          margin="normal"
          InputLabelProps={{
            shrink: true
          }}
          variant="outlined"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOk} color="primary" variant="outlined">
          Đăng ký
        </Button>
        <Button
          autoFocus
          onClick={handleCancel}
          color="primary"
          variant="outlined"
        >
          Huỷ
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired
};

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
  }
}));

export default function MedicalClinic() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("Dione");

  const handleClickListItem = () => {
    setOpen(true);
  };

  const handleClose = (newValue) => {
    setOpen(false);

    if (newValue) {
      setValue(newValue);
    }
  };

  return (
    <div className={classes.root}>
      <List component="div" role="list">
        <ListItem button divider disabled role="listitem">
          <ListItemText primary="Interruptions" />
        </ListItem>
        <ListItem
          button
          divider
          aria-haspopup="true"
          aria-controls="ringtone-menu"
          aria-label="phone ringtone"
          onClick={handleClickListItem}
          role="listitem"
        >
          <ListItemText primary="Phone ringtone" secondary={value} />
        </ListItem>
        <ListItem button divider disabled role="listitem">
          <ListItemText
            primary="Default notification ringtone"
            secondary="Tethys"
          />
        </ListItem>
        <ConfirmationDialogRaw
          classes={{
            paper: classes.paper
          }}
          id="ringtone-menu"
          keepMounted
          open={open}
          onClose={handleClose}
          value={value}
        />
      </List>
    </div>
  );
}
