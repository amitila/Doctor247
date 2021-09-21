import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Favorite from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import DoctorInfo from './DoctorInfo.js';
import { useHistory } from "react-router-dom";

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
}));

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function DoctorCard(props) {
	const classes = useStyles();
	const [expanded, setExpanded] = React.useState(false);

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { task, index } = props;

	const history = useHistory();

	return (
		<div className={classes.root}>
			<Card>
				<CardHeader
					avatar={
						<Avatar alt="avatar" src={task.avatar} loading="lazy" />
					}
					action={
						<IconButton aria-label="settings">
							<MoreVertIcon />
						</IconButton>
					}
					title={task.name} //"BS.Phạm Văn Tâm "
					subheader={"Chuyên khoa " + task.specialist} //"Chuyên khoa truyền nhiễm"
				/>
				<Button variant="outlined" color="primary" onClick={handleClickOpen}>
					<CardContent className={classes.content}>
						<Typography variant="h6" component="h6">
							{/* Mã số: BS1002 */}
							{"Mã số: " + index}
						</Typography>
						<Typography variant="h5" component="h2">
							{/* <b>Truyền nhiễm</b> */}
							<b>{task.specialist}</b>
						</Typography>
						<Typography className={classes.title} color="textSecondary" gutterBottom>
							{/* 0398296632 */}
							{task.phone}
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
							{/* 5 năm kinh nghiệm */}
							{task.year_exp}
						</Typography>
						<Typography className={classes.pos} color="textSecondary">
							{/* Phòng khám Đa Khoa Amila */}
							{task.workplace}
						</Typography>
					</CardContent>
				</Button>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FormControlLabel
							control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
							label="Yêu thích"
						/>
					</IconButton>

					<IconButton aria-label="share">
						<Button variant="contained" color="primary" onClick={()=>history.push("/appointment")} >
							Đặt khám
						</Button>
					</IconButton>
					<IconButton
						className={clsx(classes.expand, {
							[classes.expandOpen]: expanded,
						})}
						onClick={handleExpandClick}
						aria-expanded={expanded}
						aria-label="show more"
					>
						<ExpandMoreIcon />
					</IconButton>
				</CardActions>
				<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
					<AppBar className={classes.appBar} >
						<Toolbar>
							<IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" className={classes.title}>
								Thông tin bác sĩ
							</Typography>
							<Typography variant="h6" className={classes.title}>
								Bài viết về bệnh
							</Typography>
							<Typography variant="h6" className={classes.title}>
								Phản hồi từ bệnh nhân
							</Typography>
							{/* <Button autoFocus color="inherit" onClick={handleClose}>
                            Đặt lịch khám ngay
                        </Button> */}
						</Toolbar>
					</AppBar>
					<DoctorInfo task={task} />
				</Dialog>
			</Card>
		</div>
	);
}