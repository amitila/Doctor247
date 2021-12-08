import * as React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import { blue } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import { 
		FacebookIcon, 
		FacebookMessengerIcon, 
		LineIcon,
		TelegramIcon,
		FacebookMessengerShareButton, 
		FacebookShareButton,
		LineShareButton,
		TelegramShareButton
	} from "react-share";

const medias = ['Facebook', 'Messenger', 'Line', 'Telegram'];

function SimpleDialog(props) {
	const { onClose, selectedValue, open} = props;
	const currentUrl = window.location.href;
	const originUrl = window.location.origin;
	
	const handleClose = () => {
		onClose(selectedValue);
	};

	const handleListItemClick = (media, index) => {
		if(index === 0) {

		}
		else if (index === 1) {

		}
		onClose(media);
	};

	return (
		<Dialog onClose={handleClose} open={open}>
			<DialogTitle>Chia sẻ qua ứng dụng</DialogTitle>
			<List sx={{ pt: 0 }}>
				{medias.map((media, index) => (
					<ListItem button onClick={() => handleListItemClick(media, index)} key={index}>
						<ListItemAvatar>
							<Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
							{
								[
									<FacebookShareButton
										url={`${currentUrl}`}
										quote="Ứng dụng Doctor247 - Chia sẻ để trải nghiệm"
										hashtag="#doctor247"
									>
										<FacebookIcon />
									</FacebookShareButton>,
									<FacebookMessengerShareButton
										appId={911966642758365}
										url={`${currentUrl}`}
										redirectUri={`${originUrl}/home`}
										to=""
									>
										<FacebookMessengerIcon />
									</FacebookMessengerShareButton>,
									<LineShareButton
										url={`${currentUrl}`}
										title ="Ứng dụng Doctor247"
									>
										<LineIcon />
									</LineShareButton>,
									<TelegramShareButton
										url={`${currentUrl}`}
										title ="Ứng dụng Doctor247"
									>
										<TelegramIcon />
									</TelegramShareButton>
								][index]
							}
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary={media} />
					</ListItem>
				))}
			</List>
		</Dialog>
	);
}

SimpleDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	selectedValue: PropTypes.string.isRequired,
};

export default function ShareBoard() {
	const [open, setOpen] = React.useState(false);
	const [selectedValue, setSelectedValue] = React.useState(medias[1]);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = (value) => {
		setOpen(false);
		setSelectedValue(value);
	};

	return (
		<div>
			<ShareIcon style={{color: 'blue'}} onClick={handleClickOpen} />
			{/* <b onClick={handleClickOpen} >Chia sẻ</b> */}
			<SimpleDialog
				selectedValue={selectedValue}
				open={open}
				onClose={handleClose}
			/>
		</div>
	);
}
