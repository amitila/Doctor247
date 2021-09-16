import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) =>({
	root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
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
}));

export default function ProfileCard(props) {
	const classes = useStyles();

	const onDelete = () => {
        props.onDelete(props.task.id);
    }

    const onUpdate = () => {
        props.onUpdate(props.task.id);
    }

    const {task, index} = props;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Hồ sơ số {index} của {task.relationship}
				</Typography>
				<Typography variant="h5" component="h2">
					{task.name}
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					{task.birthday}
				</Typography>
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
			</CardContent>
			<CardActions>
				<Button
					type="button"
					variant="contained"
					color=""
					onClick={onUpdate}
				>
					Cập nhật
				</Button>
                &nbsp;
				<Button
					type="button"
					variant="contained"
					color=""
					onClick={onDelete}
				>
					Xóa thẻ
				</Button>
			</CardActions>
		</Card>
	);
}
