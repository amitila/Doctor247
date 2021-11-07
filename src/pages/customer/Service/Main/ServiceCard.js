import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Favorite from '@material-ui/icons/Favorite';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
		width: '100%'
	},
	media: {
		height: 100,
		paddingTop: '50%', // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest,
		}),
	},
	expandOpen: {
		transform: 'rotate(180deg)',
	},
	avatar: {
		backgroundColor: red[500],
	},
	appBar: {
		position: 'relative',
		backgroundColor: 'orange',
	},
	title: {
		marginLeft: theme.spacing(2),
		flex: 1,
	},
	Title: {
		marginLeft: theme.spacing(1),
		flex: 1,
		fontWeight: 'bold',
	},
}));

export default function ServiceCard(props) {
	const classes = useStyles();
	const { task } = props;

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div className={classes.root}>
			<Card>
				<Button variant="outlined" color="primary" >
					<Avatar 
						alt="avatar" 
						src={task.image} 
						loading="lazy" 
						variant="square" 
						style={{width: 300, height: 300}}
					/>
				</Button>
				<Typography variant="h6" className={classes.title}>
					{task.name} - {task.fee}
				</Typography>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FormControlLabel
							control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
							label="Yêu thích"
						/>
					</IconButton>
					<IconButton
						className={clsx(classes.expand)}
					>
						<Button variant="contained" color="primary" onClick={handleClickOpen} >
							Đăng ký
						</Button>
					</IconButton>
				</CardActions>
				<Dialog open={open} onClose={handleClose}>
        			<DialogTitle>{task.name} - chỉ từ {' '}{task.fee}</DialogTitle>
					<DialogContent>
						<DialogContentText>
							<Typography variant="h6" component="h2" className={classes.Title} gutterBottom >Giới thiệu:</Typography>
							<Typography paragraph>
								{task.introduce}
							</Typography>
							<Typography variant="h6" component="h2" className={classes.Title} gutterBottom >Nội dung khám:</Typography>
							<Typography paragraph>
								{task.content}
							</Typography>
							<Typography variant="h6" component="h2" className={classes.Title} gutterBottom >Dịch vụ đi kèm:</Typography>
							<Typography paragraph>
								{task.service}
							</Typography>
						</DialogContentText>
						<TextField
							required
							autoFocus
							margin="dense"
							id="phoneNumber"
							label="Vui lòng để lại số điện thoại để được liên hệ xếp lịch sớm nhất"
							type="phoneNumber"
							fullWidth
							variant="standard"
						/>
					</DialogContent>
					<DialogActions>
						<Button variant='outlined' color='main' onClick={handleClose}>Thoát</Button>
						<Button variant='outlined' color='main' onClick={handleClose}>Đăng ký</Button>
					</DialogActions>
				</Dialog>
			</Card>
		</div>
	);
}
