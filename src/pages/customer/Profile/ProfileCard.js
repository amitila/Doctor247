import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
	root: {
		minWidth: 275,
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
});

export default function ProfileCard() {
	const classes = useStyles();
	// const bull = <span className={classes.bullet}>•</span>;

	return (
		<Card className={classes.root}>
			<CardContent>
				<Typography className={classes.title} color="textSecondary" gutterBottom>
					Hồ sơ của bệnh nhân
				</Typography>
				<Typography variant="h5" component="h2">
					Phạm Văn Tâm
				</Typography>
				<Typography className={classes.pos} color="textSecondary">
					18/08/1999
				</Typography>
				<Typography variant="body2" component="p">
					Giới tính:
					<br />
					Mã số BHYT: 
					<br />
					Số điện thoại:
					<br />
					Địa chỉ:
				</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">Cập nhật thông tin</Button>
			</CardActions>
		</Card>
	);
}
