import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';

export default function PhoneBookCard(props) {

	const handleClick = () => {

	}
	const { task, index } = props;

	return (
		<Box style={{width: '100%'}} >
			<CssBaseline />
			<List>
				<ListItem button key={index} onClick={handleClick} >
					<ListItemAvatar>
						<Avatar alt={task.name} />
					</ListItemAvatar>
					<ListItemText primary={<b>{task.name}</b>} secondary={task.phoneNumber} />
				</ListItem>
			</List>
		</Box>
	);
}