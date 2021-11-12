import * as React from 'react';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const AlertFunction = (number, sms) => {
    const [open, setOpen] = React.useState(true);

    // const handleClick = () => {
    //     setOpen(true);
    // };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
        // props.alertClose();
    };

    // const { alert } = props;
    // const number = alert.number;
    // const sms = alert.sms;

    return (
        <Stack spacing={2} sx={{ width: '100%' }} >
            {/* <Button variant="outlined" onClick={handleClick}>
                Open success snackbar
            </Button> */}
            {
                number === 0 ? 
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                        {sms}
                    </Alert>
                </Snackbar> : null
            }
            {
                number === 1 ? 
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                        {sms}
                    </Alert>
                </Snackbar> : null
            }
            {
                number === 2 ? 
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="warning" sx={{ width: '100%' }}>
                        {sms}
                    </Alert>
                </Snackbar> : null
            }
            {
                number === 3 ? 
                <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info" sx={{ width: '100%' }}>
                        {sms}
                    </Alert>
                </Snackbar> : null
            }
        </Stack>
    );
}

export default AlertFunction;