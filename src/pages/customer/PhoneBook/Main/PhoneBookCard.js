import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CallIcon from '@mui/icons-material/Call';

export default function PhoneBookCard(props) {
	const handleClick = () => {
		if (navigator.clipboard && window.isSecureContext) {
			// navigator clipboard api method'
			return navigator.clipboard.writeText(task.phoneNumber) && console.log('Đã sao chép số điện thoại của ' + task.name); 
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
				console.log('Đã sao chép số điện thoại của ' + task.name)
			});
		}
	}
	const { task, index } = props;

	return (
		<Box>
			<CssBaseline />
			<List style={{width: '100%', borderStyle: 'dashed', backgroundColor: '#ffcea6', '&:hover': {backgroundColor: 'red'},}} >
				<ListItem button key={index} onClick={handleClick} >
					<ListItemAvatar>
						<Avatar alt={task.name} src='https://png.pngtree.com/png-vector/20190901/ourlarge/pngtree-hospital-icon-png-image_1718741.jpg' />
					</ListItemAvatar>
					<ListItemText primary={<b>{task.name}</b>} secondary={
						<>
							<p style={{color: '#0341fc'}}><b>{task.phoneNumber}</b></p>
							<p><b>Cách {task.distance} km</b></p>
						</>
					} />
					<Button variant='outlined'>
						<a style={{textDecoration: 'none', color: '#00c4a0', fontWeight: 'bold'}} href={"tel:"+task.phoneNumber}>
							<CallIcon /> {' '} Gọi
						</a>
					</Button>
				</ListItem>
				
			</List>
		</Box>
	);
}