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
		<Avatar className={classes.root} alt="logo" src="https://lh3.googleusercontent.com/E13e4qMyQliH7ibUy3Xz5NgBIGhVtldJE3MmmJPCm5qVEMBlrsux-2ppHaF2c_hUNpsPsf4vr4SYwC6kJPf1b4KaXvR6o75jQF8SzjGlLgrcaLvwbcDIUbb35K5_xrQOiE_aaxgmam8D4FRMQnzO-vlFug9rlLhijMNG7kqatr8dP4S0EDAJJzqzx74cPVd7sIqCOF6TXoMxxEsiFRdGCEMz7SZuiek1nrtOkO_OJaQ91wC1DBnyEu12Nl_1O2W_uwC5ItZw4M8B4LCuB8cI2IzwWlXua5oj3RZEOPlp3Ie2B50Mqz8VA7ue1JX4jGUy26zqhMDB1E-brztwXbCtGlEXlfHWCZs73FHyGJ-jsjZqrmei9cJTcvRBZvdWYnUqEutnaC9G04Qpc2sABMNY_rBRoknkTH0Eqs22bIWKpiynXPbyxi57hBbjbPhpIhb53AFL4oy2E6bkyCtbdae6Ud_hpwjLNzgsT3doZ06EL-pE2IVFU4dYqXLaBgWvwx2KP0Mkj5X8R_BF485_2AOiRwLSinCpTfHO0YI0mEyPt18SSTKVeQH0FkCdxhj-m422lK-hBRR5nJiHFABEZPutLP89W-5RQ3EONfq2iTq-oZOQaZm1wnRpnRevgR0GDcYTjJl2NY4E54mRjZmJBcbE6M3RWJjdppi-Ma604mNqp5-rktwpOHVidoAlC0WygF8x89BYO50lZstX3_2pRlx0Rz3VZg=s500-no?authuser=0" />
		<b>Doctor247</b>
	</div>
  )
}

