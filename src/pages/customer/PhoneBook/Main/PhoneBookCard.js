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
		if (navigator.clipboard && window.isSecureContext) {
			// navigator clipboard api method'
			return navigator.clipboard.writeText(task.phoneNumber); 
		} else {
			// text area method
			let textArea = document.createElement("textarea");
			textArea.value = task.phoneNumber;
			// make the textarea out of viewport
			textArea.style.position = "fixed";
			textArea.style.left = "-999999px";
			textArea.style.top = "-999999px";
			document.body.appendChild(textArea);
			textArea.focus();
			textArea.select();
			return new Promise((res, rej) => {
				// here the magic happens
				document.execCommand('copy') ? res() : rej();
				textArea.remove();
			});
		}
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
					<ListItemText primary={<b>{task.name}</b>} secondary={
						<>
							<p>{task.phoneNumber}</p>
							<p>Cách {task.distance} km</p>
						</>
					} />
				</ListItem>
			</List>
		</Box>
	);
}