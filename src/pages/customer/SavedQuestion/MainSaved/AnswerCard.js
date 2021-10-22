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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import Button from '@material-ui/core/Button';
import { useHistory } from "react-router-dom";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

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

export default function AnswerCard(props) {
	const classes = useStyles();
	const history = useHistory();

	const [anchorEl, setAnchorEl] = React.useState(null);
    const openAnchor = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleAnchor = () => {
        setAnchorEl(null);
    };

	return (
		<div className={classes.root}>
			<Card>
				<CardHeader
					avatar={
						<Avatar alt="avatar" src={''} loading="lazy" />
					}
					action={
						<div>
							<IconButton
								id="fade-button"
								aria-controls="fade-menu"
								aria-haspopup="true"
								aria-expanded={openAnchor ? 'true' : undefined}
								onClick={handleClick}
							>
								<MoreVertIcon />
							</IconButton>
							<Menu
								id="menu"
								style={{height: 400, display:"flex"}}
								MenuListProps={{
								'aria-labelledby': 'fade-button',
								}}
								anchorEl={anchorEl}
								open={openAnchor}
								onClose={handleAnchor}
							>
								<MenuItem onClick={handleAnchor}>Thông tin bác sĩ</MenuItem>
								<MenuItem onClick={handleAnchor}>Đặt lịch khám</MenuItem>
								<MenuItem onClick={handleAnchor}>Chat với bác sĩ</MenuItem>
								<MenuItem onClick={handleAnchor}>Theo dõi</MenuItem>
							</Menu>
						</div>
					}
					title={'BS.Phạm Văn Tâm'} //"BS.Phạm Văn Tâm "
					subheader={"Chuyên khoa truyền nhiễm"} //"Chuyên khoa truyền nhiễm"
				/>
				<CardContent className={classes.content}>
						<Typography variant="h6" component="h6">
							{"Loại bệnh: " + props.state.specialityName}
						</Typography>
						<Typography >
							{props.state.replyContent}
						</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FormControlLabel
							control={<Checkbox icon={<FavoriteBorder />} checkedIcon={<Favorite />} name="checkedH" />}
							label="Cảm ơn"
						/>
					</IconButton>
					<IconButton
						className={clsx(classes.expand)}
					>
						<Button variant="contained" color="primary" onClick={()=>history.push("/appointment")} >
							Đặt khám
						</Button>
					</IconButton>
				</CardActions>
			</Card>
		</div>
	);
}
