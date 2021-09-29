import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		'& > *': {
			margin: theme.spacing(1),
		},
		width: '100%'
	},
	bullet: {
		display: 'inline-block',
		margin: '0 2px',
		transform: 'scale(0.8)',
	},
	title: {
		fontSize: 14,
	},
	pos: {
		marginBottom: 12,
	},
	update: {
		backgroundColor: '#2196F3',
		color: 'white',
		"&:hover": {
			backgroundColor: '#2196F3',
		}
	},
	delete: {
		backgroundColor: '#FF0101',
		color: 'white',
		"&:hover": {
			backgroundColor: '#FF0101',
		}
	},
	avatar: {
		width: 125,
		height: 125,
	}
}));

export default function ProfileCard(props) {
	const classes = useStyles();

	const onDelete = () => {
		props.onDelete(props.task.id);
	}

	const onUpdate = () => {
		props.onUpdate(props.task.id);
	}

	const { task, index } = props;

	return (
		<div className={classes.root}>
			<Card className={classes.root}>
				<Grid container spacing={2}>
					<Grid item xs={12}>
						<CardContent>
							<Typography className={classes.title} color="textSecondary" gutterBottom>
								Hồ sơ số {index} của {task.relationship}
							</Typography>
							<Typography variant="h5" component="h2">
								{task.firstName +' '+ task.lastName}
							</Typography>
							<Typography className={classes.pos} color="textSecondary">
								{task.birthday}
							</Typography>
							<Grid container>
								<Grid xs={12} sm={8}>
									<Typography variant="body2" component="p">
										Giới tính: {task.gender}
										<br />
										Mã số BHYT: {task.bhyt}
										<br />
										Số điện thoại: {task.phone}
										<br />
										Email: {task.email}
										<br />
										Tỉnh/TP: {task.province}
										<br />
										Địa chỉ: {task.address}
									</Typography>
								</Grid>
								<Grid xs={12} sm={4}>
									<Avatar 
										alt="avatar" 
										src={task.avatar} 
										loading="lazy" 
										className={classes.avatar}
									/>
								</Grid>
							</Grid>
						</CardContent>
					</Grid>
					<Grid item xs={12}>
						<CardActions>
							<Button
								className={classes.update}
								type="button"
								variant="contained"
								onClick={onUpdate}
							>
								Cập nhật
							</Button>
							&nbsp;
							<Button
								className={classes.delete}
								type="button"
								variant="contained"
								onClick={onDelete}
							>
								Xóa thẻ
							</Button>
						</CardActions>
					</Grid>
				</Grid>
			</Card>
		</div>
	);
}
