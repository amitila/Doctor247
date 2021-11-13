import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
// import Main from './Main';
import AlertComponent from '../../../components/AlertComponent';

const useStyles = makeStyles((theme) => ({
	root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    grid: {
        float: "left",
    }
}));

export default function Inndex() {
	const classes = useStyles();
    
    //// Code for confirming success, failed
    const [isHaveAlert, setIsHaveAlert] = React.useState(false);
    const [alert, setAlert] = React.useState('');
    
    const alertFunction = () => {
        setIsHaveAlert(true)
        return setAlert({ number: 1, sms: 'Amiiiiiiiiiiiiiiii'})
    }

    const alertClose = () => {
        setIsHaveAlert(false)
        return setAlert({ number: '', sms: ''})
    }
    /////

	return (
		<div className={classes.root}>
            {
                isHaveAlert ? <AlertComponent alert={alert} alertClose={alertClose} /> : null
            }
            <button onClick={alertFunction}> bấm vô tui nè </button>
			<Container maxWidth="lg">
				<Grid container spacing={1}>
					<Grid item xs={12} sm={12}>
						
					</Grid>
				</Grid>
			</Container>
		</div>
	);
}
