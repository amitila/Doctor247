import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
		fontSize: "25px",
	},
}));

export default function Logo() {
	const classes = useStyles();
	return (
		<div className={classes.root}>
			<Avatar className={classes.root} alt="logo" src="/logo.png" />
			<b>Doctor247</b>
		</div>
	)
}

