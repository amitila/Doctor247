import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';
import { useHistory } from "react-router-dom";
import APIService from '../../../../utils/APIService';

const profileList = [];
const token = document.cookie.slice(6);
var patientList = [];
APIService.getGuardian(
    token,
    (success, json) => {
        if (success && json.result) {
            json.result.map(item => {
                return profileList.push(item);
            })
            profileList?.map(item => {
                return patientList.push({
                    userTwoId: item.userTwoId,
                    firstName: item.userTwo.firstName,
                    lastName: item.userTwo.lastName,
                    avatar: item.userTwo.avatarURL,
                })
            })
            return console.log("thành công");
        } else {
            return console.log("Lấy danh sách gia đình thất bại");
        }
    }
)

// const patientList = [
//     { name: 'Trương Ngọc Sơn', id: 2 },
// 	{ name: 'Nguyễn Thị Nhật Trang', id: 2 },
// 	{ name: 'Phạm Văn Tâm', id: 2 },
// 	{ name: 'Lê Văn Hân', id: 2 },
// 	{ name: 'Hoàng Văn Dũng', id: 2 },
// ];
const useStyles = makeStyles({
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
});

function SimpleDialog(props) {
    const history = useHistory();
    const classes = useStyles();
    const { onClose, selectedValue, open } = props;

    const handleClose = () => {
        onClose(selectedValue);
    };

    const handleListItemClick = (value) => {
        onClose(value);
    };

    return (
        <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle id="simple-dialog-title">Hồ sơ gia đình</DialogTitle>
            <div>
                <List>
                    {patientList.map((patient) => (
                        <ListItem button onClick={() => handleListItemClick(patient.firstName+' '+patient.lastName)} key={patient.firstName+' '+patient.lastName}>
                            <ListItemAvatar>

                                {
                                    patient.avatar ? 
                                        <Avatar alt="image" src={patient.avatar} variant='circular' />
                                        :
                                        <Avatar className={classes.avatar}>
                                            <PersonIcon />
                                        </Avatar>
                                }
                            </ListItemAvatar>
                            <ListItemText primary={patient.firstName+' '+patient.lastName} />
                        </ListItem>
                    ))}

                    <ListItem autoFocus button onClick={() => handleListItemClick(history.push("/profile"))}>
                        <ListItemAvatar>
                            <Avatar>
                                <AddIcon />
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary="Thêm hồ sơ bệnh nhân" />
                    </ListItem>
                </List>
            </div>
        </Dialog>
    );
}

SimpleDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function PatientCard(props) {
    const [open, setOpen] = React.useState(false);
    const [selectedValue, setSelectedValue] = React.useState('');
    const [url, setUrl] = React.useState('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSelectedValue(value);
        patientList.map(item => {
            if(value === item.firstName+' '+item.lastName){
                setUrl(item.avatar);
                return props.onSetAttribute(value, item.userTwoId);
            }
            return 0;
        })
    };

    return (
        <div>
            
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                {
                    selectedValue ? 
                        <Typography variant="subtitle1">
                            Bệnh nhân: 
                            <Avatar style={{marginLeft: 8}} alt="image" src={url} variant='circular' />
                            {selectedValue}
                        </Typography>
                        :
                        "Chọn bệnh nhân cần khám"
                }
            </Button>
            <SimpleDialog selectedValue={selectedValue} open={open} onClose={handleClose} />
        </div>
    );
}
