import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import { Dialog } from '@material-ui/core';
import NotificationInfo from './NotificationInfo';
import { AppBar } from '@material-ui/core';
import { Slide, Typography } from '@mui/material';
import { IconButton } from '@mui/material';
import CloseIcon from '@material-ui/icons/Close';
import { Toolbar } from '@mui/material';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction="up" ref={ref} {...props} />;
});

export default function NotificationCard(props) {

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { task, index } = props;

	return (
		<Box style={{width: '100%'}} >
			<CssBaseline />
			<List>
				<ListItem button key={index + task.person} onClick={handleClickOpen} >
					<ListItemAvatar>
						<Avatar alt="Person" src={task.person} />
					</ListItemAvatar>
					<ListItemText primary={<b>{task.title}</b>} secondary={task.content} />
				</ListItem>
			</List>
			<Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
					<AppBar style={{position: 'relative', backgroundColor: 'yellow'}} >
						<Toolbar>
							<IconButton edge="start" onClick={handleClose} aria-label="close">
								<CloseIcon />
							</IconButton>
							<Typography variant="h6" >
								Thông báo : Số 1
							</Typography>
						</Toolbar>
					</AppBar>
					<NotificationInfo task={task} />
				</Dialog>
		</Box>
	);
}